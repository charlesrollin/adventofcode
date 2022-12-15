import { intersection } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';
import { Coords } from 'src/shared/types';

class DaySolver extends Solver<[Coords, Coords][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input
      .split('\n')
      .map(pairs =>
        pairs.split(',').map(range => range.split('-').map(section => parseInt(section)))
      ) as [Coords, Coords][];
  };

  protected _solveFirstPart = (input: [Coords, Coords][]) => {
    return input.reduce((acc, curr) => acc + (this.hasInclusion(curr[0], curr[1]) ? 1 : 0), 0);
  };

  protected _solveSecondPart = (input: [Coords, Coords][]) => {
    return input.reduce((acc, curr) => acc + (this.overlaps(curr[0], curr[1]) ? 1 : 0), 0);
  };

  private hasInclusion = (pair1: Coords, pair2: Coords) => {
    return (
      (pair1[0] <= pair2[0] && pair2[1] <= pair1[1]) ||
      (pair2[0] <= pair1[0] && pair1[1] <= pair2[1])
    );
  };

  private overlaps = (pair1: Coords, pair2: Coords) => {
    return (
      (pair1[0] <= pair2[0] && pair2[0] <= pair1[1]) ||
      (pair1[0] <= pair2[1] && pair2[1] <= pair1[1]) ||
      (pair2[0] <= pair1[0] && pair1[0] <= pair2[1]) ||
      (pair2[0] <= pair1[1] && pair1[1] <= pair2[1])
    );
  };
}

export const solver = new DaySolver();
