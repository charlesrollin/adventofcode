import { intersection } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<[[number, number], [number, number]][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input
      .split('\n')
      .map(pairs =>
        pairs.split(',').map(range => range.split('-').map(section => parseInt(section)))
      ) as [[number, number], [number, number]][];
  };

  protected _solveFirstPart = (input: [[number, number], [number, number]][]) => {
    return input.reduce((acc, curr) => acc + (this.hasInclusion(curr[0], curr[1]) ? 1 : 0), 0);
  };

  protected _solveSecondPart = (input: [[number, number], [number, number]][]) => {
    return input.reduce((acc, curr) => acc + (this.overlaps(curr[0], curr[1]) ? 1 : 0), 0);
  };

  private hasInclusion = (pair1: [number, number], pair2: [number, number]) => {
    return (
      (pair1[0] <= pair2[0] && pair2[1] <= pair1[1]) ||
      (pair2[0] <= pair1[0] && pair1[1] <= pair2[1])
    );
  };

  private overlaps = (pair1: [number, number], pair2: [number, number]) => {
    return (
      (pair1[0] <= pair2[0] && pair2[0] <= pair1[1]) ||
      (pair1[0] <= pair2[1] && pair2[1] <= pair1[1]) ||
      (pair2[0] <= pair1[0] && pair1[0] <= pair2[1]) ||
      (pair2[0] <= pair1[1] && pair1[1] <= pair2[1])
    );
  };
}

export const solver = new DaySolver();
