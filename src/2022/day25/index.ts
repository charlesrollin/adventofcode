import { Solver } from 'src/shared/Solver';

const snafuToDecimalDigits = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2,
};
const decimalToSnafuDigits = {
  [-2]: '=',
  [-1]: '-',
  0: '0',
  1: '1',
  2: '2',
};

class DaySolver extends Solver<string[][], string, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(line => line.split(''));
  };

  protected _solveFirstPart = (input: string[][]) => {
    const result = input.reduce((acc, curr) => acc + this.toDecimal(curr), 0);
    return this.toSnafu(result);
  };

  protected _solveSecondPart = (input: string[][]) => {
    return '';
  };

  private toDecimal = (snafu: string[]) => {
    let result = 0;
    snafu.forEach(digit => {
      result *= 5;
      result += snafuToDecimalDigits[digit];
    });
    return result;
  };

  private toSnafu = (decimal: number) => {
    let result = '';
    let hasRemainder = false;
    let temp = decimal;
    while (temp !== 0) {
      let digit = temp % 5;
      if (digit > 2) {
        digit = digit - 5;
        hasRemainder = true;
      }
      result += decimalToSnafuDigits[digit];
      temp = Math.floor(temp / 5) + (hasRemainder ? 1 : 0);
      hasRemainder = false;
    }
    return result.split('').reverse().join('');
  };
}

export const solver = new DaySolver();
