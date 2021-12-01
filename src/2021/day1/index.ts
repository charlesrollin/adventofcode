import { Solver } from './../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(item => parseInt(item));
  };

  protected _solveFirstPart = (input: number[]) => {
    let current = input[0];
    let count = 0;
    for (let i = 1; i < input.length; i++) {
      if (current < input[i]) {
        count += 1;
      }
      current = input[i];
    }
    return count;
  };

  protected _solveSecondPart = (input: number[]) => {
    let current = input[0] + input[1] + input[2];
    let count = 0;
    for (let i = 1; i < input.length - 2; i++) {
      const temp = input[i] + input[i+1] + input[i+2];
      if (current < temp) {
        count +=1;
      }
      current = temp;
    }
    return count;
  };
}

export const solver = new DaySolver();
