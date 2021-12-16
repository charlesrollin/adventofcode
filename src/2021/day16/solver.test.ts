import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `D2FE28`,
    expected: {
      part1: 6,
      part2: 2021,
    },
  },
  {
    input: `38006F45291200`,
    expected: {
      part1: 9,
    },
  },
  {
    input: `EE00D40C823060`,
    expected: {
      part1: 14,
    },
  },
  {
    input: `8A004A801A8002F478`,
    expected: {
      part1: 16,
    },
  },
  {
    input: `620080001611562C8802118E34`,
    expected: {
      part1: 12,
    },
  },
  {
    input: `C0015000016115A2E0802F182340`,
    expected: {
      part1: 23,
    },
  },
  {
    input: `A0016C880162017C3686B18A3D4780`,
    expected: {
      part1: 31,
    },
  },
  {
    input: `C200B40A82`,
    expected: {
      part2: 3,
    },
  },
  {
    input: `04005AC33890`,
    expected: {
      part2: 54,
    },
  },
  {
    input: `880086C3E88112`,
    expected: {
      part2: 7,
    },
  },
  {
    input: `CE00C43D881120`,
    expected: {
      part2: 9,
    },
  },
  {
    input: `D8005AC2A8F0`,
    expected: {
      part2: 1,
    },
  },
  {
    input: `F600BC2D8F`,
    expected: {
      part2: 0,
    },
  },
  {
    input: `9C005AC2F8F0`,
    expected: {
      part2: 0,
    },
  },
  {
    input: `9C0141080250320F1802104A08`,
    expected: {
      part2: 1,
    },
  },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
