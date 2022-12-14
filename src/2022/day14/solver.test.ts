import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `498,4 -> 498,6 -> 496,6\n503,4 -> 502,4 -> 502,9 -> 494,9`,
    expected: {
      part1: 24,
      part2: 93,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
