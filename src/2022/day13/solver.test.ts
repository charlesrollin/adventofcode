import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `[1,1,3,1,1]\n[1,1,5,1,1]\n\n[[1],[2,3,4]]\n[[1],4]\n\n[9]\n[[8,7,6]]\n\n[[4,4],4,4]\n[[4,4],4,4,4]\n\n[7,7,7,7]\n[7,7,7]\n\n[]\n[3]\n\n[[[]]]\n[[]]\n\n[1,[2,[3,[4,[5,6,7]]]],8,9]\n[1,[2,[3,[4,[5,6,0]]]],8,9]`,
    expected: {
      part1: 13,
      part2: 140,
    },
  },
  {
    input: `[]\n[]`,
    expected: {
      part1: 1,
    },
  },
  {
    input: `[1]\n[[]]`,
    expected: {
      part1: 0,
    },
  },
  {
    input: `[[]]\n[1]`,
    expected: {
      part1: 1,
    },
  },
  {
    input: `[6]\n[8,7,6]`,
    expected: {
      part1: 1,
    },
  },
  {
    input: `[[[], []], [[[10,4,6]],[[2], 4, [1,1,3]], [7,9,[3,3,10,5]]]]\n[[0,6,0,[10,6],10], [7,10]]`,
    expected: {
      part1: 1,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
