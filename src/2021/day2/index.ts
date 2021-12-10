import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<{ direction: string; distance: number }[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input
      .split(/\r?\n/)
      .map(item => item.split(' '))
      .map(([direction, distance]) => ({ direction, distance: parseInt(distance, 10) }));
  };

  protected _solveFirstPart = (input: { direction: string; distance: number }[]) => {
    let horizontalPosition = 0;
    let depth = 0;
    input.forEach(({ direction, distance }) => {
      switch (direction) {
        case 'forward':
          horizontalPosition += distance;
          break;
        case 'up':
          depth -= distance;
          break;
        case 'down':
          depth += distance;
          break;
      }
    });
    return horizontalPosition * depth;
  };

  protected _solveSecondPart = (input: { direction: string; distance: number }[]) => {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
    input.forEach(({ direction, distance }) => {
      switch (direction) {
        case 'forward':
          horizontalPosition += distance;
          depth += aim * distance;
          break;
        case 'up':
          aim -= distance;
          break;
        case 'down':
          aim += distance;
          break;
      }
    });
    return horizontalPosition * depth;
  };
}

export const solver = new DaySolver();
