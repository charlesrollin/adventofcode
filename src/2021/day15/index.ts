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

  private computeRisks(input: number[][]) {
    const risksMap = new Map<string, number>();
    let currentPositions: Coords[] = [[0, 0]];
    risksMap.set('0,0', 0);
    while (currentPositions.length > 0) {
      const nextPositions: Coords[] = [];
      currentPositions.forEach(position => {
        getNeighboursCoords(input, position).forEach(neighbour => {
          const nextRisk =
            risksMap.get(`${position[0]},${position[1]}`) + input[neighbour[0]][neighbour[1]];
          if (nextRisk < (risksMap.get(`${neighbour[0]},${neighbour[1]}`) ?? Infinity)) {
            risksMap.set(
              `${neighbour[0]},${neighbour[1]}`,
              risksMap.get(`${position[0]},${position[1]}`) + input[neighbour[0]][neighbour[1]]
            );
            if (neighbour[0] !== input.length - 1 || neighbour[1] !== input.length - 1) {
              nextPositions.push(neighbour);
            }
          }
        });
      });
      currentPositions = nextPositions;
    }
    return risksMap;
  }

  private generateFurtherTile(input: number[][], distance: number) {
    return input.map(line =>
      line.map(item => ((item + distance) % 10) + (item + distance >= 10 ? 1 : 0))
    );
  }

  private generateCaveLine(input: number[][], offset: number) {
    const caveLine: number[][] = new Array(input.length).fill([]);
    const tiles = new Array(5)
      .fill(undefined)
      .map((_, idx) => this.generateFurtherTile(input, offset + idx));
    for (let i = 0; i < input.length; i++) {
      caveLine[i] = [
        ...tiles[0][i],
        ...tiles[1][i],
        ...tiles[2][i],
        ...tiles[3][i],
        ...tiles[4][i],
      ];
    }
    return caveLine;
  }

  protected _solveFirstPart = (input: number[][]) => {
    const risksMap = this.computeRisks(input);
    return risksMap.get(`${input.length - 1},${input.length - 1}`);
  };

  protected _solveSecondPart = (input: number[][]) => {
    const bigInput: number[][] = [
      ...this.generateCaveLine(input, 0),
      ...this.generateCaveLine(input, 1),
      ...this.generateCaveLine(input, 2),
      ...this.generateCaveLine(input, 3),
      ...this.generateCaveLine(input, 4),
    ];
    const risksMap = this.computeRisks(bigInput);
    return risksMap.get(`${bigInput.length - 1},${bigInput.length - 1}`);
  };
}

export const solver = new DaySolver();
