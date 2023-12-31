import { readFileSync, writeFileSync } from "fs";

const INPUT = readFileSync("./10/input.txt", "utf8");
const TEST_INPUT = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
type cardinals = "N" | "E" | "S" | "W";
type Directions = Map<cardinals, { x: number; y: number }>;
type Pipes = Map<string, [Directions]>;

const GetPipeMap = (input: string): Pipes => {
  const PipeMap: Pipes = new Map();
  const Ground: Directions = new Map();
  Ground.set("N", { x: 0, y: 0 });
  Ground.set("E", { x: 0, y: 0 });
  Ground.set("S", { x: 0, y: 0 });
  Ground.set("W", { x: 0, y: 0 });
  const NorthSouth: Directions = new Map();
  NorthSouth.set("N", { x: 0, y: -1 });
  NorthSouth.set("S", { x: 0, y: 1 });
  const EastWest: Directions = new Map();
  EastWest.set("E", { x: 1, y: 0 });
  EastWest.set("W", { x: -1, y: 0 });
  const NorthWest: Directions = new Map();
  NorthWest.set("N", { x: 0, y: -1 });
  NorthWest.set("W", { x: -1, y: 0 });
  const NorthEast: Directions = new Map();
  NorthEast.set("N", { x: 0, y: -1 });
  NorthEast.set("E", { x: 1, y: 0 });
  const SouthWest: Directions = new Map();
  SouthWest.set("S", { x: 0, y: 1 });
  SouthWest.set("W", { x: -1, y: 0 });
  const SouthEast: Directions = new Map();
  SouthEast.set("S", { x: 0, y: 1 });
  SouthEast.set("E", { x: 1, y: 0 });

  PipeMap.set("|", [NorthSouth]);
  PipeMap.set("-", [EastWest]);
  PipeMap.set("L", [NorthEast]);
  PipeMap.set("J", [NorthWest]);
  PipeMap.set("7", [SouthWest]);
  PipeMap.set("F", [SouthEast]);
  PipeMap.set(".", [Ground]);
  PipeMap.set("S", [Ground]);

  return PipeMap;
};

const GetInput = (input: string): string[][] => {
  return input.split("\n").map((x) => x.split(""));
};

const FindS = (input: string[][]): [number, number] => {
  for (let i = 0; i < input.length; i++) {
    const index = input[i].indexOf("S");
    if (index !== -1) {
      return [i, index];
    }
  }
  return [-1, -1];
};

type PuzzleMap = { x: number; y: number }[];

const GetNextDirection = (
  pipe: [Directions],
  previousDirection: cardinals
): cardinals => {
  for (const directionMap of pipe) {
    if (directionMap.has(previousDirection)) {
      for (let [key, _] of directionMap) {
        if (key !== previousDirection) {
          return key;
        }
      }
    }
  }
};

const InitPuzzle = (
  input: string[][],
  pipes: Pipes
): { puzzle: PuzzleMap; direction: cardinals } => {
  const [y, x] = FindS(input);
  let NorthPipe = '';
  let SouthPipe = '';
  let EastPipe = '';
  let WestPipe = '';
  if (y - 1 > 0) {
    NorthPipe = input[y - 1][x];
  }
  if (x - 1 > 0) {
    WestPipe = input[y][x - 1];
  }
  if (y + 1 < input.length) {
    SouthPipe = input[y + 1][x];
  }
  if (x + 1 < input[y].length) {
    EastPipe = input[y][x + 1];
  }
  const NorthPipeLeadsToS =
    NorthPipe === 'F' || NorthPipe === '7' || NorthPipe === '|';
  const SouthPipeLeadsToS =
    SouthPipe === 'L' || SouthPipe === 'J' || SouthPipe === '|';
  const EastPipeLeadsToS =
    EastPipe === 'J' || EastPipe === '7' || EastPipe === '-';
  const WestPipeLeadsToS =
    WestPipe === 'F' || WestPipe === 'L' || WestPipe === '-';
  //South East First
  let nextCardinalDirection: cardinals = 'S';
  let possibilities = [];
  if (NorthPipeLeadsToS && SouthPipeLeadsToS) {
    // Taking South Pipe
    const southPipe = pipes.get(SouthPipe);
    if (!southPipe) {
      throw new Error('No south pipe found');
    }
    nextCardinalDirection = GetNextDirection(southPipe, 'N');
    possibilities.push({
      puzzle: [{ x: x, y: y + 1 }],
      direction: nextCardinalDirection,
    });
  }
  if (EastPipeLeadsToS && WestPipeLeadsToS) {
    // Taking East Pipe
    const eastPipe = pipes.get(EastPipe);
    if (!eastPipe) {
      throw new Error('No east pipe found');
    }
    nextCardinalDirection = GetNextDirection(eastPipe, 'W');
    possibilities.push({
      puzzle: [{ x: x + 1, y: y }],
      direction: nextCardinalDirection,
    });
  }
  if (NorthPipeLeadsToS && EastPipeLeadsToS) {
    // Taking East Pipe
    const eastPipe = pipes.get(EastPipe);
    if (!eastPipe) {
      throw new Error('No east pipe found');
    }
    nextCardinalDirection = GetNextDirection(eastPipe, 'W');
    possibilities.push({
      puzzle: [{ x: x + 1, y: y }],
      direction: nextCardinalDirection,
    });
  }
  if (SouthPipeLeadsToS && EastPipeLeadsToS) {
    // Taking East Pipe
    const eastPipe = pipes.get(EastPipe);
    if (!eastPipe) {
      throw new Error('No east pipe found');
    }
    nextCardinalDirection = GetNextDirection(eastPipe, 'W');
    possibilities.push({
      puzzle: [{ x: x + 1, y: y }],
      direction: nextCardinalDirection,
    });
  }
  if (SouthPipeLeadsToS && WestPipeLeadsToS) {
    // Taking South Pipe
    const southPipe = pipes.get(SouthPipe);
    if (!southPipe) {
      throw new Error('No south pipe found');
    }
    nextCardinalDirection = GetNextDirection(southPipe, 'N');
    possibilities.push({
      puzzle: [{ x: x, y: y + 1 }],
      direction: nextCardinalDirection,
    });
  }
  if (NorthPipeLeadsToS && WestPipeLeadsToS) {
    // Taking North Pipe
    const northPipe = pipes.get(NorthPipe);
    if (!northPipe) {
      throw new Error('No west pipe found');
    }
    nextCardinalDirection = GetNextDirection(northPipe, 'S');
    possibilities.push({
      puzzle: [{ x: x, y: y - 1 }],
      direction: nextCardinalDirection,
    });
  }
  if (possibilities.length === 0) {
    throw new Error('No possibilities found');
  }
  const { puzzle, direction } = possibilities[0];
  return { puzzle, direction };
};

const InverseDirection = (direction: cardinals): cardinals => {
  switch (direction) {
    case 'N':
      return 'S';
    case 'S':
      return 'N';
    case 'E':
      return 'W';
    case 'W':
      return 'E';
  }
};

const buildDirectionCache = (PipeMap: Pipes) => {
  const cache = new Map();
  PipeMap.forEach((directions, pipeType) => {
    directions.forEach((direction) => {
      for (let [key, value] of direction) {
        const inverseDirection = InverseDirection(key);
        const cacheKey = `${pipeType}-${inverseDirection}`;
        cache.set(cacheKey, key);
      }
    });
  });
  return cache as Map<string, cardinals>;
};

const FollowPipe = (
  xInput: number,
  yInput: number,
  input: string[][],
  PipeMap: Pipes,
  direction: cardinals,
  total: number,
  directionCache: Map<string, cardinals>
): number => {
  if (input[yInput][xInput] === 'S' || input[yInput][xInput] === '.') {
    total += 1;
    if (input[yInput][xInput] === 'S') {
      return total;
    }
  }
  const currentPipe = input[yInput][xInput];
  const cacheKey = `${currentPipe}-${direction}`;
  console.log('cacheKey', cacheKey);
  console.log('directionCache', directionCache);
  const nextCardinal = directionCache.get(cacheKey);
  const nextDirections = PipeMap.get(currentPipe);
  if (!nextDirections) {
    throw new Error('No next directions found');
  }
  const nextDirectionCoords = nextDirections
    .find((x) => {
      return x.has(nextCardinal);
    })
    .get(nextCardinal);
  if (!nextDirectionCoords) {
    throw new Error('No next direction coords found');
  }
  total += 1;
  return FollowPipe(
    xInput + nextDirectionCoords.x,
    yInput + nextDirectionCoords.y,
    input,
    PipeMap,
    nextCardinal,
    total,
    directionCache
  );
};

const Part1 = (input: string): number => {
  const PipeMap = GetPipeMap(input);
  const Input = GetInput(input);
  const { puzzle, direction } = InitPuzzle(Input, PipeMap);
  let total = 0;
  const directionCache = buildDirectionCache(PipeMap);
  const solutionMap = FollowPipe(
    puzzle[0].x,
    puzzle[0].y,
    Input,
    PipeMap,
    direction,
    total,
    directionCache
  );
  const steps = solutionMap % 2 === 0 ? solutionMap / 2 : (solutionMap - 1) / 2;
  return steps;
};

console.log(Part1(INPUT));
