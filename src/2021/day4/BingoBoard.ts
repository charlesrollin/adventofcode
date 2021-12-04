export class BingoBoard {
  private score: number = 0;
  private lines: number[][];

  constructor(input: number[][], private idx: number) {
    this.score = input.reduce((acc, line) => acc + line.reduce((acc, item) => acc + item, 0), 0);
    this.lines = [
      // lines
      ...input,
      // columns
      ...input.map((_, columnIdx) => input.map((_, lineIdx) => input[lineIdx][columnIdx])),
    ];
  }

  private hasWon() {
    return this.lines.some(line => line.length === 0);
  }

  private removeNumber(number: number) {
    let numberWasPresent = false;
    this.lines = this.lines.map(line => {
      const temp = line.filter(item => item !== number);
      if (!numberWasPresent && temp.length < line.length) {
        numberWasPresent = true;
      }
      return temp;
    });
    return numberWasPresent;
  }

  public markNumber(number: number) {
    let hasWon = false;
    if (this.removeNumber(number)) {
      this.score -= number;
      hasWon = this.hasWon();
    }
    return { hasWon, score: number * this.score, board: this };
  }
}
