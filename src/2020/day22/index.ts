import { Solver } from 'src/shared/Solver';

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n\n').map(line => {
      const [rawPlayer, ...rawCards] = line.split('\n');
      return rawCards.map(raw => parseInt(raw));
    });
  };

  private getScore(deck: number[]) {
    return deck.reverse().reduce((acc, curr, idx) => acc + (idx + 1) * curr, 0);
  }

  protected _solveFirstPart = (decks: number[][]) => {
    while (decks.every(deck => deck.length > 0)) {
      const playedCards = decks.map(deck => deck.shift());
      const winner = playedCards[0] > playedCards[1] ? 0 : 1;
      if (winner === 0) {
        decks[0].push(...playedCards);
      } else {
        decks[1].push(...playedCards.reverse());
      }
    }
    let winningDeck = decks[0].length !== 0 ? decks[0] : decks[1];
    return this.getScore(winningDeck);
  };

  private recursiveCombat(decks: number[][]) {
    const existingConfigurations: Set<string> = new Set();
    while (decks.every(deck => deck.length !== 0)) {
      if (existingConfigurations.has(decks.map(deck => deck.join()).join('|'))) {
        return {
          winningDeck: decks[0],
          winner: 0,
        };
      } else {
        existingConfigurations.add(decks.map(deck => deck.join()).join('|'));
      }
      const revealedCards = decks.map(deck => deck.shift());
      if (revealedCards.every((card, idx) => card <= decks[idx].length)) {
        let { winner } = this.recursiveCombat(
          revealedCards.map((card, idx) => decks[idx].slice(0, card))
        );
        decks[winner].push(...(winner === 0 ? revealedCards : revealedCards.reverse()));
      } else {
        if (revealedCards[0] > revealedCards[1]) {
          decks[0].push(...revealedCards);
        } else {
          decks[1].push(...revealedCards.reverse());
        }
      }
    }
    const winner = decks[0].length !== 0 ? 0 : 1;
    return {
      winner,
      winningDeck: decks[winner],
    };
  }

  protected _solveSecondPart = (input: number[][]) => {
    const { winningDeck } = this.recursiveCombat(input);
    return this.getScore(winningDeck);
  };
}

export const solver = new DaySolver();
