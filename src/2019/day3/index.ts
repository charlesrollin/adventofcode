import { Solver } from 'src/shared/Solver';

type Segment = [[number, number], [number, number]];

interface Move {
  direction: string;
  length: number;
}

class DaySolver extends Solver<[Move[], Move[]], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(wire =>
      wire.split(',').map(wireSection => ({
        direction: wireSection[0],
        length: parseInt(wireSection.slice(1)),
      }))
    ) as [Move[], Move[]];
  };

  protected _solveFirstPart = (input: [Move[], Move[]]) => {
    let closestIntersection: [number, number] = [Infinity, Infinity];
    const wire1 = this.drawWire(input[0]);
    input[1].reduce(
      (acc, curr) => {
        const segment = this.drawSegment(acc, curr);
        const intersections = wire1
          .map(section => this.getIntersection(section.segment, segment))
          .filter(intersection => intersection !== null);
        intersections.forEach(intersection => {
          if (
            this.manhattanDistance(intersection, [0, 0]) <
            this.manhattanDistance(closestIntersection, [0, 0])
          ) {
            closestIntersection = intersection;
          }
        });
        return segment[1];
      },
      [0, 0] as [number, number]
    );
    return this.manhattanDistance(closestIntersection, [0, 0]);
  };

  protected _solveSecondPart = (input: [Move[], Move[]]) => {
    let bestScore = Infinity;
    const wire1 = this.drawWire(input[0]);
    input[1].reduce(
      (acc, curr) => {
        const { position, distance } = acc;
        const segment = this.drawSegment(position, curr);
        const intersections = wire1
          .map(section => ({
            intersection: this.getIntersection(section.segment, segment),
            section,
          }))
          .filter(item => item.intersection !== null);
        intersections.forEach(item => {
          const intersectionScore =
            item.section.distance -
            this.manhattanDistance(item.section.segment[1], item.intersection) +
            distance +
            this.manhattanDistance(segment[0], item.intersection);
          bestScore = Math.min(bestScore, intersectionScore);
        });
        return { position: segment[1], distance: distance + curr.length };
      },
      { position: [0, 0], distance: 0 } as { position: [number, number]; distance: number }
    );
    return bestScore;
  };

  private drawWire = (moves: Move[]) => {
    const [firstMove, ...rest] = moves;
    return rest.reduce(
      (acc, curr) => {
        const { segment, distance } = acc[acc.length - 1];
        acc.push({ segment: this.drawSegment(segment[1], curr), distance: distance + curr.length });
        return acc;
      },
      [{ segment: this.drawSegment([0, 0], firstMove), distance: firstMove.length }]
    );
  };

  private drawSegment = (position: [number, number], move: Move): Segment => {
    const copy: [number, number] = [...position];
    copy[0] += (move.direction === 'L' ? -1 : move.direction === 'R' ? 1 : 0) * move.length;
    copy[1] += (move.direction === 'D' ? -1 : move.direction === 'U' ? 1 : 0) * move.length;
    return [position, copy];
  };

  private getIntersection = (segment1: Segment, segment2: Segment): [number, number] => {
    const xIntersection =
      Math.min(segment2[0][0], segment2[1][0]) <= segment1[0][0] &&
      segment1[0][0] <= Math.max(segment2[0][0], segment2[1][0])
        ? segment1[0][0]
        : Math.min(segment1[0][0], segment1[1][0]) <= segment2[0][0] &&
          segment2[0][0] <= Math.max(segment1[0][0], segment1[1][0])
        ? segment2[0][0]
        : null;
    const yIntersection =
      Math.min(segment2[0][1], segment2[1][1]) <= segment1[0][1] &&
      segment1[0][1] <= Math.max(segment2[0][1], segment2[1][1])
        ? segment1[0][1]
        : Math.min(segment1[0][1], segment1[1][1]) <= segment2[0][1] &&
          segment2[0][1] <= Math.max(segment1[0][1], segment1[1][1])
        ? segment2[0][1]
        : null;
    return xIntersection !== null &&
      yIntersection !== null &&
      Math.abs(xIntersection) + Math.abs(yIntersection) !== 0
      ? [xIntersection, yIntersection]
      : null;
  };

  private manhattanDistance = (a: [number, number], b: [number, number]) =>
    Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export const solver = new DaySolver();
