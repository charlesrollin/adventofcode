import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `30373\n25512\n65332\n33549\n35390`,
    expected: {
      part1: 21,
      part2: 8,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
