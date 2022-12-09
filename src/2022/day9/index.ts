import { Solver } from 'src/shared/Solver';

enum Direction {
  LEFT = 'L',
  RIGHT = 'R',
  UP = 'U',
  DOWN = 'D',
}

const directionsOffsets: Record<Direction, [number, number]> = {
  [Direction.LEFT]: [-1, 0],
  [Direction.RIGHT]: [1, 0],
  [Direction.UP]: [0, 1],
  [Direction.DOWN]: [0, -1],
};

interface Move {
  direction: Direction;
  steps: number;
}

class DaySolver extends Solver<Move[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n').map(line => {
      const [direction, steps] = line.split(' ');
      return { direction: direction as Direction, steps: parseInt(steps) };
    });
    return lines;
  };

  protected _solveFirstPart = (input: Move[]) => {
    const visitedCells = new Set<string>(['0,0']);
    const rope = [
      [0, 0],
      [0, 0],
    ] as [number, number][];
    input.forEach(move => {
      this.moveRope(rope, move, visitedCells);
    });
    return visitedCells.size;
  };

  protected _solveSecondPart = (input: Move[]) => {
    const visitedCells = new Set<string>(['0,0']);
    const rope = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ] as [number, number][];
    input.forEach(move => {
      this.moveRope(rope, move, visitedCells);
    });
    return visitedCells.size;
  };

  private moveRope = (rope: [number, number][], move: Move, visitedCells: Set<string>) => {
    new Array(move.steps).fill(undefined).forEach(_ => {
      let newHead = this.moveHead(rope[0], move.direction);
      rope[0] = newHead;
      let newNextNode = rope[1];
      for (let index = 1; index < rope.length; index++) {
        newNextNode = this.moveNextNode(rope[index - 1], rope[index]);
        rope[index] = newNextNode;
      }
      visitedCells.add(newNextNode.join(','));
    });
    return rope;
  };

  private moveHead = (head: [number, number], direction: Direction) => {
    const directionOffset = directionsOffsets[direction];
    return [head[0] + directionOffset[0], head[1] + directionOffset[1]] as [number, number];
  };

  private moveNextNode = (currentNode: [number, number], nextNode: [number, number]) => {
    let newNode = nextNode;
    const xDiff = currentNode[0] - nextNode[0];
    const yDiff = currentNode[1] - nextNode[1];
    if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
      newNode = [nextNode[0] + Math.sign(xDiff), nextNode[1] + Math.sign(yDiff)];
    }
    return newNode;
  };
}

export const solver = new DaySolver();
