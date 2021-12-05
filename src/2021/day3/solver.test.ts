import { runCases, TestCase } from './../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
    expected: {
      part1: 198,
      part2: 230,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
