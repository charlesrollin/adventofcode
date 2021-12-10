import { Solver } from 'src/shared/Solver';

interface Cup {
  value: number;
  next?: Cup;
}

class CupBoard {
  private cupsMap = new Map<number, Cup>();
  private cups: Cup;

  constructor(cups: number[]) {
    const lastCup: Cup = { value: cups[cups.length - 1] };
    this.cupsMap.set(lastCup.value, lastCup);
    const firstCup = cups
      .slice(0, -1)
      .reverse()
      .reduce((acc, curr) => {
        const currentCup = { value: curr, next: acc };
        this.cupsMap.set(currentCup.value, currentCup);
        return currentCup;
      }, lastCup);
    lastCup.next = firstCup;
    this.cups = firstCup;
  }

  private pickCups() {
    const pickedUpCups = [this.cups.next, this.cups.next.next, this.cups.next.next.next];
    this.cups.next = pickedUpCups[2].next;
    return pickedUpCups;
  }

  public doMove() {
    // let moveLog = this.getBoardRepresentation();
    const pickedUpCups = this.pickCups();
    const pickedUpValues = pickedUpCups.map(cup => cup.value);
    // moveLog += `\npick up: ${pickedUpValues.join(' ')}`;
    let destinationCupValue = this.cups.value - 1 || this.cupsMap.size;
    while (pickedUpValues.includes(destinationCupValue)) {
      destinationCupValue -= 1;
      if (destinationCupValue === 0) {
        destinationCupValue = this.cupsMap.size;
      }
    }
    // moveLog += `\ndestination: ${destinationCupValue}`;
    const destinationCup = this.cupsMap.get(destinationCupValue);
    const currentDestinationNext = destinationCup.next;
    destinationCup.next = pickedUpCups[0];
    pickedUpCups[2].next = currentDestinationNext;
    this.cups = this.cups.next;
    // console.log(moveLog);
  }

  private getBoardRepresentation() {
    const firstValue = this.cups.value;
    let representation = `cups: (${firstValue})`;
    let currentCup = this.cups.next;
    while (currentCup.value !== firstValue) {
      representation += ` ${currentCup.value}`;
      currentCup = currentCup.next;
    }
    return representation;
  }

  public getPart1Result() {
    const cup1 = this.cupsMap.get(1);
    let currentCup = cup1.next;
    let result = '';
    while (currentCup.value !== 1) {
      result += currentCup.value;
      currentCup = currentCup.next;
    }
    return result;
  }

  public getPart2Result() {
    const cup1 = this.cupsMap.get(1);
    return cup1.next.value * cup1.next.next.value;
  }
}

class DaySolver extends Solver<number[], number | string> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('').map(char => parseInt(char));
  };

  protected _solveFirstPart = (input: number[], movesAmount = 100) => {
    const board = new CupBoard(input);
    for (let i = 0; i < movesAmount; i++) {
      board.doMove();
    }
    return board.getPart1Result();
  };

  protected _solveSecondPart = (input: number[], movesAmount = 10000000) => {
    const board = new CupBoard([
      ...input,
      ...new Array(1000000 - 9).fill(undefined).map((item, idx) => idx + 10),
    ]);
    for (let i = 0; i < movesAmount; i++) {
      board.doMove();
    }
    return board.getPart2Result();
  };
}

export const solver = new DaySolver();
