import { Solver } from '../solvers/Solver';
import { Action, ACTION, Ship } from './Ship';

class DaySolver extends Solver<Action[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      const [action, ...arg] = line;
      return { action: action as ACTION, arg: parseInt(arg.join('')) };
    });
  };

  protected _solveFirstPart = (input: Action[]) => {
    const ship = new Ship();
    input.forEach(action => {
      ship.execute(action);
    });
    return Math.abs(ship.position[0]) + Math.abs(ship.position[1]);
  };

  protected _solveSecondPart = (input: Action[]) => {
    const ship = new Ship(true);
    input.forEach(action => {
      ship.execute(action);
    });
    return Math.abs(ship.position[0]) + Math.abs(ship.position[1]);
  };
}

export const solver = new DaySolver();
