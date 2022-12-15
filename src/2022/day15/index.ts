import { Solver } from 'src/shared/Solver';

type Coords = [number, number];

class DaySolver extends Solver<{ sensors: Coords[]; beacons: Coords[] }, number, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const sensors: Coords[] = [];
    const beacons: Coords[] = [];
    const lines = input.split('\n').forEach(line => {
      const [_, sensorX, sensorY, beaconX, beaconY] = line.match(
        /Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)/
      );
      sensors.push([parseInt(sensorX), parseInt(sensorY)]);
      beacons.push([parseInt(beaconX), parseInt(beaconY)]);
    });
    return { sensors, beacons };
  };

  protected _solveFirstPart = (
    { sensors, beacons }: { sensors: Coords[]; beacons: Coords[] },
    line: number = 2000000
  ) => {
    const intervals = this.computeIntervalsForLine(sensors, beacons, line);
    return intervals.reduce((acc, curr) => acc + curr[1] - curr[0], 0);
  };

  protected _solveSecondPart = (
    { sensors, beacons }: { sensors: Coords[]; beacons: Coords[] },
    maxCoord: number = 4000000
  ) => {
    for (let line = 0; line <= maxCoord; line++) {
      const intervals = this.computeIntervalsForLine(sensors, beacons, line);
      for (let idx = 0; idx < intervals.length; idx++) {
        const interval = intervals[idx];
        if (interval[0] <= 0 && interval[1] >= maxCoord) {
          idx = intervals.length;
        } else {
          if (interval[0] <= 0 && interval[1] >= 0) {
            return (interval[1] + 1) * 4000000 + line;
          }
        }
      }
    }
  };

  private manhattanDistance = ([x1, y1]: Coords, [x2, y2]: Coords) =>
    Math.abs(x2 - x1) + Math.abs(y2 - y1);

  private computeIntervalsForLine = (sensors: Coords[], beacons: Coords[], line: number) => {
    const intervals: Coords[] = [];
    for (let idx = 0; idx < sensors.length; idx++) {
      const sensor = sensors[idx];
      const beacon = beacons[idx];
      const distance = this.manhattanDistance(sensor, beacon);
      const distanceFromLine = Math.abs(sensor[1] - line);
      if (distanceFromLine < distance) {
        const diff = distance - distanceFromLine;
        intervals.push([sensor[0] - diff, sensor[0] + diff]);
      }
      intervals.sort((a, b) => a[0] - b[0]);
      let cursor = 0;
      while (cursor < intervals.length - 1) {
        if (intervals[cursor][1] + 1 >= intervals[cursor + 1][0]) {
          intervals[cursor][1] = Math.max(intervals[cursor][1], intervals[cursor + 1][1]);
          intervals.splice(cursor + 1, 1);
        } else {
          cursor += 1;
        }
      }
    }
    return intervals;
  };
}

export const solver = new DaySolver();
