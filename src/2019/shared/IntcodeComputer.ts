enum OpCodes {
  ADD = 1,
  MULTIPLY = 2,
  INPUT = 3,
  OUTPUT = 4,
  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  END = 99,
}

enum Mode {
  POSITION = 0,
  IMMEDIATE = 1,
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
    const nextOpCode = this.getOpCode(program[pointer]);
    const nextState = this.operationsMapping[nextOpCode]({
      program,
      pointer,
      input,
      outputs,
    });
    return this.run(nextState);
  };

  private operationsMapping: Record<OpCodes, (state: State) => State> = {
    [OpCodes.ADD]: ({ program, pointer, ...rest }) => {
      const nextPointer = pointer + 4;
      const [opCode, param1, param2, destination] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      program[destination] =
        this.getParameterValue(program, mode1, param1) +
        this.getParameterValue(program, mode2, param2);
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.MULTIPLY]: ({ program, pointer, ...rest }) => {
      const nextPointer = pointer + 4;
      const [opCode, param1, param2, destination] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      program[destination] =
        this.getParameterValue(program, mode1, param1) *
        this.getParameterValue(program, mode2, param2);
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.INPUT]: ({ program, pointer, input, ...rest }) => {
      const nextPointer = pointer + 2;
      const [_op, destination] = program.slice(pointer, nextPointer);
      program[destination] = input;
      return { program, pointer: nextPointer, input, ...rest };
    },
    [OpCodes.OUTPUT]: ({ program, pointer, outputs, ...rest }) => {
      const nextPointer = pointer + 2;
      const [opCode, param1] = program.slice(pointer, nextPointer);
      const mode1 = this.getParameterMode(opCode, 0);
      outputs.push(this.getParameterValue(program, mode1, param1));
      return { program, pointer: nextPointer, outputs, ...rest };
    },
    [OpCodes.JUMP_IF_TRUE]: ({ program, pointer, ...rest }) => {
      let nextPointer = pointer + 3;
      const [opCode, param1, param2] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      if (this.getParameterValue(program, mode1, param1) !== 0) {
        nextPointer = this.getParameterValue(program, mode2, param2);
      }
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.JUMP_IF_FALSE]: ({ program, pointer, ...rest }) => {
      let nextPointer = pointer + 3;
      const [opCode, param1, param2] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      if (this.getParameterValue(program, mode1, param1) === 0) {
        nextPointer = this.getParameterValue(program, mode2, param2);
      }
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.LESS_THAN]: ({ program, pointer, ...rest }) => {
      const nextPointer = pointer + 4;
      const [opCode, param1, param2, destination] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      program[destination] =
        this.getParameterValue(program, mode1, param1) <
        this.getParameterValue(program, mode2, param2)
          ? 1
          : 0;
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.EQUALS]: ({ program, pointer, ...rest }) => {
      const nextPointer = pointer + 4;
      const [opCode, param1, param2, destination] = program.slice(pointer, nextPointer);
      const [mode1, mode2] = [this.getParameterMode(opCode, 0), this.getParameterMode(opCode, 1)];
      program[destination] =
        this.getParameterValue(program, mode1, param1) ===
        this.getParameterValue(program, mode2, param2)
          ? 1
          : 0;
      return { program, pointer: nextPointer, ...rest };
    },
    [OpCodes.END]: ({ pointer, ...rest }) => ({ pointer: pointer + 1, ...rest }),
  };

  private getOpCode(instruction: number): OpCodes {
    return instruction % 100;
  }

  private getParameterMode(instruction: number, parameterIndex: number): Mode {
    return Math.trunc(instruction / 10 ** (parameterIndex + 2)) % 10;
  }

  private getParameterValue(program: number[], mode: Mode, parameter: number) {
    return mode === Mode.IMMEDIATE ? parameter : program[parameter];
  }
}
