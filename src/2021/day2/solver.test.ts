import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
    expected: {
      part1: 150,
      part2: 900,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
