import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  // {
  //   input: `11111\n19991\n19191\n19991\n11111`,
  //   expected: {
  //     part1: 1656,
  //     part2: 0,
  //   },
  // },
  {
    input: `5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526`,
    expected: {
      part1: 1656,
      part2: 195,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
