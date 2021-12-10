import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `0,3,6`,
    expected: {
      part1: 436,
    },
  },
  {
    input: `1,3,2`,
    expected: {
      part1: 1,
    },
  },
  {
    input: `2,1,3`,
    expected: {
      part1: 10,
    },
  },
  {
    input: `1,2,3`,
    expected: {
      part1: 27,
    },
  },
  {
    input: `2,3,1`,
    expected: {
      part1: 78,
    },
  },
  {
    input: `3,2,1`,
    expected: {
      part1: 438,
    },
  },
  {
    input: `3,1,2`,
    expected: {
      part1: 1836,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
