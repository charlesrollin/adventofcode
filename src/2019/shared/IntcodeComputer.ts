enum OpCodes {
  ADD = 1,
  MULTIPLY = 2,
  END = 99,
}

export class IntcodeComputer {
  run = (program: number[], idx: number = 0): number => {
    if (program[idx] === OpCodes.END) {
      return program[0];
    }
    const nextIdx = this.operationsMapping[program[idx]](program, idx + 1);
    return this.run(program, nextIdx);
  };

  private operationsMapping: Record<OpCodes, (program: number[], idx: number) => number> = {
    [OpCodes.ADD]: (program, idx) => {
      program[program[idx + 2]] = program[program[idx]] + program[program[idx + 1]];
      return idx + 3;
    },
    [OpCodes.MULTIPLY]: (program, idx) => {
      program[program[idx + 2]] = program[program[idx]] * program[program[idx + 1]];
      return idx + 3;
    },
    [OpCodes.END]: (_, idx) => idx + 1,
  };
}
