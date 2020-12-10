async function solve() {
  const DAY = 10;
  const { solver } = await import(`./day${DAY}`);

  console.log(solver.solveFirstPart());
  console.log(solver.solveSecondPart());
}

solve();
