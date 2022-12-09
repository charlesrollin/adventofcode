import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`,
    expected: {
      part1: 13,
      part2: 1,
    },
  },
  {
    input: `R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20`,
    expected: {
      part2: 36,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
