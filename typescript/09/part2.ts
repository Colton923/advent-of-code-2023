import { readFileSync, writeFileSync } from "fs";

const INPUT = readFileSync("./09/input.txt", "utf8");

const TEST_INPUT = `10 13 16 21 30 45
10 13 16 21 30 45`;

type Level = number[];
type Report = Level[];
type Structure = Map<Level, Level[]>;

const ReadInput = (input: string): Report => {
  const split = input.split("\n");
  const lines = split.map((line: string) => {
    return line.split(" ").map((str: string) => {
      return parseInt(str);
    });
  });

  return lines;
};

const IncreaseLevel = (levelZero: Level, levelOne: Level): Level => {
  const next = levelZero[levelOne.length + 1] - levelZero[levelOne.length];
  levelOne.push(next);
  return levelOne;
};

const IncreaseDepth = (levels: Report): Report => {
  const nextLevel: Level = [];
  const lastLevel = levels[levels.length - 1];
  if (lastLevel.length > 1) {
    const lastLevelNum = lastLevel[1] - lastLevel[0];

    nextLevel.push(lastLevelNum);
  }
  levels.push(nextLevel);
  return levels;
};

const Loop = (input: Report) => {
  let report = input;
  let currLevel = report[report.length - 2];
  let lastLevel = report[report.length - 1];
  let exitCondition = false;
  if (
    lastLevel.length === currLevel.length - 1 &&
    lastLevel.every((int) => int === 0)
  ) {
    return report;
  } else {
    if (lastLevel.length === currLevel.length - 1) {
      report = IncreaseDepth(report);
    } else {
      lastLevel = IncreaseLevel(currLevel, lastLevel);
      report[report.length - 1] = lastLevel;
    }
  }
  return Loop(report);
};

const NextNumber = (input: Report) => {
  const depth = input.length;
  let val = 0;
  for (let i = depth; i > 0; i--) {
    val = input[i - 1][0] - val;
  }
  return val;
};

const GetValues = (input: Report) => {
  let report = IncreaseDepth(input);
  report = Loop(report);
  const val = NextNumber(report);
  return val;
};

const Part2 = (input: string) => {
  const init = ReadInput(input);
  let val = 0;
  for (let i = 0; i < init.length; i++) {
    const newReport = [init[i]];
    val += GetValues(newReport);
  }
  return val;
};

console.log(Part2(INPUT));
