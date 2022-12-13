import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `Sabqponm\nabcryxxl\naccszExk\nacctuvwj\nabdefghi`,
    expected: {
      part1: 31,
      part2: 29,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
