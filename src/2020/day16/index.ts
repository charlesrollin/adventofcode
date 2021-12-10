import { difference } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';

interface Input {
  rules: { name: string; ranges: { min: number; max: number }[] }[];
  ownTicket: number[];
  tickets: number[][];
}

class DaySolver extends Solver<Input, number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [rawRules, rawOwnTicket, rawTickets] = input.split('\n\n');
    const rules = rawRules.split('\n').map(line => {
      const [_, name, min1, max1, min2, max2] = line.match(/^(.*): (\d*)-(\d*) or (\d*)-(\d*)$/);
      return {
        name,
        ranges: [
          { min: parseInt(min1), max: parseInt(max1) },
          { min: parseInt(min2), max: parseInt(max2) },
        ],
      };
    });
    const ownTicket = rawOwnTicket
      .split('\n')[1]
      .split(',')
      .map(item => parseInt(item));
    const tickets = rawTickets
      .split('\n')
      .slice(1)
      .map(line => line.split(',').map(item => parseInt(item)));
    return {
      rules,
      ownTicket,
      tickets,
    };
  };

  protected _solveFirstPart = (input: Input) => {
    let result = 0;
    input.tickets.forEach(ticket => {
      // console.log(result);
      ticket.forEach(field => {
        let isValidField = false;
        input.rules.forEach(rule => {
          rule.ranges.forEach(range => {
            if (field >= range.min && field <= range.max) {
              isValidField = isValidField || true;
            }
          });
        });
        if (!isValidField) {
          result += field;
        }
      });
    });
    return result;
  };

  private isInRanges(field: number, ranges: { min: number; max: number }[]) {
    return ranges.some(range => {
      return field >= range.min && field <= range.max;
    });
  }

  protected _solveSecondPart = (input: Input) => {
    const fieldNames = input.rules.map(rule => rule.name);
    let possibleFieldNames: Set<string>[] = new Array(input.ownTicket.length).fill(
      new Set(fieldNames)
    );
    const validTickets = input.tickets.filter(ticket => {
      return ticket.every(field => {
        return input.rules.some(rule => {
          return rule.ranges.some(range => {
            return field >= range.min && field <= range.max;
          });
        });
      });
    });
    for (let i = 0; i < input.ownTicket.length; i++) {
      possibleFieldNames[i] = new Set(
        input.rules
          .filter(rule => {
            return validTickets.every(ticket => this.isInRanges(ticket[i], rule.ranges));
          })
          .map(rule => rule.name)
      );
    }
    const sortedFields = possibleFieldNames
      .map((names, idx) => ({ idx, names }))
      .sort((a, b) => a.names.size - b.names.size);
    for (let i = 0; i < input.ownTicket.length; i++) {
      for (let j = i + 1; j < input.ownTicket.length; j++) {
        sortedFields[j] = {
          idx: sortedFields[j].idx,
          names: difference(sortedFields[j].names, sortedFields[i].names),
        };
      }
    }
    // console.log(sortedFields);
    const departureFieldValues = sortedFields
      .map(field => ({ ...field, names: [...field.names] }))
      .map(field => ({ idx: field.idx, name: field.names[0] }))
      .filter(field => field.name.startsWith('departure'))
      .map(field => input.ownTicket[field.idx]);
    return departureFieldValues.reduce((product, value) => product * value, 1);
  };
}

export const solver = new DaySolver();
