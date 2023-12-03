import input from './input';
import { writeFileSync } from 'fs';

const INPUT_01 = input.split('\n');
const REGEX = /[0-9]/g;

const makeArr = (input: string): string[] => {
  return input.match(REGEX) || [];
};

const makeNumber = (input: string[], index: number): string => {
  return input[index];
};

const concatNumber = (num1: string, num2: string): number => {
  return parseInt(num1.concat(num2));
};

const result = INPUT_01.map((input: string) => {
  const firstNumber = makeNumber(makeArr(input), 0);
  const secondNumber = makeNumber(makeArr(input), makeArr(input).length - 1);
  return concatNumber(firstNumber, secondNumber);
}).reduce((a: number, b: number) => a + b);

writeFileSync('output_01_part1.txt', result.toString(), 'utf-8');
