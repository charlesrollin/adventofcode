import { runCases, TestCase } from '../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `F10
    N3
    F7
    R90
    F11`.replace(/  /g, ''),
    expected: {
      part1: 25,
      part2: 286,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
