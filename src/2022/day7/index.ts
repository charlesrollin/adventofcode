import { Solver } from 'src/shared/Solver';

enum COMMANDS {
  CD = 'cd',
  LS = 'ls',
}

interface Content {
  type: 'file' | 'dir';
  name: string;
  size: number;
}

interface Directory {
  size: number;
  path: string;
  subDirectories: Set<string>;
  computed?: boolean;
}

interface Command {
  type: COMMANDS;
  param?: string;
  output?: Content[];
}

class DaySolver extends Solver<Command[], number> {
  constructor() {
    super(__dirname);
  }

  protected parseInput = (input: string) => {
    const lines = input.split('\n');
    const commands: Command[] = [];
    let currentCommand: Command;
    for (let idx = 0; idx < lines.length; idx++) {
      const item = lines[idx].split(' ');
      if (item[0] === '$') {
        if (currentCommand !== undefined) {
          commands.push(currentCommand);
        }
        currentCommand = {
          type: item[1] as COMMANDS,
          param: item[2],
          output: item[1] === COMMANDS.LS ? [] : undefined,
        };
      } else {
        currentCommand.output?.push({
          type: item[0] === 'dir' ? 'dir' : 'file',
          size: item[0] === 'dir' ? undefined : parseInt(item[0]),
          name: item[1],
        });
      }
    }
    commands.push(currentCommand);
    return commands;
  };

  protected _solveFirstPart = (input: Command[]) => {
    const directories = this.buildDirTree(input);
    this.computeDirectorySizes(directories);
    return Object.values(directories)
      .filter(directory => directory.size <= 100000)
      .reduce((acc, curr) => acc + curr.size, 0);
  };

  protected _solveSecondPart = (input: Command[]) => {
    const TOTAL_SPACE = 70000000;
    const REQUIRED_SPACE = 30000000;
    const directories = this.buildDirTree(input);
    this.computeDirectorySizes(directories);
    const sortedDirs = Object.values(directories).sort((a, b) => a.size - b.size);
    const missingSpace = REQUIRED_SPACE - (TOTAL_SPACE - sortedDirs[sortedDirs.length - 1].size);
    for (let idx = 0; idx < sortedDirs.length; idx++) {
      const dir = sortedDirs[idx];
      if (dir.size > missingSpace) {
        return dir.size;
      }
    }
  };

  private getCwd = (cdStack: string[]) => cdStack.join('/');

  private buildDirTree = (input: Command[]) => {
    const directories: Record<string, Directory> = {};
    const cdStack = [];
    input.forEach(command => {
      if (command.type === COMMANDS.CD) {
        if (command.param === '..') {
          cdStack.pop();
        } else {
          if (cdStack.length !== 0) {
            const cwd = this.getCwd(cdStack);
            directories[cwd].subDirectories.add(`${cwd}/${command.param}`);
          }
          cdStack.push(command.param);
          const cwd = this.getCwd(cdStack);
          if (!directories[cwd]) {
            directories[cwd] = {
              size: 0,
              subDirectories: new Set(),
              path: cwd,
            };
          }
        }
      } else {
        directories[this.getCwd(cdStack)].size += (command.output ?? []).reduce(
          (acc, curr) => acc + (curr.type === 'dir' ? 0 : curr.size),
          0
        );
      }
    });
    return directories;
  };

  private computeDirectorySizes = (directories: Record<string, Directory>) => {
    let dirArray = Object.values(directories);
    while (dirArray.length > 1) {
      dirArray.sort((a, b) => a.subDirectories.size - b.subDirectories.size);
      const computedDirectories: string[] = [];
      dirArray.forEach(dir => {
        if (dir.subDirectories.size === 0) {
          computedDirectories.push(dir.path);
          directories[dir.path].size = dir.size;
          dir.computed = true;
        } else {
          computedDirectories.forEach(computedDir => {
            if (dir.subDirectories.has(computedDir)) {
              dir.size += directories[computedDir].size;
              dir.subDirectories.delete(computedDir);
            }
          });
        }
      });
      dirArray = dirArray.filter(dir => !dir.computed);
    }
  };
}

export const solver = new DaySolver();
