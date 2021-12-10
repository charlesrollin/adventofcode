import { Solver } from 'src/shared/Solver';
import { CoverageMatrix, Line } from './CoverageMatrix';

class DaySolver extends Solver<Line[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(item => {
      const [start, end] = item.split(' -> ');
      const startCoords = start.split(',').map(item => parseInt(item, 10));
      const endCoords = end.split(',').map(item => parseInt(item, 10));
      return {
        start: { x: startCoords[0], y: startCoords[1] },
        end: { x: endCoords[0], y: endCoords[1] },
      };
    });
  };

  protected _solveFirstPart = (input: Line[]) => {
    const simpleLines = input.filter(
      line => line.start.x === line.end.x || line.start.y === line.end.y
    );
    const coverage = new CoverageMatrix();
    simpleLines.forEach(line => coverage.addLine(line));
    return coverage.getHighCoverageAmount();
  };

  protected _solveSecondPart = (input: Line[]) => {
    const coverage = new CoverageMatrix();
    input.forEach(line => coverage.addLine(line));
    return coverage.getHighCoverageAmount();
  };
}

export const solver = new DaySolver();
