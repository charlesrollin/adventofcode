import { runCases, TestCase } from './../../shared/tests';
import { solver } from '.';

const testCases: TestCase<Parameters<typeof solver['_solveFirstPart']>[1]>[] = [
  {
    input: `1721
    979
    366
    299
    675
    1456`,
    expected: {
      part1: 514579,
      part2: 241861950,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
