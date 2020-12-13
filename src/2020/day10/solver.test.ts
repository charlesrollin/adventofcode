import { runCases, TestCase } from './../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `1
    2
    3`,
    expected: {
      part1: 3,
      part2: 4,
    },
  },
  {
    input: `16
    10
    15
    5
    1
    11
    7
    19
    6
    12
    4`,
    expected: {
      part1: 35,
      part2: 8,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
