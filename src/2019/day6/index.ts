import { Solver } from 'src/shared/Solver';
import { intersection, union } from 'src/shared/sets';

interface BodyInfo {
  direct: Set<string>;
  parent?: string;
  indirectCount: number;
}

class DaySolver extends Solver<{ body: string; satellite: string }[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(item => {
      const [body, satellite] = item.split(')');
      return { body, satellite };
    });
  };

  protected _solveFirstPart = (input: { body: string; satellite: string }[]) => {
    const bodiesTree = this.buildBodiesTree(input);
    let nextBodies: string[] = ['COM'];
    let depth = 0;
    let totalOrbits = 0;
    while (nextBodies.length > 0) {
      depth += 1;
      const futureNextBodies = [];
      nextBodies.forEach(body => {
        const directSatellites = [...bodiesTree[body].direct];
        totalOrbits += depth * directSatellites.length;
        futureNextBodies.push(...directSatellites.filter(key => bodiesTree[key].direct.size !== 0));
      });
      nextBodies = futureNextBodies;
    }
    return totalOrbits;
  };

  protected _solveSecondPart = (input: { body: string; satellite: string }[]) => {
    const bodiesTree = this.buildBodiesTree(input);
    const itineraryFromYou: string[] = ['YOU'];
    const itineraryFromSan: string[] = ['SAN'];
    let itineraryIntersection: Set<string> = new Set();
    while (itineraryIntersection.size === 0) {
      const youNextJump = bodiesTree[itineraryFromYou[itineraryFromYou.length - 1]].parent;
      const sanNextJump = bodiesTree[itineraryFromSan[itineraryFromSan.length - 1]].parent;
      if (youNextJump !== undefined) {
        itineraryFromYou.push(youNextJump);
      }
      if (sanNextJump !== undefined) {
        itineraryFromSan.push(sanNextJump);
      }
      itineraryIntersection = intersection(new Set(itineraryFromYou), new Set(itineraryFromSan));
    }
    const closestCommonAncestor = [...itineraryIntersection][0];
    return (
      itineraryFromYou.indexOf(closestCommonAncestor) -
      1 +
      itineraryFromSan.indexOf(closestCommonAncestor) -
      1
    );
  };

  private buildBodiesTree = (input: { body: string; satellite: string }[]) => {
    return input.reduce((acc, curr) => {
      const { body, satellite } = curr;
      if (!acc[body]) {
        acc[body] = { direct: new Set(), indirectCount: 0 };
      }
      if (!acc[satellite]) {
        acc[satellite] = { direct: new Set(), indirectCount: 0 };
      }
      acc[body].direct.add(satellite);
      acc[satellite].parent = body;
      return acc;
    }, {} as Record<string, BodyInfo>);
  };
}

export const solver = new DaySolver();
