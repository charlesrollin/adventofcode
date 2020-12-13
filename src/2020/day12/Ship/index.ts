export enum ACTION {
  NORTH = 'N',
  SOUTH = 'S',
  EAST = 'E',
  WEST = 'W',
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F',
}

export interface Action {
  action: ACTION;
  arg: number;
}

export class Ship {
  position = [0, 0];
  direction = ACTION.EAST;

  wayPointPosition = [10, 1];

  movement = {
    [ACTION.NORTH]: [0, 1],
    [ACTION.SOUTH]: [0, -1],
    [ACTION.EAST]: [1, 0],
    [ACTION.WEST]: [-1, 0],
  };

  constructor(private withWaypoint = false) {}

  private moveShip(action: Action) {
    this.position[0] = this.position[0] + this.movement[action.action][0] * action.arg;
    this.position[1] = this.position[1] + this.movement[action.action][1] * action.arg;
  }

  private rotateShip(action: Action) {
    const sortedDirections = [ACTION.WEST, ACTION.NORTH, ACTION.EAST, ACTION.SOUTH];
    const changeStep = action.arg / 90;
    const currentIdx = sortedDirections.findIndex(direction => direction === this.direction);
    this.direction =
      sortedDirections[
        (currentIdx +
          (action.action === ACTION.RIGHT ? changeStep : -changeStep) +
          sortedDirections.length) %
          sortedDirections.length
      ];
  }

  private moveWaypoint(action: Action) {
    this.wayPointPosition[0] =
      this.wayPointPosition[0] + this.movement[action.action][0] * action.arg;
    this.wayPointPosition[1] =
      this.wayPointPosition[1] + this.movement[action.action][1] * action.arg;
  }

  private rotateWaypoint(action: Action) {
    const rotations = {
      1: [this.wayPointPosition[1], -this.wayPointPosition[0]],
      2: [-this.wayPointPosition[0], -this.wayPointPosition[1]],
      3: [-this.wayPointPosition[1], this.wayPointPosition[0]],
    };
    let changeStep = action.arg / 90;
    if (action.action === ACTION.LEFT) {
      changeStep = (-changeStep + 4) % 4;
    }
    this.wayPointPosition = rotations[changeStep];
  }

  private moveShipToWaypoint(action: Action) {
    this.position[0] = this.position[0] + this.wayPointPosition[0] * action.arg;
    this.position[1] = this.position[1] + this.wayPointPosition[1] * action.arg;
  }

  execute(action: Action) {
    switch (action.action) {
      case ACTION.FORWARD:
        if (this.withWaypoint) {
          return this.moveShipToWaypoint(action);
        }
        return this.moveShip({ action: this.direction, arg: action.arg });
      case ACTION.LEFT:
      case ACTION.RIGHT:
        if (this.withWaypoint) {
          return this.rotateWaypoint(action);
        }
        return this.rotateShip(action);
      default:
        if (this.withWaypoint) {
          return this.moveWaypoint(action);
        }
        return this.moveShip(action);
    }
  }
}
