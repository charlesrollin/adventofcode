import { Solver } from 'src/shared/Solver';
import { Coords } from 'src/shared/types';

enum Content {
  ROCK = '#',
  SAND = '+',
}

class DaySolver extends Solver<Coords[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input
      .split('\n')
      .map(segments =>
        segments
          .split(' -> ')
          .map(segment => segment.split(',').map(coord => parseInt(coord)) as Coords)
      );
    return lines;
  };

  protected _solveFirstPart = (input: Coords[][]) => {
    const { caveMap, maxLeft, maxRight } = this.buildCaveMap(input);
    while (this.dropSand(caveMap, maxLeft, maxRight)) {}
    return [...caveMap.values()].filter(value => value === Content.SAND).length;
  };

  protected _solveSecondPart = (input: Coords[][]) => {
    const { caveMap, maxBottom } = this.buildCaveMap(input);
    while (this.dropSand(caveMap, -Infinity, Infinity, maxBottom + 2)) {}
    return [...caveMap.values()].filter(value => value === Content.SAND).length;
  };

  private buildCaveMap = (input: Coords[][]) => {
    const caveMap = new Map<string, Content>();
    let maxLeft = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;
    input.forEach(segments => {
      for (let idx = 0; idx < segments.length - 1; idx++) {
        const start = segments[idx];
        const end = segments[idx + 1];
        const dx = Math.sign(end[0] - start[0]);
        const dy = Math.sign(end[1] - start[1]);
        for (
          let step = 0;
          start[0] + step * dx !== end[0] || start[1] + step * dy !== end[1];
          step++
        ) {
          this.setMapCellContent(
            caveMap,
            [start[0] + step * dx, start[1] + step * dy],
            Content.ROCK
          );
        }
        this.setMapCellContent(caveMap, end, Content.ROCK);
        maxLeft = Math.min(maxLeft, start[0], end[0]);
        maxRight = Math.max(maxRight, start[0], end[0]);
        maxBottom = Math.max(maxBottom, start[1], end[1]);
      }
    });
    return { caveMap, maxLeft, maxRight, maxBottom };
  };

  private dropSand = (
    caveMap: Map<string, Content>,
    maxLeft: number,
    maxRight: number,
    floorLevel?: number
  ) => {
    let currentCoords = [500, 0] as Coords;
    if (this.getMapCellContent(caveMap, currentCoords)) {
      return false;
    }
    let nextMove = this.nextSandMove(caveMap, currentCoords);
    while (currentCoords.join('|') !== nextMove.join('|')) {
      if (nextMove[0] < maxLeft || nextMove[0] > maxRight) {
        return false;
      }
      currentCoords = nextMove;
      nextMove = this.nextSandMove(caveMap, currentCoords, floorLevel);
    }
    this.setMapCellContent(caveMap, currentCoords, Content.SAND);
    return true;
  };

  private nextSandMove = (
    caveMap: Map<string, Content>,
    currentCoords: Coords,
    floorLevel?: number
  ) => {
    if (floorLevel && currentCoords[1] === floorLevel - 1) {
      return currentCoords;
    }
    const below = [currentCoords[0], currentCoords[1] + 1] as Coords;
    if (!this.getMapCellContent(caveMap, below)) {
      return below;
    }
    const belowLeft = [currentCoords[0] - 1, currentCoords[1] + 1] as Coords;
    if (!this.getMapCellContent(caveMap, belowLeft)) {
      return belowLeft;
    }
    const belowRight = [currentCoords[0] + 1, currentCoords[1] + 1] as Coords;
    if (!this.getMapCellContent(caveMap, belowRight)) {
      return belowRight;
    }
    return currentCoords;
  };

  private getMapCellContent = (caveMap: Map<string, Content>, coords: Coords) =>
    caveMap.get(coords.join('|'));

  private setMapCellContent = (caveMap: Map<string, Content>, coords: Coords, value: Content) =>
    caveMap.set(coords.join('|'), value);
}

export const solver = new DaySolver();
