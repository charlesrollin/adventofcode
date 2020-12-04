import { Solver } from './Solver';

class Day3 extends Solver<number[][], number> {
  constructor() {
    super(3);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(line => {
      return line.split('').map(item => (item === '#' ? 1 : 0));
    });
  };

  protected _solveFirstPart = (
    input: number[][],
    steps: { x: number; y: number } = { x: 3, y: 1 }
  ) => {
    let treeAmount = 0;
    for (let i = 0; i < input.length / steps.y; i++) {
      const line = input[i * steps.y];
      treeAmount += line[(i * steps.x) % line.length];
    }
    return treeAmount;
  };

  protected _solveSecondPart = (input: number[][]) => {
    return (
      this._solveFirstPart(input, { x: 1, y: 1 }) *
      this._solveFirstPart(input, { x: 3, y: 1 }) *
      this._solveFirstPart(input, { x: 5, y: 1 }) *
      this._solveFirstPart(input, { x: 7, y: 1 }) *
      this._solveFirstPart(input, { x: 1, y: 2 })
    );
  };
}

export const day3 = new Day3();
