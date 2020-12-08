import * as fs from 'fs';

export const getInput = (dirName: string) => fs.readFileSync(`${dirName}/input.txt`, 'utf8');
