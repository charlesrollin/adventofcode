import { getNeighboursCoords } from 'src/shared/matrix';
import { Solver } from 'src/shared/Solver';
import { Coords } from 'src/shared/types';

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(line => line.split('').map(item => parseInt(item, 10)));
  };

  private getNeighbours(input: number[][], point: Coords) {
    return getNeighboursCoords(input, point).map(([i, j]) => input[i][j]);
  }

  private getLowPoints(input: number[][]) {
    const lowPoints: Coords[] = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        const neighbours = this.getNeighbours(input, [i, j]);
        if (neighbours.every(neighbour => input[i][j] < neighbour)) {
          lowPoints.push([i, j]);
        }
      }
    }
    return lowPoints;
  }

  private getBasin(input: number[][], lowPoint: Coords) {
    const basinPoints = new Map();
    basinPoints.set(`${lowPoint[0]},${lowPoint[1]}`, true);
    let pointsQueue = [lowPoint];
    while (pointsQueue.length > 0) {
      let nextPoints = [];
      pointsQueue.forEach(point => {
        const neighbours = getNeighboursCoords(input, point);
        neighbours.forEach(neighbour => {
          const neighbourValue = input[neighbour[0]][neighbour[1]];
          if (input[point[0]][point[1]] < neighbourValue && neighbourValue !== 9) {
            basinPoints.set(`${neighbour[0]},${neighbour[1]}`, true);
            nextPoints.push(neighbour);
          }
        });
      });
      pointsQueue = nextPoints;
    }
    return basinPoints;
  }

  protected _solveFirstPart = (input: number[][]) => {
    return this.getLowPoints(input).reduce((acc, curr) => acc + input[curr[0]][curr[1]] + 1, 0);
  };

  protected _solveSecondPart = (input: number[][]) => {
    const lowPoints = this.getLowPoints(input);
    const basinSizes = lowPoints
      .map(point => this.getBasin(input, point))
      .map(basin => basin.size)
      .sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
  };
}

export const solver = new DaySolver();
