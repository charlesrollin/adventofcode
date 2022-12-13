import { Solver } from 'src/shared/Solver';

type Arrays = (number | number[])[];

class DaySolver extends Solver<[Arrays, Arrays][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input
      .split('\n\n')
      .map(group => group.split('\n').map(item => JSON.parse(item)) as [Arrays, Arrays]);
    return lines;
  };

  protected _solveFirstPart = (input: [Arrays, Arrays][]) => {
    let sum = 0;
    input.forEach((group, idx) => {
      if (this.compare(group[0], group[1]) <= 0) {
        sum += idx + 1;
      }
    });
    return sum;
  };

  protected _solveSecondPart = (input: [Arrays, Arrays][]) => {
    const receivers = [[[2]], [[6]]];
    const list: Arrays[] = [...receivers];
    input.forEach(group => list.push(...group));
    list.sort(this.compare);
    return (
      (list.findIndex(item => JSON.stringify(receivers[0]) === JSON.stringify(item)) + 1) *
      (list.findIndex(item => JSON.stringify(receivers[1]) === JSON.stringify(item)) + 1)
    );
  };

  private compare = (a: number | (number | number[])[], b: number | (number | number[])[]) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let idx = 0; idx < Math.min(a.length, b.length); idx++) {
        const comparison = this.compare(a[idx], b[idx]);
        if (comparison !== 0) {
          return comparison;
        }
      }
      return a.length - b.length;
    }
    if (typeof a === 'number') {
      return this.compare([a], b);
    }
    if (typeof b === 'number') {
      return this.compare(a, [b]);
    }
  };
}

export const solver = new DaySolver();
