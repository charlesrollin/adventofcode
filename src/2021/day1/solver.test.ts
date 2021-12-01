import { runCases, TestCase } from './../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `199
    200
    208
    210
    200
    207
    240
    269
    260
    263`,
    expected: {
      part1: 7,
      part2: 5,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
