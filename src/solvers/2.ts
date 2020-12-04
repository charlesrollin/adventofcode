import { Solver } from './Solver';

interface Input {
  rule: {
    min: number;
    max: number;
    letter: string;
  };
  password: string;
}

class Day2 extends Solver<Input[], number> {
  constructor() {
    super(2);
  }

  private isValidPasswordForFirstPart = (item: Input) => {
    const count = (item.password.match(new RegExp(`${item.rule.letter}`, 'g')) ?? []).length;
    return item.rule.min <= count && count <= item.rule.max;
  };

  private isValidPasswordForSecondPart = (item: Input) => {
    return (
      (item.password[item.rule.min - 1] === item.rule.letter) !==
      (item.password[item.rule.max - 1] === item.rule.letter)
    );
  };

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(item => {
      const [rest, password] = item.split(': ');
      const [min, ruleRest] = rest.split('-');
      const [max, letter] = ruleRest.split(' ');
      return {
        rule: {
          min: parseInt(min),
          max: parseInt(max),
          letter,
        },
        password,
      };
    });
  };

  protected _solveFirstPart = (input: Input[]) => {
    return input.filter(this.isValidPasswordForFirstPart).length;
  };

  protected _solveSecondPart = (input: Input[]) => {
    return input.filter(this.isValidPasswordForSecondPart).length;
  };
}

export const day2 = new Day2();
