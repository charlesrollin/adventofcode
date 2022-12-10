import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `addx 15\naddx -11\naddx 6\naddx -3\naddx 5\naddx -1\naddx -8\naddx 13\naddx 4\nnoop\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx -35\naddx 1\naddx 24\naddx -19\naddx 1\naddx 16\naddx -11\nnoop\nnoop\naddx 21\naddx -15\nnoop\nnoop\naddx -3\naddx 9\naddx 1\naddx -3\naddx 8\naddx 1\naddx 5\nnoop\nnoop\nnoop\nnoop\nnoop\naddx -36\nnoop\naddx 1\naddx 7\nnoop\nnoop\nnoop\naddx 2\naddx 6\nnoop\nnoop\nnoop\nnoop\nnoop\naddx 1\nnoop\nnoop\naddx 7\naddx 1\nnoop\naddx -13\naddx 13\naddx 7\nnoop\naddx 1\naddx -33\nnoop\nnoop\nnoop\naddx 2\nnoop\nnoop\nnoop\naddx 8\nnoop\naddx -1\naddx 2\naddx 1\nnoop\naddx 17\naddx -9\naddx 1\naddx 1\naddx -3\naddx 11\nnoop\nnoop\naddx 1\nnoop\naddx 1\nnoop\nnoop\naddx -13\naddx -19\naddx 1\naddx 3\naddx 26\naddx -30\naddx 12\naddx -1\naddx 3\naddx 1\nnoop\nnoop\nnoop\naddx -9\naddx 18\naddx 1\naddx 2\nnoop\nnoop\naddx 9\nnoop\nnoop\nnoop\naddx -1\naddx 2\naddx -37\naddx 1\naddx 3\nnoop\naddx 15\naddx -21\naddx 22\naddx -6\naddx 1\nnoop\naddx 2\naddx 1\nnoop\naddx -10\nnoop\nnoop\naddx 20\naddx 1\naddx 2\naddx 2\naddx -6\naddx -11\nnoop\nnoop\nnoop`,
    expected: {
      part1: 13140,
      part2: 0,
    },
  },
  {
    input: `addx 2\naddx 3\naddx 1\nnoop\naddx 4\nnoop\nnoop\nnoop\naddx 5\nnoop\naddx 1\naddx 4\naddx -2\naddx 3\naddx 5\naddx -1\naddx 5\naddx 3\naddx -2\naddx 4\nnoop\nnoop\nnoop\naddx -27\naddx -5\naddx 2\naddx -7\naddx 3\naddx 7\naddx 5\naddx 2\naddx 5\nnoop\nnoop\naddx -2\nnoop\naddx 3\naddx 2\naddx 5\naddx 2\naddx 3\nnoop\naddx 2\naddx -29\naddx 30\naddx -26\naddx -10\nnoop\naddx 5\nnoop\naddx 18\naddx -13\nnoop\nnoop\naddx 5\nnoop\nnoop\naddx 5\nnoop\nnoop\nnoop\naddx 1\naddx 2\naddx 7\nnoop\nnoop\naddx 3\nnoop\naddx 2\naddx 3\nnoop\naddx -37\nnoop\naddx 16\naddx -12\naddx 29\naddx -16\naddx -10\naddx 5\naddx 2\naddx -11\naddx 11\naddx 3\naddx 5\naddx 2\naddx 2\naddx -1\naddx 2\naddx 5\naddx 2\nnoop\nnoop\nnoop\naddx -37\nnoop\naddx 17\naddx -10\naddx -2\nnoop\naddx 7\naddx 3\nnoop\naddx 2\naddx -10\naddx 22\naddx -9\naddx 5\naddx 2\naddx -5\naddx 6\naddx 2\naddx 5\naddx 2\naddx -28\naddx -7\nnoop\nnoop\naddx 1\naddx 4\naddx 17\naddx -12\nnoop\nnoop\nnoop\nnoop\naddx 5\naddx 6\nnoop\naddx -1\naddx -17\naddx 18\nnoop\naddx 5\nnoop\nnoop\nnoop\naddx 5\naddx 4\naddx -2\nnoop\nnoop\nnoop\nnoop\nnoop`,
    expected: {
      part2: 0,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
