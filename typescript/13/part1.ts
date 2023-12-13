import { readFileSync, writeFileSync } from "fs";

const INPUT = readFileSync("./10/input.txt", "utf8");
const TEST_INPUT = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const ReadInput = (input: string) => {
  return input.split("\n\n").map((line: string) => line.split("\n"));
};

console.log(ReadInput(TEST_INPUT));
