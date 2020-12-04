import * as fs from 'fs';

export const getInput = (day: number) =>
  fs.readFileSync(`${__dirname}/../__inputs__/${day}.txt`, 'utf8');
