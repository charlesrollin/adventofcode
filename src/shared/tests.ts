import { Solver } from '../solvers/Solver';

export interface TestCase<T> {
  input: string;
  extraParams?: T;
  expected: { part1: number | string; part2: number | string };
}

export const runCases = <T, U, V>(solver: Solver<T, U>, testCases: TestCase<V>[]) => {
  it('should pass part 1', () => {
    testCases.forEach(testCase => {
      expect(solver.solveFirstPart(testCase.input, testCase.extraParams)).toEqual(
        testCase.expected.part1
      );
    });
  });
  it('should pass part 2', () => {
    testCases.forEach(testCase => {
      expect(solver.solveSecondPart(testCase.input, testCase.extraParams)).toEqual(
        testCase.expected.part2
      );
    });
  });
};
