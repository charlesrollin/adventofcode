import { difference, intersection, union } from 'src/shared/sets';
import { Solver } from 'src/shared/Solver';

interface Input {
  ingredients: string[];
  alergens: string[];
}

class DaySolver extends Solver<Input[], number | string> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    return input.split('\n').map(line => {
      const [_, rawIngredients, rawAlergens] = line.match(/(.*) \(contains (.*)\)/);
      return {
        ingredients: rawIngredients.split(' '),
        alergens: rawAlergens.split(', '),
      };
    });
  };

  private getIngredientsConstraints(input: Input[]) {
    const constraints: Record<string, Set<string>> = {};
    const ingredientsCount: Record<string, number> = {};
    input.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsCount[ingredient] = (ingredientsCount[ingredient] ?? 0) + 1;
      });
      recipe.alergens.forEach(alergen => {
        if (constraints[alergen] === undefined) {
          constraints[alergen] = new Set(recipe.ingredients);
        } else {
          constraints[alergen] = intersection(constraints[alergen], new Set(recipe.ingredients));
        }
      });
    });
    return {
      constraints,
      ingredientsCount,
    };
  }

  protected _solveFirstPart = (input: Input[]) => {
    const { constraints, ingredientsCount } = this.getIngredientsConstraints(input);
    const ingredientsWithAlergens = Object.values(constraints).reduce(
      (all, current) => union(all, current),
      new Set()
    );
    return Object.entries(ingredientsCount).reduce(
      (acc, curr) => acc + (!ingredientsWithAlergens.has(curr[0]) ? curr[1] : 0),
      0
    );
  };

  protected _solveSecondPart = (input: Input[]) => {
    const { constraints } = this.getIngredientsConstraints(input);
    const sortedConstraints = Object.keys(constraints)
      .map(alergen => ({ alergen, ingredients: constraints[alergen] }))
      .sort((a, b) => a.ingredients.size - b.ingredients.size);
    for (let i = 0; i < sortedConstraints.length; i++) {
      let k = i;
      while (k < sortedConstraints.length && sortedConstraints[k].ingredients.size !== 1) {
        k += 1;
      }
      if (k < sortedConstraints.length) {
        const swap = sortedConstraints[i];
        sortedConstraints[i] = sortedConstraints[k];
        sortedConstraints[k] = swap;
      }
      for (let j = i + 1; j < sortedConstraints.length; j++) {
        sortedConstraints[j].ingredients = difference(
          sortedConstraints[j].ingredients,
          sortedConstraints[i].ingredients
        );
      }
    }
    return sortedConstraints
      .filter(constraint => constraint.ingredients.size !== 0)
      .sort((a, b) => a.alergen.localeCompare(b.alergen))
      .map(constraint => [...constraint.ingredients][0])
      .join();
  };
}

export const solver = new DaySolver();
