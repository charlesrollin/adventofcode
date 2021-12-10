import { Solver } from 'src/shared/Solver';
import { BingoBoard } from './BingoBoard';

class DaySolver extends Solver<{ numbers: number[]; grids: BingoBoard[] }, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [rawNumbers, ...rawGrids] = input.split(/\r?\n\r?\n/);
    return {
      numbers: rawNumbers.split(',').map(number => parseInt(number, 10)),
      grids: rawGrids.map(
        (rawGrid, idx) =>
          new BingoBoard(
            rawGrid.split(/\r?\n/).map(line =>
              line
                .split(/(\s)+/)
                .map(item => parseInt(item, 10))
                .filter(item => !isNaN(item))
            ),
            idx
          )
      ),
    };
  };

  protected _solveFirstPart = (input: { numbers: number[]; grids: BingoBoard[] }) => {
    for (let i = 0; i < input.numbers.length; i++) {
      const results = input.grids.map(grid => grid.markNumber(input.numbers[i]));
      const winningBoardIndex = results.findIndex(({ hasWon }) => hasWon);
      if (winningBoardIndex !== -1) {
        return results[winningBoardIndex].score;
      }
    }
    return 0;
  };

  protected _solveSecondPart = (input: { numbers: number[]; grids: BingoBoard[] }) => {
    let grids = input.grids;
    for (let i = 0; i < input.numbers.length; i++) {
      const results = grids.map(grid => grid.markNumber(input.numbers[i]));
      if (results.length === 1 && results[0].hasWon) {
        return results[0].score;
      }
      grids = results.filter(result => !result.hasWon).map(result => result.board);
    }
    return 0;
  };
}

export const solver = new DaySolver();
