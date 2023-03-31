import { Solver } from 'src/shared/Solver';
import { IntcodeComputer } from '../shared/IntcodeComputer';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => parseInt(item));
  };

  protected _solveFirstPart = (input: number[]) => {
    const computer = new IntcodeComputer();
    input[1] = 12;
    input[2] = 2;
    return computer.run({ program: input }).program[0];
  };

  protected _solveSecondPart = (input: number[]) => {
    const computer = new IntcodeComputer();
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const inputCopy = [input[0], noun, verb, ...input.slice(3)];
        const result = computer.run({ program: inputCopy }).program[0];
        if (result === 19690720) {
          return 100 * noun + verb;
        }
      }
    }
  };
}

export const solver = new DaySolver();
