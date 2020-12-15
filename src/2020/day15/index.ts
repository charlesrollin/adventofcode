import { Solver } from '../../shared/Solver';

class DaySolver extends Solver<number[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(',').map(item => {
      return parseInt(item);
    });
  };

  protected _solveFirstPart = (input: number[], roundsAmount = 2020) => {
    let round = input.length;
    let lastSpokenNumber = input.pop();
    const ageMap = new Map<number, number>();
    input.forEach((item, idx) => {
      ageMap.set(item, idx + 1);
    });
    while (round < roundsAmount) {
      let nextLastSpokenNumber;
      const lastSpokenNumberOccurence = ageMap.get(lastSpokenNumber);
      round += 1;
      if (lastSpokenNumberOccurence === undefined) {
        nextLastSpokenNumber = 0;
      } else {
        nextLastSpokenNumber = round - 1 - lastSpokenNumberOccurence;
      }
      ageMap.set(lastSpokenNumber, round - 1);
      lastSpokenNumber = nextLastSpokenNumber;
    }
    return lastSpokenNumber;
  };

  protected _solveSecondPart = (input: number[]) => {
    return this._solveFirstPart(input, 30000000);
  };
}

export const solver = new DaySolver();
