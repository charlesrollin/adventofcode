import { Solver } from 'src/shared/Solver';

interface Input {
  op: Operation;
  arg: number;
}

enum Operation {
  acc = 'acc',
  jmp = 'jmp',
  nop = 'nop',
}

class Computer {
  idx = 0;
  acc = 0;
  program: Input[] = [];
  metInstructions = [];

  constructor(program: Input[]) {
    this.program = program;
    this.metInstructions = new Array(program.length).fill(false);
  }

  private execute = {
    [Operation.acc]: (arg: number) => {
      this.acc += arg;
      this.metInstructions[this.idx] = true;
      this.idx += 1;
    },
    [Operation.jmp]: (arg: number) => {
      this.metInstructions[this.idx] = true;
      this.idx = this.idx + arg;
    },
    [Operation.nop]: () => {
      this.metInstructions[this.idx] = true;
      this.idx += 1;
    },
  };

  run() {
    let currentInstruction = this.program[this.idx];
    while (!this.metInstructions[this.idx] && this.idx < this.program.length) {
      this.execute[currentInstruction.op](currentInstruction.arg);
      currentInstruction = this.program[this.idx];
    }
    return { terminated: this.idx === this.program.length, value: this.acc };
  }
}

class DaySolver extends Solver<Input[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      const [_, op, arg] = line.match(/^(.{3}) (.*)$/);
      return { op: op as Operation, arg: parseInt(arg) };
    });
  };

  protected _solveFirstPart = (input: Input[]) => {
    const computer = new Computer(input);
    return computer.run().value;
  };

  protected _solveSecondPart = (input: Input[]) => {
    return input
      .map((operation, idx) => {
        if (operation.op === Operation.nop) {
          const computer = new Computer([
            ...input.slice(0, idx),
            { op: Operation.jmp, arg: operation.arg },
            ...input.slice(idx + 1),
          ]);
          return computer.run();
        }
        if (operation.op === Operation.jmp) {
          const computer = new Computer([
            ...input.slice(0, idx),
            { op: Operation.nop, arg: operation.arg },
            ...input.slice(idx + 1),
          ]);
          return computer.run();
        }
        return { terminated: false, value: 0 };
      })
      .filter(res => res.terminated)[0].value;
  };
}

export const solver = new DaySolver();
