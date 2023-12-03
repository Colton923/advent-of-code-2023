import { readFileSync, writeFileSync } from 'fs';

const INPUT_01 = readFileSync('./01/input.txt', 'utf8').split('\n');
const REGEX =
  /0|1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine/g;
const MAP: { [key: string]: string } = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const makeArr = (input: string): string[] => {
  return input.match(REGEX) || [];
};

const makeNumber = (input: string[], index: number): string => {
  if (input[index].charAt(2) !== '') {
    return MAP[input[index]];
  } else {
    return input[index];
  }
};

const result = INPUT_01.map((input: string) => {
  const firstNumber = makeNumber(makeArr(input), 0);
  const secondNumber = makeNumber(makeArr(input), makeArr(input).length - 1);
  return parseInt(firstNumber.concat(secondNumber));
}).reduce((a: number, b: number) => a + b);

writeFileSync('./01/output_01_part2.txt', result.toString(), 'utf-8');
