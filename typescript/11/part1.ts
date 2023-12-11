import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./11/input.txt', 'utf8');
const TEST_INPUT = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const GetInput = (input: string): string[][] => {
  return input.split('\n').map((x) => x.split(''));
};

const transpose = (matrix: string[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

const ExpandInput = (input: string[][]) => {
  const galaxy = '#';
  const newInput = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].includes(galaxy)) {
      const newInputRow = input[i];
      newInput.push(newInputRow);
    } else {
      const newInputRow = input[i];
      newInput.push(newInputRow);
      newInput.push(newInputRow);
    }
  }
  const transposeInput = transpose(newInput);
  const newerInput = [];
  for (let i = 0; i < transposeInput.length; i++) {
    if (transposeInput[i].includes(galaxy)) {
      newerInput.push(transposeInput[i]);
    } else {
      newerInput.push(transposeInput[i]);
      newerInput.push(transposeInput[i]);
    }
  }
  const finalInput = transpose(newerInput);
  return finalInput;
};

type GalaxyLocation = {
  x: number;
  y: number;
};

const GetGalaxyMap = (input: string[][]): Map<number, GalaxyLocation> => {
  const galaxyMap = new Map<number, GalaxyLocation>();
  let galaxyCount = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === '#') {
        galaxyMap.set(galaxyCount, { x: j, y: i });
        galaxyCount++;
      }
    }
  }
  return galaxyMap;
};

// pair unique GalaxyNumber to GalaxyNumber
const GetPairs = (galaxyMap: Map<number, GalaxyLocation>) => {
  const galaxyNumbers = Array.from(galaxyMap.keys());
  const uniquePairs: [number, number][] = [];

  for (let i = 0; i < galaxyNumbers.length; i++) {
    for (let j = i + 1; j < galaxyNumbers.length; j++) {
      uniquePairs.push([galaxyNumbers[i], galaxyNumbers[j]]);
    }
  }

  return uniquePairs;
};

const GetTaxiCabDistance = (
  galaxy1: GalaxyLocation,
  galaxy2: GalaxyLocation
) => {
  return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
};

const Part1 = (input: string[][]) => {
  const galaxyMap = GetGalaxyMap(ExpandInput(input));
  const pairs = GetPairs(galaxyMap);
  let totalDistance = 0;
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const galaxy1 = galaxyMap.get(pair[0]) as GalaxyLocation;
    const galaxy2 = galaxyMap.get(pair[1]) as GalaxyLocation;
    totalDistance += GetTaxiCabDistance(galaxy1, galaxy2);
  }
  return totalDistance;
};

console.log(Part1(GetInput(INPUT)));
