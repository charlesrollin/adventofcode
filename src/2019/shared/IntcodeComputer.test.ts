import { IntcodeComputer, State } from './IntcodeComputer';

type TestCase = [string, State, (state: State) => number, number];

describe('IntcodeComputer', () => {
  it.each([
    [
      '2019 day 2 part 1 first example',
      { program: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50] },
      state => state.program[0],
      3500,
    ],
    ['simple addition', { program: [1, 0, 0, 0, 99] }, state => state.program[0], 2],
    ['simple multiplication', { program: [2, 3, 0, 3, 99] }, state => state.program[0], 2],
    ['simple multiplication #2', { program: [2, 4, 4, 5, 99, 0] }, state => state.program[0], 2],
    [
      '2019 day 2 part 1 last example',
      { program: [1, 1, 1, 4, 99, 5, 6, 0, 99] },
      state => state.program[0],
      30,
    ],
    ['simple input', { program: [3, 0, 4, 0, 99], input: 42 }, state => state.outputs[0], 42],
    [
      'multiplication with param modes',
      { program: [1002, 4, 3, 4, 33] },
      state => state.program[state.program.length - 1],
      99,
    ],
    [
      'equals to 8 using position mode',
      { program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], input: 8 },
      state => state.outputs[0],
      1,
    ],
    [
      'equals to 8 using position mode',
      { program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], input: 12 },
      state => state.outputs[0],
      0,
    ],
    [
      'less than 8 using position mode',
      { program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], input: 10 },
      state => state.outputs[0],
      0,
    ],
    [
      'less than 8 using position mode',
      { program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], input: 7 },
      state => state.outputs[0],
      1,
    ],
    [
      'equals to 8 using immediate mode',
      { program: [3, 3, 1108, -1, 8, 3, 4, 3, 99], input: 8 },
      state => state.outputs[0],
      1,
    ],
    [
      'equals to 8 using immediate mode',
      { program: [3, 3, 1108, -1, 8, 3, 4, 3, 99], input: 12 },
      state => state.outputs[0],
      0,
    ],
    [
      'less than 8 using immediate mode',
      { program: [3, 3, 1107, -1, 8, 3, 4, 3, 99], input: 8 },
      state => state.outputs[0],
      0,
    ],
    [
      'less than 8 using immediate mode',
      { program: [3, 3, 1107, -1, 8, 3, 4, 3, 99], input: 7 },
      state => state.outputs[0],
      1,
    ],
    [
      'jump test using position mode',
      { program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], input: 0 },
      state => state.outputs[0],
      0,
    ],
    [
      'jump test using position mode',
      { program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], input: 42 },
      state => state.outputs[0],
      1,
    ],
    [
      'jump test using immediate mode',
      { program: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], input: 0 },
      state => state.outputs[0],
      0,
    ],
    [
      'jump test using immediate mode',
      { program: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], input: 42 },
      state => state.outputs[0],
      1,
    ],
    [
      '2019 day 2 part 2 last example',
      {
        program: [
          3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0,
          1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20,
          1105, 1, 46, 98, 99,
        ],
        input: 7,
      },
      state => state.outputs[0],
      999,
    ],
    [
      '2019 day 2 part 2 last example',
      {
        program: [
          3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0,
          1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20,
          1105, 1, 46, 98, 99,
        ],
        input: 8,
      },
      state => state.outputs[0],
      1000,
    ],
    [
      '2019 day 2 part 2 last example',
      {
        program: [
          3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0,
          1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20,
          1105, 1, 46, 98, 99,
        ],
        input: 9,
      },
      state => state.outputs[0],
      1001,
    ],
  ] as TestCase[])('%s', (_title, { program, input }, stateMatcher, expected) => {
    const computer = new IntcodeComputer();
    const finalState = computer.run({ program, input });
    expect(stateMatcher(finalState)).toEqual(expected);
  });
});
