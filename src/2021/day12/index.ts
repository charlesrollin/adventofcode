import { Solver } from 'src/shared/Solver';

interface Cave {
  key: string;
  isSmall: boolean;
  neighbours: Cave[];
}

class DaySolver extends Solver<Map<string, Cave>, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const inputMap = new Map<string, Cave>();
    input.split(/\r?\n/).forEach(line => {
      const [cave1, cave2] = line.split('-');
      if (!inputMap.has(cave1)) {
        inputMap.set(cave1, { key: cave1, isSmall: cave1 === cave1.toLowerCase(), neighbours: [] });
      }
      if (!inputMap.has(cave2)) {
        inputMap.set(cave2, { key: cave2, isSmall: cave2 === cave2.toLowerCase(), neighbours: [] });
      }
      inputMap.get(cave1).neighbours.push(inputMap.get(cave2));
      inputMap.get(cave2).neighbours.push(inputMap.get(cave1));
    });
    return inputMap;
  };

  protected _solveFirstPart = (input: Map<string, Cave>) => {
    let paths = [['start']];
    let count = 0;
    while (paths.length > 0) {
      const nextPaths: string[][] = [];
      paths.forEach(path => {
        const nextCaves = input
          .get(path[path.length - 1])
          .neighbours.filter(cave => !cave.isSmall || !path.includes(cave.key));
        nextCaves.forEach(cave => {
          if (cave.key === 'end') {
            count += 1;
          } else {
            nextPaths.push([...path, cave.key]);
          }
        });
      });
      paths = nextPaths;
    }
    return count;
  };

  protected _solveSecondPart = (input: Map<string, Cave>) => {
    let paths = [{ caves: ['start'], hasDuplicateSmallCave: false }];
    let count = 0;
    while (paths.length > 0) {
      const nextPaths: typeof paths = [];
      paths.forEach(path => {
        const nextCaves = input
          .get(path.caves[path.caves.length - 1])
          .neighbours.map(neighbour => ({
            ...neighbour,
            wasVisited: path.caves.includes(neighbour.key),
          }))
          .filter(cave => {
            return !cave.isSmall || !cave.wasVisited || !path.hasDuplicateSmallCave;
          });
        nextCaves.forEach(cave => {
          if (cave.key === 'end') {
            count += 1;
          } else if (cave.key !== 'start') {
            nextPaths.push({
              caves: [...path.caves, cave.key],
              hasDuplicateSmallCave:
                path.hasDuplicateSmallCave || (cave.isSmall && cave.wasVisited),
            });
          }
        });
      });
      paths = nextPaths;
    }
    return count;
  };
}

export const solver = new DaySolver();
