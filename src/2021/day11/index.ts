import { getNeighboursCoords } from 'src/shared/matrix';
import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\r?\n/).map(line =>
      line.split('').map(item => {
        return parseInt(item, 10);
      })
    );
  };

  private processInitialStep(input: number[][]) {
    const flashingOctopuses: [number, number][] = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        input[i][j] += 1;
        if (input[i][j] === 10) {
          flashingOctopuses.push([i, j]);
        }
      }
    }
    return { flashingOctopuses };
  }

  private resetOctopuses(input: number[][]) {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] > 9) {
          input[i][j] = 0;
        }
      }
    }
  }

  private runStep(input: number[][]) {
    let count = 0;
    let { flashingOctopuses } = this.processInitialStep(input);
    while (flashingOctopuses.length > 0) {
      count += 1;
      const currentOctopus = flashingOctopuses.pop();
      const neighbours = getNeighboursCoords(input, currentOctopus, { includeDiags: true });
      neighbours.forEach(neighbour => {
        input[neighbour[0]][neighbour[1]] += 1;
        if (input[neighbour[0]][neighbour[1]] === 10) {
          flashingOctopuses.push(neighbour);
        }
      });
    }
    this.resetOctopuses(input);
    return count;
  }

  protected _solveFirstPart = (input: number[][]) => {
    let data = [...input];
    let count = 0;
    for (let step = 0; step < 100; step++) {
      count += this.runStep(data);
    }
    return count;
  };

  protected _solveSecondPart = (input: number[][]) => {
    let data = [...input];
    let step = 0;
    while (!data.every(line => line.every(item => item === 0))) {
      this.runStep(data);
      step += 1;
    }
    return step;
  };
}

export const solver = new DaySolver();
