import { getInput } from "./parser";

export abstract class Solver<T, U = string> {
  protected get input() {
    return getInput(this.day);
  }

  constructor(public day: number) {}

  protected abstract parseInput(input: string): T;

  protected abstract _solveFirstPart(input: T): U;

  protected abstract _solveSecondPart(input: T): U;

  public solveFirstPart(input: string = this.input): U {
    return this._solveFirstPart(this.parseInput(input));
  }

  public solveSecondPart(input: string = this.input): U {
    return this._solveSecondPart(this.parseInput(input));
  }
}
