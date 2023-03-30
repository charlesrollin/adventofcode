import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `R8,U5,L5,D3\nU7,R6,D4,L4`,
    expected: {
      part1: 6,
      part2: 30,
    },
  },
  {
    input: `R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83`,
    expected: {
      part1: 159,
      part2: 610,
    },
  },
  {
    input: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,
    expected: {
      part1: 135,
      part2: 410,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
