async function solve() {
  const DAY = 9;
  const { solver } = await import(`./day${DAY}`);

  console.log(solver.solveFirstPart());
  console.log(solver.solveSecondPart());
}

solve();
