import { Solver } from 'src/shared/Solver';

interface Instruction {
  op: string;
  value: number;
}

enum Operation {
  NOOP = 'noop',
  ADD = 'addx',
}

class DaySolver extends Solver<Instruction[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n').map(line => {
      const [op, value] = line.split(' ');
      return { op, value: parseInt(value) };
    });
    return lines;
  };

  protected _solveFirstPart = (input: Instruction[]) => {
    let state = { cycle: 1, register: 1, signalStrength: 0 };
    input.forEach(instruction => {
      state = this.runInstruction(state, instruction);
    });
    return state.signalStrength;
  };

  protected _solveSecondPart = (input: Instruction[]) => {
    const bitMap: string[][] = new Array(6).fill(undefined).map(_ => new Array(40).fill('.'));
    let state = { cycle: 1, register: 1, signalStrength: 0 };
    input.forEach(instruction => {
      state = this.runInstruction(state, instruction, bitMap);
      // this.printBitMap(bitMap);
    });
    this.printBitMap(bitMap);
    return 0;
  };

  private runInstruction = (
    {
      register,
      cycle,
      signalStrength,
    }: {
      register: number;
      cycle: number;
      signalStrength: number;
    },
    instruction: Instruction,
    bitMap?: string[][]
  ) => {
    let arrCycle = cycle - 1;
    if (bitMap !== undefined && Math.abs(register - (arrCycle % 40)) < 2) {
      bitMap[Math.floor(arrCycle / 40)][arrCycle % 40] = '#';
    }
    const modCycle = (cycle + 20) % 40;
    if (modCycle === 0) {
      signalStrength += cycle * register;
    }
    if (instruction.op === Operation.NOOP) {
      return { register, cycle: cycle + 1, signalStrength };
    }
    if (instruction.op === Operation.ADD) {
      arrCycle += 1;
      if (bitMap !== undefined && Math.abs(register - (arrCycle % 40)) < 2) {
        bitMap[Math.floor(arrCycle / 40)][arrCycle % 40] = '#';
      }
      if (modCycle === 39) {
        signalStrength += (cycle + 1) * register;
      }
      return { register: register + instruction.value, cycle: cycle + 2, signalStrength };
    }
  };

  private printBitMap = (bitMap: string[][]) =>
    console.log(bitMap.map(line => line.join('')).join('\n'));
}

export const solver = new DaySolver();
