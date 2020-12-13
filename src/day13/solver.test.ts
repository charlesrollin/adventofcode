import { runCases, TestCase } from '../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    title: '2 consecutive numbers',
    input: `939
      10,11`.replace(/  /g, ''),
    expected: {
      part2: 10n,
    },
  },
  {
    title: '2 consecutive numbers with a blank',
    input: `939
      10,x,11`.replace(/  /g, ''),
    expected: {
      part2: 20n,
    },
  },
  {
    title: '2 consecutive primes with the correct offset',
    input: `939
      11,x,13`.replace(/  /g, ''),
    expected: {
      part2: 11n,
    },
  },
  {
    title: '2 consecutive numbers and the next prime with the correct offset',
    input: `939
      10,11,x,13`.replace(/  /g, ''),
    expected: {
      part2: 10n,
    },
  },
  {
    input: `939
      17,x,13,19`.replace(/  /g, ''),
    expected: {
      part2: 3417n,
    },
  },
  {
    input: `939
      67,7,59,61`.replace(/  /g, ''),
    expected: {
      part2: 754018n,
    },
  },
  {
    input: `939
      67,x,7,59,61`.replace(/  /g, ''),
    expected: {
      part2: 779210n,
    },
  },
  {
    input: `939
      67,7,x,59,61`.replace(/  /g, ''),
    expected: {
      part2: 1261476n,
    },
  },
  {
    input: `939
      1789,37,47,1889`.replace(/  /g, ''),
    expected: {
      part2: 1202161486n,
    },
  },
  {
    input: `939
    7,13,x,x,59,x,31,19`.replace(/  /g, ''),
    expected: {
      part1: 295n,
      part2: 1068781n,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
