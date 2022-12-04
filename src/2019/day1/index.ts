import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(item => parseInt(item));
  };

  protected _solveFirstPart = (input: number[]) => {
    return input.map(mass => this.computeDirectFuel(mass)).reduce((acc, curr) => acc + curr, 0);
  };

  protected _solveSecondPart = (input: number[]) => {
    return input.map(mass => this.computeTotalFuel(mass)).reduce((acc, curr) => acc + curr, 0);
  };

  private computeDirectFuel = (mass: number) => {
    return Math.floor(mass / 3) - 2;
  };

  private computeTotalFuel = (mass: number) => {
    let result = 0;
    let currentIndirectFuel = this.computeDirectFuel(mass);
    while (0 < currentIndirectFuel) {
      result += currentIndirectFuel;
      currentIndirectFuel = this.computeDirectFuel(currentIndirectFuel);
    }
    return result;
  };
}

export const solver = new DaySolver();
