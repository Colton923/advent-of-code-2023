import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./04/input.txt', 'utf8');
const TEST_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const Score = (winningNumbers: number): number => {
  if (winningNumbers === 0) {
    return 0;
  } else {
    let score = 1;
    for (let i = 1; i < winningNumbers; i++) {
      score *= 2;
    }
    return score;
  }
};

type CardNumbers = Set<number>;
type Game = {
  WinningNumbers: CardNumbers;
  YourNumbers: CardNumbers;
  GameNumber: number;
};

const ReadCard = (card: string): Game => {
  const cardLine = card.split('Card ');
  const GameNumber = parseInt(cardLine[1].split(':')[0]);
  const firstNumbers = cardLine[1]
    .split(':')[1]
    .split('|')[0]
    .trim()
    .split(' ')
    .map((number: string) => parseInt(number))
    .filter((number) => !isNaN(number));
  const secondNumbers = cardLine[1]
    .split(':')[1]
    .split('|')[1]
    .trim()
    .split(' ')
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number));
  const WinningNumbers = new Set(firstNumbers);
  const YourNumbers = new Set(secondNumbers);
  return { WinningNumbers, YourNumbers, GameNumber };
};

const PlayGame = (game: Game): number => {
  let wins = 0;
  game.WinningNumbers.forEach((number) => {
    if (game.YourNumbers.has(number)) {
      wins++;
    }
  });
  return wins;
};

const Part1 = (input: string): number => {
  const games = input.split('\n').map((card) => ReadCard(card));
  const wins = games.map((game) => PlayGame(game));
  const score = wins.map((win) => Score(win));
  return score.reduce((a, b) => a + b);
};

writeFileSync('./04/output_04_part1.txt', Part1(INPUT).toString(), 'utf-8');
