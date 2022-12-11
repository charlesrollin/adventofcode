import { Solver } from 'src/shared/Solver';

interface Monkey {
  items: number[];
  inspect: (item: number) => number;
  throw: (item: number) => number;
}

class DaySolver extends Solver<{ monkeys: Monkey[]; lcm: number }, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    let lcm = 1;
    const monkeys = input.split('\n\n').map(rawMonkey => {
      const [_, rawItems, rawOperation, test, trueOption, falseOption] = rawMonkey
        .split('\n')
        .map(line => line.trim());
      const items = rawItems
        .split(': ')[1]
        .split(', ')
        .map(item => parseInt(item));
      lcm = this.lowestCommonMultiple(lcm, parseInt(test.split('divisible by ')[1]));
      return {
        items,
        inspect: Function('old', `return ${rawOperation.split(' = ')[1]};`) as (
          item: number
        ) => number,
        throw: (item: number) => {
          const divisor = parseInt(test.split('divisible by ')[1]);
          if (item % divisor === 0) {
            return parseInt(trueOption.split('throw to monkey ')[1]);
          } else {
            return parseInt(falseOption.split('throw to monkey ')[1]);
          }
        },
      };
    });
    return { monkeys, lcm };
  };

  protected _solveFirstPart = ({ monkeys: input, lcm }: { monkeys: Monkey[]; lcm: number }) => {
    const inspectedTimes: number[] = new Array(input.length).fill(0);
    for (let round = 0; round < 20; round++) {
      this.runRound(input, inspectedTimes, lcm, true);
    }
    return this.computeMonkeyBusiness(inspectedTimes);
  };

  protected _solveSecondPart = ({ monkeys: input, lcm }: { monkeys: Monkey[]; lcm: number }) => {
    const inspectedTimes: number[] = new Array(input.length).fill(0);
    for (let round = 0; round < 10000; round++) {
      this.runRound(input, inspectedTimes, lcm);
    }
    return this.computeMonkeyBusiness(inspectedTimes);
  };

  private runRound = (
    monkeys: Monkey[],
    inspectedTimes: number[],
    lcm: number,
    isPartOne?: boolean
  ) => {
    monkeys.forEach((monkey, idx) => {
      monkey.items.forEach(item => {
        let inspectedItem = monkey.inspect(item);
        if (isPartOne) {
          inspectedItem = Math.floor(inspectedItem / 3);
        }
        inspectedItem = inspectedItem % lcm;
        inspectedTimes[idx] += 1;
        monkeys[monkey.throw(inspectedItem)].items.push(inspectedItem);
      });
      monkey.items = [];
    });
  };

  private computeMonkeyBusiness = (arr: number[]) => {
    const max = Math.max(...arr);
    arr.splice(
      arr.findIndex(item => item === max),
      1
    );
    return max * Math.max(...arr);
  };

  private lowestCommonMultiple = (a: number, b: number) => {
    if (b < a) {
      return this.lowestCommonMultiple(b, a);
    }
    let min = a;
    const max = a * b;
    while (min % b !== 0 && min < max) {
      min += a;
    }
    return min;
  };
}

export const solver = new DaySolver();
