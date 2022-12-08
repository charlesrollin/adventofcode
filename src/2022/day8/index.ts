import { Solver } from 'src/shared/Solver';

enum Direction {
  TOP,
  LEFT,
  BOTTOM,
  RIGHT,
}

class DaySolver extends Solver<number[][], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n').map(line => line.split('').map(tree => parseInt(tree)));
    return lines;
  };

  protected _solveFirstPart = (input: number[][]) => {
    const treeViews = [Direction.TOP, Direction.BOTTOM, Direction.LEFT, Direction.RIGHT].map(
      direction => this.computeTreeView(input, direction)
    );
    let visibleTreesCount = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (treeViews.map(view => view[i][j]).some(treeVisibility => treeVisibility)) {
          visibleTreesCount += 1;
        }
      }
    }
    return visibleTreesCount;
  };

  protected _solveSecondPart = (input: number[][]) => {
    let maxScenicScore = -Infinity;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        const scenicScore = this.computeScenicScore(input, [i, j]);
        if (maxScenicScore < scenicScore) {
          maxScenicScore = scenicScore;
        }
      }
    }
    return maxScenicScore;
  };

  private getTreePosition = (
    gridLength: number,
    [i, j]: [number, number],
    direction: Direction
  ) => {
    switch (direction) {
      case Direction.LEFT:
        return [i, j];
      case Direction.RIGHT:
        return [i, gridLength - j - 1];
      case Direction.TOP:
        return [j, i];
      case Direction.BOTTOM:
        return [gridLength - j - 1, gridLength - i - 1];
    }
  };

  private computeTreeView = (grid: number[][], direction: Direction) => {
    const boolGrid = [...grid].map(line => line.map(_ => false));
    for (let i = 0; i < grid.length; i++) {
      let maxHeight = -Infinity;
      for (let j = 0; j < grid.length; j++) {
        const [index1, index2] = this.getTreePosition(grid.length, [i, j], direction);
        const tempGridValue = grid[index1][index2];
        boolGrid[index1][index2] = maxHeight < tempGridValue;
        if (maxHeight < tempGridValue) {
          maxHeight = tempGridValue;
        }
      }
    }
    return boolGrid;
  };

  private computeScenicScore = (input: number[][], position: [number, number]) => {
    let topVisibleTrees = 0;
    let offset = -1;
    while (
      position[0] + offset > -1 &&
      input[position[0] + offset][position[1]] < input[position[0]][position[1]]
    ) {
      topVisibleTrees += 1;
      offset -= 1;
    }
    if (position[0] + offset !== -1) {
      topVisibleTrees += 1;
    }

    let bottomVisibleTrees = 0;
    offset = 1;
    while (
      position[0] + offset < input.length &&
      input[position[0] + offset][position[1]] < input[position[0]][position[1]]
    ) {
      bottomVisibleTrees += 1;
      offset += 1;
    }
    if (position[0] + offset !== input.length) {
      bottomVisibleTrees += 1;
    }

    let leftVisibleTrees = 0;
    offset = -1;
    while (
      position[1] + offset > -1 &&
      input[position[0]][position[1] + offset] < input[position[0]][position[1]]
    ) {
      leftVisibleTrees += 1;
      offset -= 1;
    }
    if (position[1] + offset !== -1) {
      leftVisibleTrees += 1;
    }

    let rightVisibleTrees = 0;
    offset = 1;
    while (
      position[1] + offset < input.length &&
      input[position[0]][position[1] + offset] < input[position[0]][position[1]]
    ) {
      rightVisibleTrees += 1;
      offset += 1;
    }
    if (position[1] + offset !== input.length) {
      rightVisibleTrees += 1;
    }

    return bottomVisibleTrees * topVisibleTrees * leftVisibleTrees * rightVisibleTrees;
  };
}

export const solver = new DaySolver();
