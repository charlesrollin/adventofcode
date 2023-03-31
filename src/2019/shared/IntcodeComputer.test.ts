import { IntcodeComputer, State } from './IntcodeComputer';

type TestCase = [State, (state: State) => number, number];

describe('IntcodeComputer', () => {
  it.each([
    [{ program: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50] }, state => state.program[0], 3500],
    [{ program: [1, 0, 0, 0, 99] }, state => state.program[0], 2],
    [{ program: [2, 3, 0, 3, 99] }, state => state.program[0], 2],
    [{ program: [2, 4, 4, 5, 99, 0] }, state => state.program[0], 2],
    [{ program: [1, 1, 1, 4, 99, 5, 6, 0, 99] }, state => state.program[0], 30],
    [{ program: [3, 0, 4, 0, 99], input: 42 }, state => state.outputs[0], 42],
  ] as TestCase[])('should work', ({ program, input }, stateMatcher, expected) => {
    const computer = new IntcodeComputer();
    const finalState = computer.run({ program, input });
    expect(stateMatcher(finalState)).toEqual(expected);
  });
});
