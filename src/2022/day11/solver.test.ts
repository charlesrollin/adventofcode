import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `Monkey 0:\nStarting items: 79, 98\nOperation: new = old * 19\nTest: divisible by 23\n  If true: throw to monkey 2\n  If false: throw to monkey 3\n\nMonkey 1:\nStarting items: 54, 65, 75, 74\nOperation: new = old + 6\nTest: divisible by 19\n  If true: throw to monkey 2\n  If false: throw to monkey 0\n\nMonkey 2:\nStarting items: 79, 60, 97\nOperation: new = old * old\nTest: divisible by 13\n  If true: throw to monkey 1\n  If false: throw to monkey 3\n\nMonkey 3:\nStarting items: 74\nOperation: new = old + 3\nTest: divisible by 17\n  If true: throw to monkey 0\n  If false: throw to monkey 1
  `,
    expected: {
      part1: 10605,
      part2: 2713310158,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
