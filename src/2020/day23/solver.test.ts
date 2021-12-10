import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase<number>[] = [
  {
    input: `389125467`,
    extraParams: 10,
    expected: {
      part1: `92658374`,
    },
  },
  {
    input: `389125467`,
    expected: {
      part1: `67384529`,
      part2: 149245887792,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
