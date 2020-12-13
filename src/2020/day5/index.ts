import { Solver } from './../../shared/Solver';

interface Input {
  row: number;
  column: number;
}

class DaySolver extends Solver<Input[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      const row = parseInt(
        line
          .slice(0, 7)
          .split('')
          .map(char => (char === 'B' ? 1 : 0))
          .join(''),
        2
      );
      const column = parseInt(
        line
          .slice(7)
          .split('')
          .map(char => (char === 'R' ? 1 : 0))
          .join(''),
        2
      );
      return {
        row,
        column,
      };
    });
  };

  protected _solveFirstPart = (input: Input[]) => {
    return Math.max(...input.map(seat => seat.row * 8 + seat.column));
  };

  protected _solveSecondPart = (input: Input[]) => {
    const foundSeats = new Array(128 * 8 - 1).fill(false);
    input.forEach(seat => {
      foundSeats[seat.row * 8 + seat.column] = true;
    });
    for (let i = 1; i < foundSeats.length - 1; i++) {
      if (!foundSeats[i] && foundSeats[i - 1] && foundSeats[i + 1]) {
        return i;
      }
    }
  };
}

export const solver = new DaySolver();
