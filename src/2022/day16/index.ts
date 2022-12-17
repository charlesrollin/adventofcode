import { Solver } from 'src/shared/Solver';

interface Valve {
  name: string;
  flowRate: number;
  neighbors: string[];
}

class DaySolver extends Solver<Valve[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n').map(line => {
      const [_, name, flowRate, rawNeighbors] = line.match(
        /Valve (.*) has flow rate=(.*); tunnel(?:s?) lead(?:s?) to valve(?:s?) (.*)/
      );
      return { name, flowRate: parseInt(flowRate), neighbors: rawNeighbors.split(', ') };
    });
    return lines;
  };

  protected _solveFirstPart = (input: Valve[]) => {
    input.sort((valve1, valve2) => valve1.name.localeCompare(valve2.name));
    const nameMapping: Record<string, number> = {};
    input.forEach((valve, idx) => {
      nameMapping[valve.name] = idx;
    });
    this.printDistanceMatrix(this.buildDistanceMatrix(input, nameMapping), nameMapping);
    return 0;
  };

  protected _solveSecondPart = (input: Valve[]) => {
    return 0;
  };

  private buildDistanceMatrix = (input: Valve[], nameMapping: Record<string, number>) => {
    const distanceMatrix: number[][] = new Array(input.length)
      .fill(undefined)
      .map(_ => new Array(input.length).fill(undefined));
    for (let idx = 0; idx < input.length; idx++) {
      distanceMatrix[idx][idx] = 0;
    }
    [input[0]].forEach(valve => {
      console.log(valve);
      valve.neighbors.forEach(neighbor => {
        distanceMatrix[nameMapping[valve.name]][nameMapping[neighbor]] = 1;
        distanceMatrix[nameMapping[neighbor]][nameMapping[valve.name]] = 1;
        this.printDistanceMatrix(distanceMatrix, nameMapping);
        distanceMatrix[nameMapping[neighbor]]
          .filter(value => value !== undefined)
          .forEach((distance, idx) => {
            console.log(
              neighbor,
              Object.entries(nameMapping).filter(([_, value]) => value === idx)[0][0],
              distance
            );
            distanceMatrix[nameMapping[valve.name]][idx] = Math.min(
              distance + 1,
              distanceMatrix[nameMapping[valve.name]][idx] ?? Infinity
            );
            distanceMatrix[idx][nameMapping[valve.name]] = Math.min(
              distance + 1,
              distanceMatrix[nameMapping[valve.name]][idx] ?? Infinity
            );
            this.printDistanceMatrix(distanceMatrix, nameMapping);
          });
      });
    });
    return distanceMatrix;
  };

  private printDistanceMatrix = (
    distanceMatrix: number[][],
    nameMapping: Record<string, number>
  ) => {
    console.log(
      distanceMatrix
        .map((line, idx) =>
          line
            .filter(distance => distance !== undefined)
            .map(
              (distance, idx2) =>
                `Distance from ${
                  Object.entries(nameMapping).filter(([_, value]) => value === idx)[0][0]
                } to ${
                  Object.entries(nameMapping).filter(([_, value]) => value === idx2)[0][0]
                }: ${distance}`
            )
            .join('\n')
        )
        .join('\n')
    );
  };
}

export const solver = new DaySolver();
