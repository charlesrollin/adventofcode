export function getNeighboursCoords(
  input: number[][],
  [i, j]: [number, number],
  options?: { includeDiags: boolean }
): [number, number][] {
  const { includeDiags } = { includeDiags: false, ...options };
  const neighbours: [number, number][] = [];
  if (i !== 0) {
    neighbours.push([i - 1, j]);
    if (includeDiags && j !== 0) {
      neighbours.push([i - 1, j - 1]);
    }
  }
  if (j !== 0) {
    neighbours.push([i, j - 1]);
    if (includeDiags && i !== input.length - 1) {
      neighbours.push([i + 1, j - 1]);
    }
  }
  if (i !== input.length - 1) {
    neighbours.push([i + 1, j]);
    if (includeDiags && j !== input[0].length - 1) {
      neighbours.push([i + 1, j + 1]);
    }
  }
  if (j !== input[0].length - 1) {
    neighbours.push([i, j + 1]);
    if (includeDiags && i !== 0) {
      neighbours.push([i - 1, j + 1]);
    }
  }
  return neighbours;
}
