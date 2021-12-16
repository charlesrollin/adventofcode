import { getNeighboursCoords } from 'src/shared/matrix';
import { Solver } from 'src/shared/Solver';

enum TypeId {
  LiteralValue = 4,
}

const operators = {
  0: (values: number[]) => values.reduce((acc, curr) => acc + curr, 0),
  1: (values: number[]) => values.reduce((acc, curr) => acc * curr, 1),
  2: (values: number[]) => Math.min(...values),
  3: (values: number[]) => Math.max(...values),
  5: ([a, b]: number[]) => (a > b ? 1 : 0),
  6: ([a, b]: number[]) => (a < b ? 1 : 0),
  7: ([a, b]: number[]) => (a === b ? 1 : 0),
};

class DaySolver extends Solver<string, number> {
  constructor() {
    super(__dirname);
  }

  private hex2bin(hex) {
    return parseInt(hex, 16).toString(2).padStart(4, '0');
  }

  private bin2dec(bin) {
    return parseInt(bin, 2);
  }

  private parsePacket(str: string) {
    const typeId = this.bin2dec(str.slice(3, 6));
    switch (typeId) {
      case TypeId.LiteralValue:
        return this.parseLiteralValue(str);
      default:
        return this.parseOperator(str);
    }
  }

  private parseLiteralValue(str: string) {
    const version = this.bin2dec(str.slice(0, 3));
    const typeId = this.bin2dec(str.slice(3, 6));
    const bits = [];
    let i = 6;
    while (str[i] === '1') {
      bits.push(str.slice(i + 1, i + 5));
      i += 5;
    }
    bits.push(str.slice(i + 1, i + 5));
    const remainingPackets = str.slice(i + 5);
    return {
      version,
      versionTotal: version,
      typeId,
      value: this.bin2dec(bits.join('')),
      remainingPackets,
    };
  }

  private parseOperator(str: string) {
    const version = this.bin2dec(str.slice(0, 3));
    const typeId = this.bin2dec(str.slice(3, 6));
    const lengthTypeId = this.bin2dec(str[6]);
    const value = this.bin2dec(str.slice(7, lengthTypeId === 0 ? 22 : 18));
    let remainingPackets = str.slice(lengthTypeId === 0 ? 22 : 18);
    const subpackets: { versionTotal: number; value: number }[] = [];
    while (
      (lengthTypeId === 1 && subpackets.length < value) ||
      (lengthTypeId === 0 && str.length - remainingPackets.length - 22 < value)
    ) {
      const newPacket = this.parsePacket(remainingPackets);
      subpackets.push(newPacket);
      remainingPackets = newPacket.remainingPackets;
    }
    return {
      version,
      versionTotal: subpackets.reduce((acc, curr) => acc + curr.versionTotal, version),
      typeId,
      lengthTypeId,
      value: operators[typeId](subpackets.map(packet => packet.value)),
      remainingPackets,
    };
  }

  protected parseInput = (input: string) => {
    const rawBin = input
      .split('')
      .map(char => this.hex2bin(char))
      .join('');
    rawBin.padStart(rawBin.length + ((4 - (rawBin.length % 4)) % 4), '0');
    return rawBin;
  };

  protected _solveFirstPart = (input: string) => {
    return this.parsePacket(input).versionTotal;
  };

  protected _solveSecondPart = (input: string) => {
    return this.parsePacket(input).value;
  };
}

export const solver = new DaySolver();
