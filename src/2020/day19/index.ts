import { Solver } from '../../shared/Solver';

interface Input {
  rules: Map<number, { value?: string; subRules?: number[][] }>;
  messages: string[];
}

class DaySolver extends Solver<Input, number> {
  private regexCache = new Map<number, string>();

  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const [rawRules, rawMessages] = input.split('\n\n');
    const rules = new Map();
    rawRules.split('\n').forEach(rawRule => {
      const id = parseInt(rawRule.match(/^(.*):/)[0]);
      const charRule = rawRule.match(/(?:.*): "(.*)"/);
      if (charRule) {
        rules.set(id, { value: charRule[1] });
        return;
      }
      let subRules = [];
      const simpleSubRules = rawRule.match(/^(?:.*): ((?:\d| )*)$/);
      if (simpleSubRules) {
        subRules.push(simpleSubRules[1]);
      }
      const complexSubRules = rawRule.match(/^(?:.*): ((?:\d| )*) \| ((?:\d| )*)$/);
      if (complexSubRules) {
        subRules.push(complexSubRules[1]);
        subRules.push(complexSubRules[2]);
      }
      rules.set(id, {
        subRules: subRules.map(subRule => subRule.split(' ').map(item => parseInt(item))),
      });
    });
    return {
      rules,
      messages: rawMessages.split('\n'),
    };
  };

  private buildRegex(rules: Input['rules'], currentRuleIdx = 0) {
    if (this.regexCache.has(currentRuleIdx)) {
      return this.regexCache.get(currentRuleIdx);
    }
    const currentRule = rules.get(currentRuleIdx);
    if (currentRule.value !== undefined) {
      this.regexCache.set(currentRuleIdx, currentRule.value);
      return currentRule.value;
    }
    let regex;
    regex = currentRule.subRules
      .map(section => section.map(subRule => this.buildRegex(rules, subRule)).join(''))
      .join('|');
    regex = `(${regex})`;
    this.regexCache.set(currentRuleIdx, regex);
    return regex;
  }

  protected _solveFirstPart = (input: Input) => {
    this.regexCache.clear();
    const regex = new RegExp(`^${this.buildRegex(input.rules)}$`);
    return input.messages.filter(message => regex.test(message)).length;
  };

  protected _solveSecondPart = (input: Input) => {
    this.regexCache.clear();
    this.buildRegex(input.rules, 0);
    const regexp11 = new Array(20)
      .fill(null)
      .map((item, idx) => {
        return `(${this.regexCache.get(42)}){${idx + 1}}(${this.regexCache.get(31)}){${idx + 1}}`;
      })
      .join('|');
    this.regexCache.set(0, `(${this.regexCache.get(42)}+)(${regexp11})`);

    return input.messages.filter(message => new RegExp(`^${this.regexCache.get(0)}$`).test(message))
      .length;
  };
}

export const solver = new DaySolver();
