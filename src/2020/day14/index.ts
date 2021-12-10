import { Solver } from 'src/shared/Solver';

enum OPERATION {
  MASK = 'mask',
  MEM = 'mem',
}

interface Input {
  type: OPERATION;
  data: { location: number; value?: number }[];
}

class DaySolver extends Solver<Input[], bigint> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split(/\n/).map(line => {
      const mask = line.match(/mask = ((X|0|1)*)/);
      if (mask) {
        return {
          type: OPERATION.MASK,
          data: mask[1].split('').map((value, idx) => ({
            location: 35 - idx,
            value: isNaN(parseInt(value)) ? undefined : parseInt(value),
          })),
        };
      }
      const mem = line.match(/mem\[(\d*)\] = (\d*)/);
      if (mem) {
        return {
          type: OPERATION.MEM,
          data: [
            {
              location: parseInt(mem[1]),
              value: parseInt(mem[2]),
            },
          ],
        };
      }
    });
  };

  protected _solveFirstPart = (input: Input[]) => {
    const memory: Record<string, bigint> = {};
    let masks: ((value: bigint) => bigint)[] = [];
    input.forEach(operation => {
      if (operation.type === OPERATION.MASK) {
        masks = operation.data.map(mask => {
          return (value: bigint) => {
            if (mask.value === undefined) {
              return value;
            }
            const bitMask = 2n ** BigInt(mask.location);
            return mask.value === 1 ? BigInt(value) | bitMask : BigInt(value) & ~bitMask;
          };
        });
      }
      if (operation.type === OPERATION.MEM) {
        const maskedValue = masks.reduce(
          (value, mask) => mask(value),
          BigInt(operation.data[0].value)
        );
        memory[operation.data[0].location] = maskedValue;
      }
    });
    return Object.values(memory).reduce((acc, curr) => acc + curr, 0n);
  };

  private computeFloatingBits(value: bigint, floatingBits: number[]): bigint[] {
    let computedValues = [value];
    floatingBits.forEach(floatingBit => {
      let result = [];
      computedValues.forEach(computedValue => {
        result.push(computedValue | (2n ** BigInt(floatingBit)));
        result.push(computedValue & ~(2n ** BigInt(floatingBit)));
      });
      computedValues = result;
    });
    return computedValues;
  }

  protected _solveSecondPart = (input: Input[]) => {
    const memory: Record<string, bigint> = {};
    let masks: ((value: bigint) => bigint)[] = [];
    let floatingBits: number[] = [];
    input.forEach(operation => {
      if (operation.type === OPERATION.MASK) {
        floatingBits = operation.data
          .filter(mask => mask.value === undefined)
          .map(mask => mask.location);
        masks = operation.data.map(mask => {
          return (value: bigint) => {
            if (mask.value !== 1) {
              return value;
            }
            const bitMask = 2n ** BigInt(mask.location);
            return BigInt(value) | bitMask;
          };
        });
      }
      if (operation.type === OPERATION.MEM) {
        const maskedLocation = masks.reduce(
          (value, mask) => mask(value),
          BigInt(operation.data[0].location)
        );
        const locations = this.computeFloatingBits(maskedLocation, floatingBits);
        locations.forEach(location => {
          memory[Number(location)] = BigInt(operation.data[0].value);
        });
      }
    });
    return Object.values(memory).reduce((acc, curr) => acc + curr, 0n);
  };
}

export const solver = new DaySolver();
