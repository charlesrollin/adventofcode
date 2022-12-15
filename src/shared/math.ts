import { Coords } from './types';

export function median(input: number[]) {
  const sorted = [...input].sort((a, b) => a - b);
  const middleIdx = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return sorted[middleIdx - 1];
  }
  return sorted[middleIdx];
}

export function manhattanDistance([x1, y1]: Coords, [x2, y2]: Coords) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
