import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `1,9,10,3,2,3,11,0,99,30,40,50`,
    expected: {
      part1: 3500,
    },
  },
  {
    input: `1,0,0,0,99`,
    expected: {
      part1: 2,
    },
  },
  {
    input: `2,3,0,3,99`,
    expected: {
      part1: 2,
    },
  },
  {
    input: `2,4,4,5,99,0`,
    expected: {
      part1: 2,
    },
  },
  {
    input: `1,1,1,4,99,5,6,0,99`,
    expected: {
      part1: 30,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
