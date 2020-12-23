import { Solver } from '../../shared/Solver';

interface Input {
  id: number;
  borders: number[];
}

class DaySolver extends Solver<Input[], number> {
  constructor() {
    super(__dirname);
  }

  private lineToInt(input: string) {
    const inputs = [input, input.split('').reverse().join('')];
    return inputs.map(item => parseInt(item.replace(/\./g, '0').replace(/#/g, '1'), 2));
  }

  protected parseInput = (input: string) => {
    return input.split('\n\n').map(camera => {
      const [rawId, ...tile] = camera.split('\n');
      const id = parseInt(rawId.match(/Tile (\d*):/)[1]);
      let leftBorder = '';
      let rightBorder = '';
      for (let i = 0; i < tile.length; i++) {
        leftBorder += tile[i][0];
        rightBorder += tile[i][tile[i].length - 1];
      }
      return {
        id,
        borders: [
          ...this.lineToInt(tile[0]),
          ...this.lineToInt(rightBorder),
          ...this.lineToInt(tile[tile.length - 1]),
          ...this.lineToInt(leftBorder),
        ],
      };
    });
  };

  private isEdge(tile: Input, input: Input[]) {
    const fullBorders = input.map(item => (item.id !== tile.id ? item.borders : [])).flat();
    const sharedBorders = tile.borders
      .map(border => (fullBorders.includes(border) ? 1 : 0))
      .reduce((acc, curr) => acc + curr, 0);
    return sharedBorders === 4;
  }

  protected _solveFirstPart = (input: Input[]) => {
    return input.filter(tile => this.isEdge(tile, input)).reduce((acc, curr) => acc * curr.id, 1);
  };

  protected _solveSecondPart = (input: Input[]) => {
    const monsterWidth = 20;
    const monsterHeight = 3;
    const maxMonstersPerLine = (Math.sqrt(input.length) * 10) / monsterWidth;
    console.log((maxMonstersPerLine * Math.sqrt(input.length)) / monsterHeight);
    return 0;
  };
}

export const solver = new DaySolver();
