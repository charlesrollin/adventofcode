import { day1 } from "./1";
import { Solver } from "./Solver";

const solversArray = [day1];
export const Solvers: { [key: number]: Solver<any, any> } = {};

solversArray.forEach(solver => {
  Solvers[solver.day] = solver;
});
