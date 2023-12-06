import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./03/input.txt', 'utf8');
const TEST_INPUT = `.....487.599...........411...........................................574..679.136..........................30......255.......432............
....*......*............*..........&586..........................375...@..*....../.....835.............610*........./...............582.....
...833........304...&.862...............203..........922.125...............819.............@....563.....................722..775............
..............+...994..........#.........*..244.457.....*...........867.........829.....469.....#...........................*...............
313.....753.....................596............*................270..../........*........................38.......836..850..914......942*215`;

const searchDirections = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

const schematic = (input: string): string[][] => {
  return input.split('\n').map((row) => row.split(''));
};
const possibleNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const FindNumbersInSchematicLine = (schematicLine: string[]) => {
  const schematicLineCharacters = schematicLine
    .map((character) => {
      if (possibleNumbers.includes(character)) {
        return parseInt(character);
      } else {
        return '';
      }
    })
    .join('.')
    .split('.');
  return schematicLineCharacters;
};

const FindAdjacentSymbolsToNumbers = (
  x: number,
  y: number,
  schematic: string[][]
) => {
  let adjacency: boolean = false;
  for (let i = 0; i < searchDirections.length; i++) {
    const direction = searchDirections[i];
    if (y + direction.y < 0 || y + direction.y > schematic.length - 1) {
      continue;
    }
    if (x + direction.x < 0 || x + direction.x > schematic[0].length - 1) {
      continue;
    }
    const yDirection = y + direction.y;
    const xDirection = x + direction.x;
    const symbol = schematic[yDirection][xDirection];
    if (symbol.match(/[0-9]/) === null && symbol !== '.') {
      adjacency = true;
      break;
    }
  }
  return adjacency;
};

type gear = {
  location: { x: number; y: number }[];
  value: number;
};

const test = schematic(INPUT).map((line, x) => {
  const Numbers = FindNumbersInSchematicLine(line);
  let newNumbers: gear[] = [];

  for (let y = 0; y < Numbers.length; y++) {
    let newNumber: gear = {
      location: [],
      value: 0,
    };
    let tempValue = '';
    const number = Numbers[y];
    if (number !== '') {
      tempValue += number;
      newNumber.location.push({ x: y, y: x });
      for (let z = y + 1; z < Numbers.length; z++) {
        const nextNumber = Numbers[z];
        if (nextNumber !== '') {
          tempValue += nextNumber;
          newNumber.location.push({ x: z, y: x });
        } else {
          y = z;
          newNumber.value = parseInt(tempValue);
          newNumbers.push(newNumber);
          break;
        }
      }
    } else {
      continue;
    }
  }

  const totals = newNumbers.map((number) => {
    const schema = schematic(INPUT);
    const adjacency = number.location.map((location) => {
      const adj = FindAdjacentSymbolsToNumbers(location.x, location.y, schema);
      return adj;
    });
    const anyAdjacent = adjacency.some((adj) => adj === true);
    return anyAdjacent ? number.value : 0;
  });
  const finalValue = totals.reduce((acc, cur) => acc + cur, 0);
  return finalValue;
});

const finalValue = test.reduce((acc, cur) => acc + cur, 0);
console.log(finalValue);