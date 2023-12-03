import { readFileSync, writeFileSync } from 'fs';

export type Color = 'blue' | 'red' | 'green' | undefined;
export type SetColor = Record<Color, number>;
export type Game = {
  id: number;
  sets: SetColor[];
};

const INPUT = readFileSync('./02/input.txt', 'utf8').split('\n');
const TEST_SET: SetColor = {
  blue: 14,
  red: 12,
  green: 13,
};

const ColorMaker = (input: string): Partial<SetColor> => {
  const colorSplit = input.split(' ');
  const colorPart = colorSplit[1] as Color;
  const numberPart = parseInt(colorSplit[0]);

  return {
    [colorPart]: numberPart,
  };
};

const SetMaker = (input: Partial<SetColor>[]): SetColor => {
  return {
    blue: input.find((color: Partial<SetColor>) => color.blue)?.blue || 0,
    red: input.find((color: Partial<SetColor>) => color.red)?.red || 0,
    green: input.find((color: Partial<SetColor>) => color.green)?.green || 0,
  };
};

const GameMaker = (input: string): Game => {
  const split = input.split(':');
  const idPart = split[0];
  const miniGames = split[1].trim().split(';');

  const sets = miniGames.map((set: string) => {
    const colors = set.split(',').map((color: string) => {
      return ColorMaker(color.trim());
    });
    return SetMaker(colors);
  });

  return {
    id: parseInt(idPart.split(' ')[1]),
    sets: sets,
  };
};

const ColorTester = (color: Partial<SetColor>) => {
  const key = Object.keys(color)[0] as Color;
  if (TEST_SET[key] >= color[key]) {
    return true;
  }
};

const Result = (Games: Game[]): number => {
  let score = 0;

  Games.forEach((Game: Game) => {
    const test = Game.sets.reduce((fullSet: boolean, set: SetColor) => {
      return (
        fullSet &&
        Object.keys(set).reduce((acc: boolean, key: Partial<Color>) => {
          return acc && ColorTester({ [key]: set[key] });
        }, true)
      );
    }, true);

    if (test) {
      score += Game.id;
    }
  });

  return score;
};

const totalScore = Result(INPUT.map((input: string) => GameMaker(input)));

writeFileSync('./02/output_02_part1.txt', totalScore.toString(), 'utf-8');

export { ColorMaker, GameMaker, SetMaker };
