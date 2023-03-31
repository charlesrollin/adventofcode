enum OpCodes {
  ADD = 1,
  MULTIPLY = 2,
  INPUT = 3,
  OUTPUT = 4,
  END = 99,
}

export interface State {
  program: number[];
  input?: number;
  pointer?: number;
  outputs?: number[];
}

export class IntcodeComputer {
  run = ({ program, pointer = 0, input, outputs = [] }: State): State => {
    if (program[pointer] === OpCodes.END) {
      return { program, pointer, input, outputs };
    }
    const nextState = this.operationsMapping[program[pointer]]({
      program,
      pointer: pointer + 1,
      input,
      outputs,
    });
    return this.run(nextState);
  };

  private operationsMapping: Record<OpCodes, (state: State) => State> = {
    [OpCodes.ADD]: ({ program, pointer, ...rest }) => {
      program[program[pointer + 2]] = program[program[pointer]] + program[program[pointer + 1]];
      return { program, pointer: pointer + 3, ...rest };
    },
    [OpCodes.MULTIPLY]: ({ program, pointer, ...rest }) => {
      program[program[pointer + 2]] = program[program[pointer]] * program[program[pointer + 1]];
      return { program, pointer: pointer + 3, ...rest };
    },
    [OpCodes.INPUT]: ({ program, pointer, input, ...rest }) => {
      program[program[pointer]] = input;
      return { program, pointer: pointer + 1, input, ...rest };
    },
    [OpCodes.OUTPUT]: ({ program, pointer, outputs, ...rest }) => {
      outputs.push(program[program[pointer]]);
      return { program, pointer: pointer + 1, outputs, ...rest };
    },
    [OpCodes.END]: ({ pointer, ...rest }) => ({ pointer: pointer + 1, ...rest }),
  };
}
