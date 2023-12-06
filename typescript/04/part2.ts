import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./04/input.txt', 'utf8');
const TEST_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

type CardNumbers = Set<number>;
type Game = {
  WinningNumbers: CardNumbers;
  YourNumbers: CardNumbers;
  GameNumber: number;
  Wins: number;
  RemainingPlays: number;
};

let Games = new Map<number, Game>();

const InitGameMap = (
  GameNumber: number,
  WinningNumbers: CardNumbers,
  YourNumbers: CardNumbers
) => {
  Games.set(GameNumber, {
    WinningNumbers,
    YourNumbers,
    Wins: 0,
    GameNumber,
    RemainingPlays: 1,
  });
};

const ReadCard = (card: string) => {
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
  InitGameMap(GameNumber, WinningNumbers, YourNumbers);
};

const UpdateGameRemainingPlays = (GameNumber: number) => {
  const game = Games.get(GameNumber);
  game.RemainingPlays += 1;
  Games.set(GameNumber, game);
};

const UpdateGameTotalWins = (GameNumber: number, wins: number) => {
  const game = Games.get(GameNumber);
  game.Wins += wins;
  Games.set(game.GameNumber, {
    ...game,
    RemainingPlays: game.RemainingPlays - 1,
  });
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

const Part2 = (input: string): number => {
  let score = 0;
  let nextGame = 1;
  input.split('\n').map((card) => ReadCard(card));
  let continuePlaying = true;
  while (continuePlaying) {
    score += 1;
    const game = Games.get(nextGame);
    const wins = PlayGame(game);
    UpdateGameTotalWins(nextGame, wins);
    if (wins > 0) {
      for (let i = 0; i < wins; i++) {
        UpdateGameRemainingPlays(nextGame + i + 1);
      }
    }
    if (Games.get(nextGame).RemainingPlays === 0) {
      nextGame += 1;
    }
    if (Games.get(nextGame) === undefined) {
      continuePlaying = false;
    }
  }
  return score;
};

writeFileSync('./04/output_04_part1.txt', Part2(INPUT).toString(), 'utf-8');
