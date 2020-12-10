import { Solver } from '../solvers/Solver';

class DaySolver extends Solver<number[], number> {
  private map = new Map<string, number>();
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      return parseInt(line);
    });
  };

  protected _solveFirstPart = (input: number[]) => {
    const sorted = input.sort((a, b) => a - b);
    const enhancedInput = [0, ...sorted, sorted[sorted.length - 1] + 3];
    const diffs = {
      1: 0,
      2: 0,
      3: 0,
    };
    for (let i = 1; i < enhancedInput.length; i++) {
      const diff = enhancedInput[i] - enhancedInput[i - 1];
      diffs[diff] += 1;
    }
    return diffs[1] * diffs[3];
  };

  private countCombinations(input: number[]) {
    let result;
    const cache = this.map.get(input.join(','));
    if (cache) {
      return cache;
    }
    if (input.length < 2) {
      result = 1;
    } else if (input.length === 3) {
      const [first, _, third] = input;
      result = third - first <= 3 ? 2 : 1;
    } else {
      const [first, second, third, ...rest] = input;
      result =
        this.countCombinations([second, third, ...rest]) +
        (third - first <= 3 ? this.countCombinations([first, third, ...rest]) : 0);
    }
    // console.log(input.join(', '), result);
    this.map.set(input.join(','), result);
    return result;
  }

  protected _solveSecondPart = (input: number[]) => {
    const sorted = input.sort((a, b) => a - b);
    const enhancedInput = [0, ...sorted, sorted[sorted.length - 1] + 3];
    return this.countCombinations(enhancedInput);
  };
}

export const solver = new DaySolver();
