import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./03/input.txt', 'utf8').split('\n');
const TEST_INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split('\n');
type Point = {
  value: string;
  x: number;
  y: number;
};

type Map = Point[][];
const maxY = (InputMap: Map) => {
  return InputMap.length - 1;
};
const maxX = (InputMap: Map) => {
  return InputMap[0].length - 1;
};

const MapMaker = (input: string[]): Map => {
  const map: Map = [];
  input.forEach((line: string, y: number) => {
    line.split('').forEach((char: string, x: number) => {
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = {
        value: char,
        x,
        y,
      };
    });
  });
  return map;
};

const IsSymbol = (char: string): boolean => {
  return char !== '.' && char.match(/[0-9]/) === null;
};

const IsNumber = (char: string): boolean => {
  return char.match(/[0-9]/) !== null;
}

const LocalPossibilities = (point: Point, map: Map): Point[] => {
  const Pos_Y_Direction = maxY(map) - point.y > 0 ? 1 : 0;
  const Neg_Y_Direction = point.y > 0 ? 1 : 0;
  const Pos_X_Direction = maxX(map) - point.x > 0 ? 1 : 0;
  const Neg_X_Direction = point.x > 0 ? 1 : 0;
  const LocalMap: Point[] = [];
  for (let y = point.y - Neg_Y_Direction; y <= point.y + Pos_Y_Direction; y++) {
    for (
      let x = point.x - Neg_X_Direction;
      x <= point.x + Pos_X_Direction;
      x++
    ) {
      LocalMap.push(map[y][x]);
    }
  }
  return LocalMap;
};

const Hit_SearchY = (point: Point, map: Map): boolean => {
  const Pos_Y_Direction = maxY(map) - point.y
  const Neg_Y_Direction = point.y
  const SearchArray: number[] = []
  
  for (let y = point.y - Neg_Y_Direction; y <= point.y + Pos_Y_Direction; y++) {
    if (IsNumber(map[y][point.x].value)) {
      
    }
  }

const TestLoop = (): boolean => {
  const MadeMap = MapMaker(TEST_INPUT);
  MadeMap.map((line: Point[]) => {
    if (
      line.map((point: Point) => {
        if (point.value === '*') {
          const localMap = LocalPossibilities(point, MadeMap);
        
        }
      })
    )
      return;
  });
  return;
};

TestLoop();
