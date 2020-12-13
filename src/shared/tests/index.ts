import { Solver } from './../../shared/Solver';

export interface TestCase<T = never> {
  title?: string;
  input: string;
  extraParams?: T;
  expected: { part1?: number | string | bigint; part2?: number | string | bigint };
}

export const runCases = <T, U, V>(solver: Solver<T, U>, testCases: TestCase<V>[]) => {
  describe('Part 1', () => {
    testCases.forEach((testCase, idx) => {
      if (testCase.expected.part1) {
        it(`should pass ${testCase.title ? `${testCase.title}` : `#${idx + 1}`}`, () => {
          expect(solver.solveFirstPart(testCase.input, testCase.extraParams)).toEqual(
            testCase.expected.part1
          );
        });
      }
    });
  });
  describe('Part 2', () => {
    testCases.forEach((testCase, idx) => {
      if (testCase.expected.part2) {
        it(`should pass ${testCase.title ? `${testCase.title}` : `#${idx + 1}`}`, () => {
          expect(solver.solveSecondPart(testCase.input, testCase.extraParams)).toEqual(
            testCase.expected.part2
          );
        });
      }
    });
  });
};
