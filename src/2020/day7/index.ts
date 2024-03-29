import { difference, union } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';

interface Input {
  key: string;
  contains: { key: string; amount: number }[];
}

class DaySolver extends Solver<any[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input
      .split(/\n/)
      .map(line => {
        const [_, key, rules] = line.match(/^(.*) bags contain (.*).$/);
        return { key, rules };
      })
      .map(({ key, rules }) => {
        return {
          key,
          contains:
            rules === 'no other bags'
              ? []
              : Array.from(rules.matchAll(/(\d)+ (.*?) bag(?:s)?(?:, )?/g)).map(rule => ({
                  amount: parseInt(rule[1]),
                  key: rule[2],
                })),
        };
      });
  };

  private getContainers(
    input: { [key: string]: Set<string> },
    bags: Set<string> = new Set(['shiny gold']),
    metColors: Set<string> = new Set()
  ): Set<string> {
    if ([...bags].every(color => input[color] === undefined)) {
      return bags;
    }
    return [...difference(bags, metColors)].reduce(
      (acc, color) => union(acc, this.getContainers(input, input[color], union(metColors, bags))),
      bags
    );
  }

  protected _solveFirstPart = (input: Input[]) => {
    const reversedInput: { [key: string]: Set<string> } = {};
    input.forEach(item => {
      item.contains.forEach(contained => {
        reversedInput[contained.key] = (reversedInput[contained.key] ?? new Set()).add(item.key);
      });
    });
    // We remove the initial bag color
    return this.getContainers(reversedInput).size - 1;
  };

  private getContent(
    input: { [key: string]: { key: string; amount: number }[] },
    bag: string = 'shiny gold'
  ): number {
    if (input[bag] === undefined) {
      return 0;
    }
    const res = input[bag].reduce(
      (acc, color) => acc + color.amount * this.getContent(input, color.key),
      1
    );
    return res;
  }

  protected _solveSecondPart = (input: Input[]) => {
    const fasterInput = Object.fromEntries(input.map(item => [item.key, item.contains]));
    // We remove the initial bag color
    return this.getContent(fasterInput) - 1;
  };
}

export const solver = new DaySolver();
