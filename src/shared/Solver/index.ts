import { getInput } from './parser';

export abstract class Solver<T, U = string, V = never> {
  protected get input() {
    return getInput(this.dirName);
  }

  constructor(public dirName: string) {}

  protected abstract parseInput(input: string): T;

  protected abstract _solveFirstPart(input: T, extraParams?: V): U;

  protected abstract _solveSecondPart(input: T, extraParams?: V): U;

  public solveFirstPart(input: string = this.input, extraParams?: V): U {
    return this._solveFirstPart(this.parseInput(input), extraParams);
  }

  public solveSecondPart(input: string = this.input, extraParams?: V): U {
    return this._solveSecondPart(this.parseInput(input), extraParams);
  }
}
