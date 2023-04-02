import { Solver } from 'src/shared/Solver';
import { IntcodeComputer } from '../shared/IntcodeComputer';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => parseInt(item));
  };

  protected _solveFirstPart = (program: number[]) => {
    const computer = new IntcodeComputer();
    const { outputs } = computer.run({ program, input: 1 });
    return outputs[outputs.length - 1];
  };

  protected _solveSecondPart = (program: number[]) => {
    const computer = new IntcodeComputer();
    const { outputs } = computer.run({ program, input: 5 });
    return outputs[outputs.length - 1];
  };
}

export const solver = new DaySolver();
