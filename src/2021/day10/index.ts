import { Solver } from '../../shared/Solver';

const closingChars = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

const corruptionScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completionScore = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

class DaySolver extends Solver<string[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(line => line.split(''));
  };

  private isOpeningChar(char: string) {
    return ['(', '{', '[', '<'].includes(char);
  }

  private median(input: number[]) {
    const sorted = [...input].sort((a, b) => a - b);
    const middleIdx = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return sorted[middleIdx - 1];
    }
    return sorted[middleIdx];
  }

  private getLineStatus(line: string[]) {
    const operatorStack: string[] = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (this.isOpeningChar(char)) {
        operatorStack.push(char);
      } else if (
        operatorStack[operatorStack.length - 1] !== undefined &&
        closingChars[operatorStack[operatorStack.length - 1]] === char
      ) {
        operatorStack.pop();
      } else {
        return { pendingStack: operatorStack, invalidChar: char };
      }
    }
    return { pendingStack: operatorStack, invalidChar: undefined };
  }

  private finishLine(pendingStack: string[]) {
    return pendingStack
      .map(char => closingChars[char])
      .reverse()
      .reduce((acc, curr) => acc * 5 + completionScore[curr], 0);
  }

  private validateLine(line: string[]) {
    const { invalidChar } = this.getLineStatus(line);
    return invalidChar ? corruptionScore[invalidChar] : 0;
  }

  protected _solveFirstPart = (input: string[][]) => {
    return input.reduce((acc, curr) => acc + this.validateLine(curr), 0);
  };

  protected _solveSecondPart = (input: string[][]) => {
    const pendingLines = input
      .map(line => this.getLineStatus(line))
      .filter(({ invalidChar }) => invalidChar === undefined);
    return this.median(pendingLines.map(({ pendingStack }) => this.finishLine(pendingStack)));
  };
}

export const solver = new DaySolver();
