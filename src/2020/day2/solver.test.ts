import { runCases, TestCase } from './../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`,
    expected: {
      part1: 2,
      part2: 1,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
