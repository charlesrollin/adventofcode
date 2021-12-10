import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `2199943210\n3987894921\n9856789892\n8767896789\n9899965678`,
    expected: {
      part1: 15,
      part2: 1134,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
