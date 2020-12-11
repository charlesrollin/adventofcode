import { Solver } from '../solvers/Solver';

enum Cell {
  FLOOR = '.',
  EMPTY = 'L',
  OCCUPIED = '#',
}

class DaySolver extends Solver<Cell[][], number> {
  private map = new Map<string, number>();
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      return line.split('') as Cell[];
    });
  };

  private isOccupied(input: Cell[][], i: number, j: number) {
    return input[i]?.[j] !== undefined ? input[i][j] === Cell.OCCUPIED : false;
  }

  private countOccupiedNeighbors(
    input: Cell[][],
    i: number,
    j: number,
    countVisibleNeighbors = false
  ) {
    if (countVisibleNeighbors) {
      return this.countVisibleOccupiedNeighbors(input, i, j);
    }
    return (
      (this.isOccupied(input, i - 1, j - 1) ? 1 : 0) +
      (this.isOccupied(input, i - 1, j) ? 1 : 0) +
      (this.isOccupied(input, i, j - 1) ? 1 : 0) +
      (this.isOccupied(input, i + 1, j) ? 1 : 0) +
      (this.isOccupied(input, i, j + 1) ? 1 : 0) +
      (this.isOccupied(input, i + 1, j + 1) ? 1 : 0) +
      (this.isOccupied(input, i + 1, j - 1) ? 1 : 0) +
      (this.isOccupied(input, i - 1, j + 1) ? 1 : 0)
    );
  }

  private countVisibleOccupiedNeighbors(input: Cell[][], i: number, j: number) {
    const DIRECTIONS = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];
    let visibleNeighbors = 0;
    for (let idx = 0; idx < DIRECTIONS.length; idx++) {
      if (visibleNeighbors === 5) {
        return visibleNeighbors;
      }
      const direction = DIRECTIONS[idx];
      let currentI = i + direction[0];
      let currentJ = j + direction[1];
      while (
        0 <= currentI &&
        currentI < input.length &&
        0 <= currentJ &&
        currentJ < input[0].length &&
        input[currentI][currentJ] === Cell.FLOOR
      ) {
        currentI += direction[0];
        currentJ += direction[1];
      }
      if (
        input[currentI]?.[currentJ] !== undefined &&
        input[currentI][currentJ] === Cell.OCCUPIED
      ) {
        visibleNeighbors += 1;
      }
    }
    return visibleNeighbors;
  }

  private updateCells(input: Cell[][], params = { maxNeighbors: 3, countVisibleNeighbors: false }) {
    const result = input.map(line => [...line]);
    let didChange = false;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (
          input[i][j] === Cell.EMPTY &&
          this.countOccupiedNeighbors(input, i, j, params.countVisibleNeighbors) === 0
        ) {
          result[i][j] = Cell.OCCUPIED;
          didChange = true;
        }
        if (
          input[i][j] === Cell.OCCUPIED &&
          this.countOccupiedNeighbors(input, i, j, params.countVisibleNeighbors) >
            params.maxNeighbors
        ) {
          result[i][j] = Cell.EMPTY;
          didChange = true;
        }
      }
    }
    return {
      result,
      didChange,
    };
  }

  protected _solveFirstPart = (input: Cell[][]) => {
    let status = this.updateCells(input);
    let count = 0;
    while (status.didChange) {
      // console.log(status.result.map(line => line.join('')).join('\n'), '\n');
      status = this.updateCells(status.result);
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (status.result[i][j] === Cell.OCCUPIED) {
          count += 1;
        }
      }
    }
    return count;
  };

  protected _solveSecondPart = (input: Cell[][]) => {
    let status = this.updateCells(input, { maxNeighbors: 4, countVisibleNeighbors: true });
    let count = 0;
    while (status.didChange) {
      // console.log(status.result.map(line => line.join('')).join('\n'), '\n');
      status = this.updateCells(status.result, { maxNeighbors: 4, countVisibleNeighbors: true });
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (status.result[i][j] === Cell.OCCUPIED) {
          count += 1;
        }
      }
    }
    return count;
  };
}

export const solver = new DaySolver();
