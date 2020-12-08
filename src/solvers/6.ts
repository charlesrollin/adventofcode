import { intersection } from './../shared/sets';
import { Solver } from './Solver';

interface Input {
  row: number;
  column: number;
}

class Day6 extends Solver<string[][], number> {
  constructor() {
    super(6);
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

export const day6 = new Day6();
