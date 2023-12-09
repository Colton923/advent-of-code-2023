import { readFileSync, writeFileSync } from "fs";

const INPUT_08 = readFileSync("./08/input.txt", "utf8");
const TEST_INPUT = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
const directions = (input: string) => {
  return input.split("\n")[0];
};

const instructions = (input: string) => {
  return input
    .split("\n")
    .map((input: string, index: number) => {
      if (index === 0) return false;
      return input;
    })
    .filter((input: string | false) => {
      if (input !== false) {
        return input;
      }
    })
    .flatMap((input: string) => {
      return input.split("\r").flat();
    })
    .filter((input: string) => {
      if (input === "") return false;
      return true;
    })
    .map((input: string) => {
      const route: Route = {
        input: input.split("=")[0].trim(),
        output: {
          left: input.split("=")[1].split(",")[0].trim().replace("(", ""),
          right: input.split("=")[1].split(",")[1].trim().replace(")", ""),
        },
      };
      return route;
    });
};
type Route = {
  input: string;
  output: RouteRecurse;
};

type RouteRecurse = {
  left: string;
  right: string;
};

const FindNextDirection = (
  instruction: string,
  direction: string,
  maze: Route[]
) => {
  return maze.find((route: Route) => {
    if (route.input === instruction) {
      if (direction === "right") {
        return route.output.right;
      } else {
        return route.output.left;
      }
    }
  });
};
const FindZZZ = (
  input: string,
  directionMap: string[],
  map: Route[],
  originalDirections: string[]
) => {
  console.log("input", input);
  const z = FindNextDirection(input, directionMap[0], map);

  if (input === "ZZZ") return true;
  let newDirection = directionMap.splice(0, directionMap.length - 1);
  if (newDirection.length === 0) {
    newDirection = originalDirections;
  }

  return FindZZZ(newInput, newDirection, map, originalDirections);
};

const Part1 = (directions: string, instructions: Route[]) => {
  const directionsMap = directions.split("");
  const init = "AAA";
  const z = FindZZZ(init, directionsMap, instructions, directionsMap);
  return z;
};

console.log(Part1(directions(TEST_INPUT), instructions(TEST_INPUT)));
