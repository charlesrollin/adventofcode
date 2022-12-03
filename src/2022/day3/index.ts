import { intersection } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<string[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n');
  };

  protected _solveFirstPart = (input: string[]) => {
    return input
      .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
      .map(rucksacks => {
        const set1 = new Set(rucksacks[0].split(''));
        const set2 = new Set(rucksacks[1].split(''));
        return this.getCharPriority([...intersection(set1, set2)][0]);
      })
      .reduce((acc, curr) => acc + curr, 0);
  };

  protected _solveSecondPart = (input: string[]) => {
    let result = 0;
    for (let i = 1; i < input.length - 1; i += 3) {
      const set1 = new Set(input[i - 1].split(''));
      const set2 = new Set(input[i].split(''));
      const set3 = new Set(input[i + 1].split(''));
      result += this.getCharPriority([...intersection(set1, intersection(set2, set3))][0]);
    }
    return result;
  };

  private getCharPriority(char: string) {
    const charCode = char.charCodeAt(0);
    return charCode < 97 ? charCode - 38 : charCode - 96;
  }
}

export const solver = new DaySolver();
