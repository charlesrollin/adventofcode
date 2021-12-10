import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `Player 1:
    9
    2
    6
    3
    1

    Player 2:
    5
    8
    4
    7
    10`.replace(/  /g, ''),
    expected: {
      part1: 306,
      part2: 291,
    },
  },
  {
    input: `Player 1:
    5
    8
    4
    7
    10

    Player 2:
    9
    2
    6
    3
    1`.replace(/  /g, ''),
    expected: {
      part1: 306,
      part2: 291,
    },
  },
  {
    title: 'small looping game',
    input: `Player 1:
    43
    19

    Player 2:
    2
    29
    14`.replace(/  /g, ''),
    expected: {
      part2: 105,
    },
  },
];
describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
