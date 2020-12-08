import { day1 } from './1';
import { day2 } from './2';
import { day3 } from './3';
import { day4 } from './4';
import { day5 } from './5';
import { day6 } from './6';
import { day7 } from './7';
import { day8 } from './8';
import { Solver } from './Solver';

const solversArray = [day1, day2, day3, day4, day5, day6, day7, day8];
export const Solvers: { [key: number]: Solver<any, any> } = {};

solversArray.forEach(solver => {
  Solvers[solver.day] = solver;
});
