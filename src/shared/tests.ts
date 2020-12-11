import { Solver } from '../solvers/Solver';

export interface TestCase<T = never> {
  input: string;
  extraParams?: T;
  expected: { part1?: number | string; part2?: number | string };
}

export const runCases = <T, U, V>(solver: Solver<T, U>, testCases: TestCase<V>[]) => {
  it('should pass part 1 examples', () => {
    testCases
      .filter(testCase => testCase.expected.part1 !== undefined)
      .forEach(testCase => {
        expect(solver.solveFirstPart(testCase.input, testCase.extraParams)).toEqual(
          testCase.expected.part1
        );
      });
  });
  it('should pass part 2 examples', () => {
    testCases
      .filter(testCase => testCase.expected.part2 !== undefined)
      .forEach(testCase => {
        expect(
          solver.solveSecondPart(testCase.input ?? testCase.input, testCase.extraParams)
        ).toEqual(testCase.expected.part2);
      });
  });
};
