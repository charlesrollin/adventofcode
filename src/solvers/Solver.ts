import { getInput } from './parser';

export abstract class Solver<T, U = string> {
  protected get input() {
    return getInput(this.dirName);
  }

  constructor(public dirName: string) {}

  protected abstract parseInput(input: string): T;

  protected abstract _solveFirstPart(input: T, extraParams?: any): U;

  protected abstract _solveSecondPart(input: T, extraParams?: any): U;

  public solveFirstPart(input: string = this.input, extraParams?: any): U {
    return this._solveFirstPart(this.parseInput(input), extraParams);
  }

  public solveSecondPart(input: string = this.input, extraParams?: any): U {
    return this._solveSecondPart(this.parseInput(input), extraParams);
  }
}
