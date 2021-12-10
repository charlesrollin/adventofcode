export function median(input: number[]) {
  const sorted = [...input].sort((a, b) => a - b);
  const middleIdx = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return sorted[middleIdx - 1];
  }
  return sorted[middleIdx];
}
