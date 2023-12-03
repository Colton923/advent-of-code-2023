import { readFileSync, writeFileSync } from 'fs';
import type { Color, SetColor, Game } from './part1';
import { GameMaker } from './part1';

const INPUT = readFileSync('./02/input.txt', 'utf8').split('\n');

const MinimumColor = (
  oldColor: Partial<SetColor>,
  newColor: Partial<SetColor>
): Partial<SetColor> => {
  const key = Object.keys(newColor)[0] as Color;
  if (oldColor[key] >= newColor[key]) {
    return oldColor;
  }
  return newColor;
};

const MVPs = (game: Game): SetColor => {
  const NewSet: SetColor = game.sets.reduce(
    (oldSet: SetColor, newSet: SetColor) => {
      Object.keys(newSet).forEach((key: Color) => {
        oldSet[key] = MinimumColor(
          { [key]: oldSet[key] },
          { [key]: newSet[key] }
        )[key];
      });
      return oldSet;
    },
    {
      blue: 0,
      red: 0,
      green: 0,
    }
  );
  return NewSet;
};

const PowerCalculator = (set: SetColor): number => {
  return Object.keys(set).reduce((total: number, key: Color) => {
    return total * set[key];
  }, 1);
};

const result = INPUT.map((input: string) => {
  const game = GameMaker(input);
  const mvp = MVPs(game);
  return PowerCalculator(mvp);
}).reduce((total: number, power: number) => {
  return total + power;
}, 0);

writeFileSync('./02/output_02_part2.txt', result.toString(), 'utf-8');
