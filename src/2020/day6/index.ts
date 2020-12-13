import { intersection } from './../../shared/sets';
import { Solver } from './../../shared/Solver';

class DaySolver extends Solver<string[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n\n/).map(group => {
      return group.split(/\n/);
    });
  };

  protected _solveFirstPart = (input: string[][]) => {
    const groupsResult = input.map(group => new Set(group.join('')).size);
    return groupsResult.reduce((acc, cur) => acc + cur, 0);
  };

  protected _solveSecondPart = (input: string[][]) => {
    const groupsResult = input.map(group => {
      const sets = group.map(person => new Set(person));
      return sets.reduce((acc, curr) => intersection(acc, curr), sets[0]).size;
    });
    return groupsResult.reduce((acc, cur) => acc + cur, 0);
  };
}

export const solver = new DaySolver();
