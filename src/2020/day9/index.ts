import { Solver } from './../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      return parseInt(line);
    });
  };

  protected _solveFirstPart = (input: number[], preambleSize: number = 25) => {
    for (let i = preambleSize; i < input.length; i++) {
      const map = {};
      input.slice(i - preambleSize, i).forEach(number => (map[number] = true));
      if (
        !Object.keys(map).some(key => {
          return map[input[i] - ((key as unknown) as number)] !== undefined;
        })
      ) {
        return input[i];
      }
    }
  };

  protected _solveSecondPart = (input: number[], preambleSize: number = 25) => {
    let candidates: { start: number; sum: number }[] = [];
    const goal = this._solveFirstPart(input, preambleSize);
    for (let i = 0; i < input.length; i++) {
      candidates = candidates
        .map(candidate => ({ ...candidate, sum: candidate.sum + input[i] }))
        .filter(candidate => candidate.sum <= goal);
      if (input[i] <= goal) {
        candidates.push({ start: i, sum: input[i] });
      }
      const winner = candidates.find(candidate => candidate.sum === goal);
      if (winner) {
        return (
          Math.min(...input.slice(winner.start, i + 1)) +
          Math.max(...input.slice(winner.start, i + 1))
        );
      }
    }
  };
}

export const solver = new DaySolver();
