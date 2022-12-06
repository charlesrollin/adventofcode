import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
    expected: {
      part1: 7,
      part2: 19,
    },
  },
  {
    input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
    expected: {
      part1: 5,
      part2: 23,
    },
  },
  {
    input: `nppdvjthqldpwncqszvftbrmjlhg`,
    expected: {
      part1: 6,
      part2: 23,
    },
  },
  {
    input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
    expected: {
      part1: 10,
      part2: 29,
    },
  },
  {
    input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
    expected: {
      part1: 11,
      part2: 26,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
