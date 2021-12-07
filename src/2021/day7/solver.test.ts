import { runCases, TestCase } from '../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `16,1,2,0,4,2,7,1,2,14`,
    expected: {
      part1: 37,
      part2: 168,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
