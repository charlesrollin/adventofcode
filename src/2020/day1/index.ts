import { Solver } from './../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(item => parseInt(item));
  };

  protected _solveFirstPart = (input: number[], optionalGoal?: number) => {
    const goal = optionalGoal ?? 2020;
    const map = {};
    input.forEach(number => (map[number] = true));
    for (let i = 0; i < input.length; i++) {
      if (map[goal - input[i]] !== undefined) {
        return input[i] * (goal - input[i]);
      }
    }
  };

  protected _solveSecondPart = (input: number[]) => {
    for (let i = 0; i < input.length; i++) {
      const subInput = input.slice(i + 1);
      const subResult = this._solveFirstPart(subInput, 2020 - input[i]);
      if (subResult !== undefined) {
        return input[i] * subResult;
      }
    }
  };
}

export const solver = new DaySolver();
