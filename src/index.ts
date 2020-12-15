import * as fs from 'fs';

const args = process.argv.slice(2);

async function solve() {
  let DAY = parseInt(args[0], 10);
  if (isNaN(DAY)) {
    const days = fs
      .readdirSync(`${__dirname}/2020`)
      .map(name => name.match(/^day(\d*)$/))
      .filter(match => match !== null)
      .map(match => parseInt(match[1], 10));
    DAY = Math.max(...days);
  }
  const { solver } = await import(`./2020/day${DAY}`);

  console.log(solver.solveFirstPart());
  console.log(solver.solveSecondPart());
}

solve();
