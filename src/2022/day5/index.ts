import { Solver } from 'src/shared/Solver';

interface Input {
  stacks: string[][];
  moves: { from: number; to: number; quantity: number }[];
}

class DaySolver extends Solver<Input, string> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n');
    const stacksAmount = (lines[0].length + 1) / 4;
    let endOfStacks = false;
    const stacks: string[][] = new Array(stacksAmount);
    const moves = [];
    lines.forEach(line => {
      if (line[1] === '1') {
        endOfStacks = true;
        return;
      }
      if (!endOfStacks) {
        const matches = line.matchAll(/(?:\[([A-Z])\]|(\s\s\s\s))/g);
        for (const match of matches) {
          if (match[0] !== '    ') {
            if (stacks[match.index / 4] === undefined) {
              stacks[match.index / 4] = [];
            }
            stacks[match.index / 4].push(match[1]);
          }
        }
      }
      if (endOfStacks) {
        const match = line.match(/move (\d*) from (\d) to (\d)/);
        if (match !== null) {
          moves.push({
            from: parseInt(match[2]),
            to: parseInt(match[3]),
            quantity: parseInt(match[1]),
          });
        }
      }
    });
    // To be able to use .pop
    stacks.forEach(stack => stack.reverse());
    return { stacks, moves };
  };

  protected _solveFirstPart = ({ stacks, moves }: Input) => {
    moves.forEach(move => {
      for (let index = 0; index < move.quantity; index++) {
        const item = stacks[move.from - 1].pop();
        stacks[move.to - 1].push(item);
      }
    });
    return stacks.map(stack => stack.pop()).join('');
  };

  protected _solveSecondPart = ({ stacks, moves }: Input) => {
    moves.forEach(move => {
      const fromStack = stacks[move.from - 1];
      const temp = fromStack.splice(fromStack.length - move.quantity, move.quantity);
      stacks[move.to - 1].push(...temp);
    });
    return stacks.map(stack => stack.pop()).join('');
  };
}

export const solver = new DaySolver();
