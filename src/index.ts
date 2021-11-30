import * as fs from 'fs';

const args = process.argv.slice(2);

async function solve() {
  let YEAR: number;
  let DAY: number;
  if (args.length > 1) {
    YEAR = parseInt(args[0], 10);
    DAY = parseInt(args[1], 10)
  } else {
    DAY = parseInt(args[0], 10);
  }
  if (isNaN(YEAR)) {
    const years = fs
      .readdirSync(`${__dirname}`)
      .map(name => name.match(/^(\d*)$/))
      .filter(match => match !== null)
      .map(match => parseInt(match[1], 10));
      YEAR = Math.max(...years);
  }
  if (isNaN(DAY)) {
    const days = fs
      .readdirSync(`${__dirname}/${YEAR}`)
      .map(name => name.match(/^day(\d*)$/))
      .filter(match => match !== null)
      .map(match => parseInt(match[1], 10));
    DAY = Math.max(...days);
  }
  const { solver } = await import(`./${YEAR}/day${DAY}`);

  console.log(solver.solveFirstPart());
  console.log(solver.solveSecondPart());
}

solve();
