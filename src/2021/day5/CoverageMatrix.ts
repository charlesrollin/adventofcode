export interface Line {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export class CoverageMatrix {
  private matrix = new Map<string, number>();

  public addLine(line: Line) {
    const minX = Math.min(line.start.x, line.end.x);
    const maxX = Math.max(line.start.x, line.end.x);
    const minY = Math.min(line.start.y, line.end.y);
    const maxY = Math.max(line.start.y, line.end.y);
    const xDelta = line.start.x < line.end.x ? 1 : line.start.x > line.end.x ? -1 : 0;
    const yDelta = line.start.y < line.end.y ? 1 : line.start.y > line.end.y ? -1 : 0;
    let currentPoint = line.start;
    while (
      minX <= currentPoint.x &&
      currentPoint.x <= maxX &&
      minY <= currentPoint.y &&
      currentPoint.y <= maxY
    ) {
      this.matrix.set(
        `${currentPoint.x},${currentPoint.y}`,
        (this.matrix.get(`${currentPoint.x},${currentPoint.y}`) ?? 0) + 1
      );
      currentPoint = { x: currentPoint.x + xDelta, y: currentPoint.y + yDelta };
    }
  }

  public getHighCoverageAmount() {
    return Array.from(this.matrix.values()).filter(value => value > 1).length;
  }
}
