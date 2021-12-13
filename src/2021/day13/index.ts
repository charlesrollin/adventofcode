import { Solver } from 'src/shared/Solver';

class Instructions {
  dots: { x: number; y: number }[];
  foldingInstructions: { direction: 'x' | 'y'; number: number }[];
}

class DaySolver extends Solver<Instructions, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [rawDots, rawInstructions] = input.split(/\r?\n\r?\n/);
    return {
      dots: rawDots
        .split(/\r?\n/)
        .map(line => line.split(','))
        .map(([x, y]) => ({ x: parseInt(x, 10), y: parseInt(y, 10) })),
      foldingInstructions: rawInstructions.split(/\r?\n/).map(rawInstruction => {
        const matches = rawInstruction.match(/fold along (.)=(.*)/);
        return { direction: matches[1] as 'x' | 'y', number: parseInt(matches[2], 10) };
      }),
    };
  };

  private fold(
    dotsMap: Map<string, { x: number; y: number }>,
    { direction, number }: Instructions['foldingInstructions'][0]
  ) {
    const resultMap = new Map<string, { x: number; y: number }>();
    for (let [key, dot] of dotsMap.entries()) {
      if (dot[direction] > number) {
        const newDot = { ...dot, [direction]: number - (dot[direction] - number) };
        resultMap.set(`${newDot.x},${newDot.y}`, newDot);
      } else {
        resultMap.set(key, dot);
      }
    }
    return resultMap;
  }

  protected _solveFirstPart = (input: Instructions) => {
    const dotsMap = new Map<string, { x: number; y: number }>();
    input.dots.forEach(dot => {
      dotsMap.set(`${dot.x},${dot.y}`, dot);
    });
    return this.fold(dotsMap, input.foldingInstructions[0]).size;
  };

  protected _solveSecondPart = (input: Instructions) => {
    const dotsMap = new Map<string, { x: number; y: number }>();
    input.dots.forEach(dot => {
      dotsMap.set(`${dot.x},${dot.y}`, dot);
    });
    const result = input.foldingInstructions.reduce((resultMap, instruction) => {
      return this.fold(resultMap, instruction);
    }, dotsMap);
    let str = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 47; j++) {
        str += result.has(`${j},${i}`) ? '#' : '.';
      }
      str += '\n';
    }
    console.log(str);
    return result.size;
  };
}

export const solver = new DaySolver();
