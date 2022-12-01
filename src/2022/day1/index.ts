import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n\n').map(items => items.split('\n').map(item => parseInt(item)));
  };

  protected _solveFirstPart = (input: number[][]) => {
    return this.popMax(input.map(this.sum));
  };

  protected _solveSecondPart = (input: number[][]) => {
    const caloriesPerElf = input.map(this.sum);
    return this.popMax(caloriesPerElf) + this.popMax(caloriesPerElf) + this.popMax(caloriesPerElf);
  };

  private sum(items: number[]): number {
    return items.reduce((acc, curr) => acc + curr, 0);
  }

  private popMax(input: number[]): number {
    let max = input[0];
    let maxIdx = 0;
    input.forEach((item, idx) => {
      if (max < item) {
        max = item;
        maxIdx = idx;
      }
    });
    return input.splice(maxIdx, 1)[0];
  }
}

export const solver = new DaySolver();
