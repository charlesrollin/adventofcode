import { Solver } from 'src/shared/Solver';

enum PassportKeys {
  byr = 'byr',
  iyr = 'iyr',
  eyr = 'eyr',
  hgt = 'hgt',
  hcl = 'hcl',
  ecl = 'ecl',
  pid = 'pid',
  cid = 'cid',
}

type Input = {
  [key in PassportKeys]: string;
};

class DaySolver extends Solver<Input[], number> {
  constructor() {
    super(__dirname);
  }

  private parsePassport = (raw: string): Input => {
    return Object.fromEntries(
      raw
        .replace(new RegExp('\n', 'g'), ' ')
        .split(' ')
        .map(item => item.split(':'))
    );
  };

  protected parseInput = (input: string) => {
    return input.split(/\n\n/).map(this.parsePassport);
  };

  protected _solveFirstPart = (input: Input[], extraValidation?: (input: Input) => boolean) => {
    return input.filter(passport => {
      let result =
        Object.keys(passport).length === Object.keys(PassportKeys).length ||
        (Object.keys(passport).length === Object.keys(PassportKeys).length - 1 &&
          passport.cid === undefined);
      if (extraValidation) {
        result = result && extraValidation(passport);
      }
      return result;
    }).length;
  };

  protected _solveSecondPart = (input: Input[]) => {
    return this._solveFirstPart(input, passport => {
      const birthYear = parseInt(passport.byr);
      const issueYear = parseInt(passport.iyr);
      const expirationYear = parseInt(passport.eyr);
      let height;

      const cm = /^(\d+)cm$/.exec(passport.hgt);
      if (cm) {
        height = parseInt(cm[1]);
      }
      const inches = /^(\d+)in$/.exec(passport.hgt);
      if (inches) {
        height = parseInt(inches[1]);
      }

      return (
        1920 <= birthYear &&
        birthYear <= 2002 &&
        2010 <= issueYear &&
        issueYear <= 2020 &&
        2020 <= expirationYear &&
        expirationYear <= 2030 &&
        /^#([a-f0-9]){6}$/.test(passport.hcl) &&
        /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl) &&
        /^\d{9}$/.test(passport.pid) &&
        ((cm && 150 <= height && height <= 193) || (inches && 59 <= height && height <= 76))
      );
    });
  };
}

export const solver = new DaySolver();
