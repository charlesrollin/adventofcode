import { runCases, TestCase } from 'src/shared/tests';
import { solver } from '.';

const testCases: TestCase[] = [
  {
    input: `start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end`,
    expected: {
      part1: 10,
      part2: 36,
    },
  },
  // {
  //   input: `dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc`,
  //   expected: {
  //     part1: 19,
  //     part2: 103,
  //   },
  // },
  // {
  //   input: `fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW`,
  //   expected: {
  //     part1: 226,
  //     part2: 3509,
  //   },
  // },
];

describe(solver.dirName.split('/').pop(), () => {
  runCases(solver, testCases);
});
