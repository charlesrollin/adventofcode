import { Solver } from 'src/shared/Solver';
import { Coords } from 'src/shared/types';

enum OpponentChoice {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum OwnChoice {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

const shapeScores: Record<OwnChoice | OpponentChoice, number> = {
  [OwnChoice.Rock]: 1,
  [OwnChoice.Paper]: 2,
  [OwnChoice.Scissors]: 3,
  [OpponentChoice.Rock]: 1,
  [OpponentChoice.Paper]: 2,
  [OpponentChoice.Scissors]: 3,
};

const outcomes: Record<OwnChoice, number> = {
  [OwnChoice.Rock]: 0,
  [OwnChoice.Paper]: 3,
  [OwnChoice.Scissors]: 6,
};

class DaySolver extends Solver<[OpponentChoice, OwnChoice][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(line => {
      const [opponentChoice, ownChoice] = line.split(' ');
      return [opponentChoice, ownChoice] as [OpponentChoice, OwnChoice];
    });
  };

  protected _solveFirstPart = (input: [OpponentChoice, OwnChoice][]) => {
    return input
      .map(choices => [shapeScores[choices[0]], shapeScores[choices[1]]] as Coords)
      .reduce((acc, curr) => acc + this.computeRoundScore(curr), 0);
  };

  protected _solveSecondPart = (input: [OpponentChoice, OwnChoice][]) => {
    return input
      .map(
        choices =>
          [
            shapeScores[choices[0]],
            this.guessShapeToPlay([shapeScores[choices[0]], outcomes[choices[1]]] as [
              number,
              number
            ]),
          ] as Coords
      )
      .reduce((acc, curr) => acc + this.computeRoundScore(curr), 0);
  };

  private computeRoundScore = (choices: Coords) => {
    let score = choices[1];
    if (choices[0] === choices[1]) {
      return score + 3;
    }
    const shapesDiff = choices[1] - choices[0];
    if (Math.abs(shapesDiff) === 1) {
      return score + (shapesDiff < 0 ? 0 : 6);
    }
    if (Math.abs(shapesDiff) === 2) {
      return score + (shapesDiff < 0 ? 6 : 0);
    }
  };

  private guessShapeToPlay = ([opponentChoice, outcome]: Coords) => {
    if (outcome === 3) {
      return opponentChoice;
    }
    const tempGuess = opponentChoice + (outcome === 6 ? 1 : -1);
    if (tempGuess === 0) {
      return 3;
    }
    if (tempGuess === 4) {
      return 1;
    }
    return tempGuess;
  };
}

export const solver = new DaySolver();
