import { day1 } from './1';
import { day2 } from './2';
import { day3 } from './3';
import { day4 } from './4';
import { Solver } from './Solver';

const solversArray = [day1, day2, day3, day4];
export const Solvers: { [key: number]: Solver<any, any> } = {};

solversArray.forEach(solver => {
  Solvers[solver.day] = solver;
});
