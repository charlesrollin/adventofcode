import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const conversionTable: [number, string][] = [
  [1, '1'],
  [2, '2'],
  [3, '1='],
  [4, '1-'],
  [5, '10'],
  [6, '11'],
  [7, '12'],
  [8, '2='],
  [9, '2-'],
  [10, '20'],
  [15, '1=0'],
  [20, '1-0'],
  [2022, '1=11-2'],
  [12345, '1-0---0'],
  [314159265, '1121-1110-1=0'],
];

const testCases: TestCase<number>[] = [
  ...conversionTable.map(([_, snafu]) => ({
    input: snafu,
    expected: { part1: snafu },
  })),
  {
    input: `1=-0-2\n12111\n2=0=\n21\n2=01\n111\n20012\n112\n1=-1=\n1-12\n12\n1=\n122`,
    expected: {
      part1: '2=-1=0',
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
