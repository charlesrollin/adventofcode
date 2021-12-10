import { median } from 'src/shared/math';
import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => parseInt(item));
  };

  protected _solveFirstPart = (input: number[]) => {
    const inputMedian = median(input);
    return input.reduce((acc, curr) => acc + Math.abs(curr - inputMedian), 0);
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
