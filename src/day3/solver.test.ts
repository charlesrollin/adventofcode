import { runCases, TestCase } from '../shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`.replace(/  +/g, ''),
    expected: {
      part1: 7,
      part2: 336,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
