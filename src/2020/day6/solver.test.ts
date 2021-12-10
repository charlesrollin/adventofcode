import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `abc

    a
    b
    c
    
    ab
    ac
    
    a
    a
    a
    a
    
    b`.replace(/  +/g, ''),
    expected: {
      part1: 11,
      part2: 6,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
