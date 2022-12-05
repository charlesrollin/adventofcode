import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2`,
    expected: {
      part1: 'CMZ',
      part2: 'MCD',
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
