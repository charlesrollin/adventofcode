import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(item => item.split('').map(bit => parseInt(bit, 10)));
  };

  private getMostCommonBitAtPosition = (input: number[][], position: number) => {
    const sum = input.map(line => line[position]).reduce((acc, curr) => acc + curr, 0);
    return sum >= input.length / 2 ? 1 : 0;
  };

  protected _solveFirstPart = (input: number[][]) => {
    const gamma = [];
    for (let i = 0; i < input[0].length; i++) {
      let sum = 0;
      for (let j = 0; j < input.length; j++) {
        sum += input[j][i];
      }
      if (sum > input.length / 2) {
        gamma.push(1);
      } else {
        gamma.push(0);
      }
    }
    const result = parseInt(gamma.join(''), 2);
    return result * (result ^ parseInt(new Array(input[0].length).fill(1).join(''), 2));
  };

  protected _solveSecondPart = (input: number[][]) => {
    let o2Result = input;
    let co2Result = input;
    let currentIndex = 0;
    while (o2Result.length > 1) {
      let mostCommonBit = this.getMostCommonBitAtPosition(o2Result, currentIndex);
      o2Result = o2Result.filter(line => line[currentIndex] === mostCommonBit);
      currentIndex += 1;
    }
    currentIndex = 0;
    while (co2Result.length > 1) {
      let mostCommonBit = this.getMostCommonBitAtPosition(co2Result, currentIndex);
      co2Result = co2Result.filter(line => line[currentIndex] !== mostCommonBit);
      currentIndex += 1;
    }
    return parseInt(o2Result[0].join(''), 2) * parseInt(co2Result[0].join(''), 2);
  };
}

export const solver = new DaySolver();
