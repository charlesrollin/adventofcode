import { Solver } from 'src/shared/Solver';

interface Input {
  polymer: string;
  rules: [string, string][];
}

class DaySolver extends Solver<Input, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [polymer, rawRules] = input.split(/\r?\n\r?\n/);
    return {
      polymer,
      rules: rawRules.split(/\r?\n/).map(str => str.split(' -> ') as [string, string]),
    };
  };

  private polymerise(input: Input, steps: number) {
    let currentPolymer = input.polymer;
    const rulesMap = new Map<string, string>();
    input.rules.forEach(rule => {
      rulesMap.set(rule[0], rule[0][0] + rule[1]);
    });
    for (let step = 0; step < steps; step++) {
      const tempPolymer: string[] = [];
      for (let i = 0; i < currentPolymer.length - 1; i++) {
        tempPolymer.push(
          rulesMap.get(currentPolymer[i] + currentPolymer[i + 1]) ?? currentPolymer[i]
        );
      }
      tempPolymer.push(currentPolymer[currentPolymer.length - 1]);
      currentPolymer = tempPolymer.join('');
    }
    const countMap = new Map<string, number>();
    for (let i = 0; i < currentPolymer.length; i++) {
      countMap.set(currentPolymer[i], (countMap.get(currentPolymer[i]) ?? 0) + 1);
    }
    return { polymer: currentPolymer, stats: countMap };
  }

  protected _solveFirstPart = (input: Input) => {
    const { stats } = this.polymerise(input, 10);
    return Math.max(...stats.values()) - Math.min(...stats.values());
  };

  protected _solveSecondPart = (input: Input) => {
    const currentPolymer = input.polymer;
    const rulesMapPerMultipleSteps = new Map<
      string,
      { polymer: string; stats: Map<string, number> }
    >();
    input.rules.forEach(rule => {
      const { polymer, stats } = this.polymerise({ polymer: rule[0], rules: input.rules }, 20);
      stats.set(polymer[polymer.length - 1], stats.get(polymer[polymer.length - 1]) - 1);
      rulesMapPerMultipleSteps.set(rule[0], {
        polymer: polymer.substring(0, polymer.length - 1),
        stats,
      });
    });
    const tempPolymer: string[] = [];
    for (let i = 0; i < currentPolymer.length - 1; i++) {
      tempPolymer.push(
        rulesMapPerMultipleSteps.get(currentPolymer[i] + currentPolymer[i + 1]).polymer ??
          currentPolymer[i]
      );
    }
    tempPolymer.push(currentPolymer[currentPolymer.length - 1]);
    const strPolymer = tempPolymer.join('');
    const countMap = new Map<string, number>();
    for (let i = 0; i < strPolymer.length - 1; i++) {
      const { stats } = rulesMapPerMultipleSteps.get(strPolymer[i] + strPolymer[i + 1]);
      for (let [key, value] of stats) {
        countMap.set(key, (countMap.get(key) ?? 0) + value);
      }
    }
    countMap.set(
      strPolymer[strPolymer.length - 1],
      countMap.get(strPolymer[strPolymer.length - 1]) + 1
    );
    return Math.max(...countMap.values()) - Math.min(...countMap.values());
  };
}

export const solver = new DaySolver();
