import { runCases, TestCase } from '../shared/tests';
import { solver } from '.';

const testCases: TestCase<Parameters<typeof solver['_solveFirstPart']>[1]>[] = [
  {
    input: `35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576`,
    extraParams: 5,
    expected: {
      part1: 127,
      part2: 62,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
