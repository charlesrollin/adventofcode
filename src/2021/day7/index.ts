import { Solver } from '../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => parseInt(item));
  };

  private median(input: number[]) {
    const sorted = [...input].sort((a, b) => a - b);
    const middleIdx = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return sorted[middleIdx - 1];
    }
    return sorted[middleIdx];
  }

  protected _solveFirstPart = (input: number[]) => {
    const median = this.median(input);
    return input.reduce((acc, curr) => acc + Math.abs(curr - median), 0);
  };

  protected _solveSecondPart = (input: number[]) => {
    input.sort((a, b) => a - b);
    const min = input[0];
    const max = input[input.length - 1];
    const results = [];
    for (let i = min; i <= max; i++) {
      results.push(
        input.reduce((acc, cur) => acc + (Math.abs(cur - i) * (Math.abs(cur - i) + 1)) / 2, 0)
      );
    }
    return Math.min(...results);
  };
}

export const solver = new DaySolver();
