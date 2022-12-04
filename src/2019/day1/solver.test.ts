import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `12`,
    expected: {
      part1: 2,
    },
  },
  {
    input: `14`,
    expected: {
      part1: 2,
      part2: 2,
    },
  },
  {
    input: `1969`,
    expected: {
      part1: 654,
      part2: 966,
    },
  },
  {
    input: `100756`,
    expected: {
      part1: 33583,
      part2: 50346,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
