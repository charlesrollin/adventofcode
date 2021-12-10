import { Solver } from 'src/shared/Solver';

interface InputLine {
  patterns: string[];
  output: string[];
}

const digits = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

class DaySolver extends Solver<InputLine[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(line => {
      const [rawPatterns, rawOutput] = line.split(' | ');
      return {
        patterns: rawPatterns.split(' ').map(str => str.split('').sort().join('')),
        output: rawOutput.split(' ').map(str => str.split('').sort().join('')),
      };
    });
  };

  private includesSegments(str1: string, str2: string) {
    for (let i = 0; i < str1.length; i++) {
      if (!str2.includes(str1[i])) {
        return false;
      }
    }
    return true;
  }

  private solveLine(line: InputLine) {
    const { patterns, output } = line;
    const digits: Record<number, string> = {};
    const patternsPerLength: Record<string, string[]> = patterns.reduce((acc, curr) => {
      acc[curr.length] = acc[curr.length] ?? [];
      acc[curr.length].push(curr);
      return acc;
    }, {});
    digits[1] = patternsPerLength[2].pop();
    digits[4] = patternsPerLength[4].pop();
    digits[7] = patternsPerLength[3].pop();
    digits[8] = patternsPerLength[7].pop();
    digits[3] = patternsPerLength[5].splice(
      patternsPerLength[5].findIndex(item => this.includesSegments(digits[1], item)),
      1
    )[0];
    digits[9] = patternsPerLength[6].splice(
      patternsPerLength[6].findIndex(item => this.includesSegments(digits[3], item)),
      1
    )[0];
    digits[6] = patternsPerLength[6].splice(
      patternsPerLength[6].findIndex(item => !this.includesSegments(digits[1], item)),
      1
    )[0];
    digits[0] = patternsPerLength[6].splice(0, 1)[0];
    digits[5] = patternsPerLength[5].splice(
      patternsPerLength[5].findIndex(item => this.includesSegments(item, digits[6])),
      1
    )[0];
    digits[2] = patternsPerLength[5].splice(0, 1)[0];
    return parseInt(
      output
        .map(
          item =>
            Object.entries(digits)
              .filter(([_, pattern]) => pattern === item)
              .map(([digit]) => digit)[0]
        )
        .join('')
    );
  }

  protected _solveFirstPart = (input: InputLine[]) => {
    return input
      .map(line => line.output.filter(item => [2, 3, 4, 7].includes(item.length)).length)
      .reduce((acc, curr) => acc + curr, 0);
  };

  protected _solveSecondPart = (input: InputLine[]) => {
    return input.reduce((acc, curr) => acc + this.solveLine(curr), 0);
  };
}

export const solver = new DaySolver();
