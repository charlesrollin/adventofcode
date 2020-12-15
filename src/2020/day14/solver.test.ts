import { runCases, TestCase } from '../../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`.replace(/  /g, ''),
    expected: {
      part1: 165n,
    },
  },
  {
    title: '35th bit mask',
    input: `mask = 1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0
    mem[8] = 11`.replace(/  /g, ''),
    expected: {
      part1: BigInt(2 ** 35 + 10),
    },
  },
  {
    input: `mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1`.replace(/  /g, ''),
    expected: {
      part2: 208n,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
