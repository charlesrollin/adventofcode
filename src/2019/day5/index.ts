import { Solver } from 'src/shared/Solver';

interface Move {
  direction: string;
  length: number;
}

class DaySolver extends Solver<[number, number], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('-').map(item => parseInt(item, 10)) as [number, number];
  };

  protected _solveFirstPart = (input: [number, number]) => {
    return 0;
  };

  protected _solveSecondPart = (input: [number, number]) => {
    return 0;
  };
}

export const solver = new DaySolver();
