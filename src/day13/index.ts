import { Solver } from '../solvers/Solver';

interface Input {
  estimatedTimestamp: bigint;
  busIds: (bigint | undefined)[];
}

class DaySolver extends Solver<Input, bigint> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [rawEstimated, rawIds] = input.split(/\n/);
    return {
      estimatedTimestamp: BigInt(rawEstimated),
      busIds: rawIds.split(',').map(rawId => (rawId === 'x' ? undefined : BigInt(rawId))),
    };
  };

  protected _solveFirstPart = (input: Input) => {
    const waitingTimes = input.busIds
      .filter(id => id !== undefined)
      .map(id => ({ id, waitingTime: id - (input.estimatedTimestamp % id) }));
    let minWaitingTime = { id: 0n, waitingTime: BigInt(Number.MAX_SAFE_INTEGER) };
    for (let i = 0; i < waitingTimes.length; i++) {
      const element = waitingTimes[i];
      if (element.waitingTime < minWaitingTime.waitingTime) {
        minWaitingTime = element;
      }
    }
    return minWaitingTime.id * minWaitingTime.waitingTime;
  };

  private bezoutCoeffs(p: bigint, q: bigint): { gcd: bigint; coeffs: [bigint, bigint] } {
    if (q == 0n) return { coeffs: [1n, 0n], gcd: p };

    const vals = this.bezoutCoeffs(q, p % q);
    const d = vals.gcd;
    const a = vals.coeffs[1];
    const b = vals.coeffs[0] - (p / q) * vals.coeffs[1];

    return { coeffs: [a, b], gcd: d };
  }

  protected _solveSecondPart = (input: Input) => {
    const enhancedInput = input.busIds
      .map((id, idx) => ({ offset: BigInt(idx), id }))
      .filter(item => item.id !== undefined);
    let computed = { ...enhancedInput[0] };
    enhancedInput.slice(1).forEach((item, idx) => {
      const { coeffs } = this.bezoutCoeffs(computed.id, item.id);
      let x = computed.offset * coeffs[1] * item.id + item.offset * coeffs[0] * computed.id;
      if (idx !== enhancedInput.slice(1).length - 1) {
        computed = { id: computed.id * item.id, offset: x };
      } else {
        computed.id = x;
      }
    });
    const sup = enhancedInput.reduce((acc, curr) => acc * curr.id, 1n);
    return (sup + ((sup - computed.id) % sup)) % sup;
  };
}

export const solver = new DaySolver();
