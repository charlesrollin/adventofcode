import { getNeighboursCoords } from 'src/shared/matrix';
import { Solver } from 'src/shared/Solver';

interface Input {
  grid: number[][];
  start: [number, number];
  end: [number, number];
}

class DaySolver extends Solver<Input, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    let start: [number, number] = [0, 0];
    let end: [number, number] = [0, 0];
    const grid = input.split('\n').map((line, lineIdx) =>
      line.split('').map((cell, cellIdx) => {
        let char = cell;
        if (cell === 'S') {
          char = 'a';
          start = [lineIdx, cellIdx];
        }
        if (cell === 'E') {
          char = 'z';
          end = [lineIdx, cellIdx];
        }
        return char.charCodeAt(0) - 97;
      })
    );
    return { grid, start, end };
  };

  protected _solveFirstPart = ({ grid, start, end }: Input) => {
    return this.buildPath({ grid, start, end });
  };

  protected _solveSecondPart = ({ grid, start, end }: Input) => {
    const starts: [number, number][] = [];
    grid.forEach((line, lineIdx) =>
      line.forEach((cell, cellIdx) => {
        if (cell === 0) {
          starts.push([lineIdx, cellIdx]);
        }
      })
    );
    let minScore = Infinity;
    starts.forEach(start => {
      minScore = Math.min(minScore, this.buildPath({ grid, start, end }));
    });
    return minScore;
  };

  private buildPath = ({ grid, start, end }: Input) => {
    const scores = new Array(grid.length)
      .fill(undefined)
      .map(_ => new Array(grid[0].length).fill(Infinity));
    scores[start[0]][start[1]] = 0;
    let unresolvedCells = [start];
    while (unresolvedCells.length > 0) {
      const cell = unresolvedCells.pop();
      unresolvedCells.push(...this.computeNeighborsScore(grid, cell, scores));
    }
    return scores[end[0]][end[1]];
  };

  private computeNeighborsScore = (
    grid: number[][],
    cell: [number, number],
    scores: number[][]
  ) => {
    const neighbourCoords = getNeighboursCoords(grid, cell).filter(
      coords =>
        grid[coords[0]][coords[1]] <= grid[cell[0]][cell[1]] + 1 &&
        scores[cell[0]][cell[1]] + 1 < scores[coords[0]][coords[1]]
    );
    neighbourCoords.forEach(coords => {
      scores[coords[0]][coords[1]] = scores[cell[0]][cell[1]] + 1;
    });
    return neighbourCoords;
  };
}

export const solver = new DaySolver();
