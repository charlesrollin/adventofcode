import { Solver } from '../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => parseInt(item));
  };

  private getFishAmount(fishes: number[], limit: number) {
    let fishesPerAge = new Array(9).fill(0);
    fishes.forEach(fish => {
      fishesPerAge[fish] += 1;
    });
    for (let i = 0; i < limit; i++) {
      const newBirths = fishesPerAge[0];
      fishesPerAge = fishesPerAge.map((_, idx) => {
        if (idx === fishesPerAge.length - 1) {
          return newBirths;
        }
        return fishesPerAge[idx + 1];
      });
      fishesPerAge[6] += newBirths;
    }
    return fishesPerAge.reduce((acc, curr) => acc + curr);
  }

  protected _solveFirstPart = (input: number[]) => {
    return this.getFishAmount(input, 80);
  };

  protected _solveSecondPart = (input: number[]) => {
    return this.getFishAmount(input, 256);
  };
}

export const solver = new DaySolver();
