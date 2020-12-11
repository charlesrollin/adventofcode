import { runCases, TestCase } from '../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `FBFBBFFRLR
    BFFFBBFRRR
    FFFBBBFRRR
    BBFFBBFRLL`.replace(/  +/g, ''),
    expected: {
      part1: 820,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
