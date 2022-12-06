import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<string[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('');
  };

  protected _solveFirstPart = (input: string[]) => {
    return this.getFirstDistinctCharactersPosition(input, 4);
  };

  protected _solveSecondPart = (input: string[]) => {
    return this.getFirstDistinctCharactersPosition(input, 14);
  };

  private getFirstDistinctCharactersPosition = (input: string[], length: number) => {
    for (let idx = 0; idx < input.length - (length - 1); idx++) {
      const set = new Set(input.slice(idx, idx + length));
      if (set.size === length) {
        return idx + length;
      }
    }
    return input.length;
  };
}

export const solver = new DaySolver();
