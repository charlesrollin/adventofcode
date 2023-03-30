import { Solver } from 'src/shared/Solver';

interface Move {
  direction: string;
  length: number;
}

class DaySolver extends Solver<[number, number], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('-').map(item => parseInt(item, 10)) as [number, number];
  };

  protected _solveFirstPart = (input: [number, number]) => {
    let matchesCount = 0;
    for (let candidate = input[0]; candidate <= input[1]; candidate++) {
      matchesCount += this.meetsPart1Criteria(candidate) ? 1 : 0;
    }
    return matchesCount;
  };

  protected _solveSecondPart = (input: [number, number]) => {
    let matchesCount = 0;
    for (let candidate = input[0]; candidate <= input[1]; candidate++) {
      matchesCount += this.meetsPart2Criteria(candidate) ? 1 : 0;
    }
    return matchesCount;
  };

  private meetsPart1Criteria = (candidate: number) => {
    const charArray = candidate.toString().split('');
    return (
      charArray.join('') === charArray.slice().sort().join('') &&
      charArray.length !== new Set(charArray).size
    );
  };

  private meetsPart2Criteria = (candidate: number) => {
    const charArray = candidate.toString().split('');
    if (charArray.join('') !== charArray.slice().sort().join('')) {
      return false;
    }
    const charCounts: Record<string, number> = {};
    charArray.forEach(char => {
      charCounts[char] = (charCounts[char] ?? 0) + 1;
    });
    return Object.values(charCounts).some(count => count === 2);
  };
}

export const solver = new DaySolver();
