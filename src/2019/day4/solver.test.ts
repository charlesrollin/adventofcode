import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `111111-111111`,
    expected: {
      part1: 1,
      part2: 0,
    },
  },
  {
    input: `223450-223450`,
    expected: {
      part1: 0,
      part2: 0,
    },
  },
  {
    input: `123789-123789`,
    expected: {
      part1: 0,
      part2: 0,
    },
  },
  {
    input: `112233-112233`,
    expected: {
      part1: 1,
      part2: 1,
    },
  },
  {
    input: `123444-123444`,
    expected: {
      part1: 1,
      part2: 0,
    },
  },
  {
    input: `111122-111122`,
    expected: {
      part1: 1,
      part2: 1,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
