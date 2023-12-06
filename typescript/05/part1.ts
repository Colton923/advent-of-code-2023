import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./05/input.txt', 'utf8');
const TEST_INPUT = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
const MAPS = [
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location',
];
type ProductionMap = {
  DestinationRangeStart: number;
  SourceRangeStart?: number;
  RangeLength: number;
};

type Range = {
  rangeStart: number;
  rangeEnd: number;
};

const ProductionMapMaker = (input: string): ProductionMap => {
  const nums = input.split(' ').map((num: string) => {
    return parseInt(num);
  });
  return {
    DestinationRangeStart: nums[0],
    SourceRangeStart: nums[1],
    RangeLength: nums[2],
  };
};

// Only Line 1 of Input
const GetSeeds = (input: string): number[] => {
  return input
    .split(':')[1]
    .trim()
    .split(' ')
    .map((seedNumber: string) => {
      return parseInt(seedNumber);
    });
};

const GetMap = (input: string, mapDesired: string): ProductionMap[] => {
  const init = input.split(mapDesired + ' map:')[1];
  const nextMapIndex = MAPS.findIndex((value: string) => {
    return value === mapDesired;
  });
  let nextMap = '';
  if (nextMapIndex === MAPS.length) {
    nextMap = MAPS[nextMapIndex];
  } else {
    nextMap = MAPS[nextMapIndex + 1];
  }
  if (nextMap === mapDesired) {
    const lines = init.split('\n').map((line: string) => {
      if (line !== '') return line.trim();
    });
    return lines.map((line: string) => {
      return ProductionMapMaker(line);
    });
  }
  const mapArea = init.split(nextMap + ' map:')[0];
  const lines = mapArea.split('\n').filter((line: string) => {
    if (line !== '') return line.trim();
  });
  return lines.map((line: string) => {
    return ProductionMapMaker(line);
  });
};

const GetDestinationRange = (prodMap: ProductionMap): Range => {
  return {
    rangeStart: prodMap.DestinationRangeStart,
    rangeEnd: prodMap.DestinationRangeStart + prodMap.RangeLength - 1,
  };
};

const GetSourceRange = (prodMap: ProductionMap): Range => {
  return {
    rangeStart: prodMap.SourceRangeStart,
    rangeEnd: prodMap.SourceRangeStart + prodMap.RangeLength - 1,
  };
};

const GetMappedSourceValue = (
  destinationRange: Range,
  sourceRange: Range,
  value: number
): number | false => {
  if (value >= sourceRange.rangeStart && value <= sourceRange.rangeEnd) {
    return destinationRange.rangeStart - sourceRange.rangeStart + value;
  } else {
    return false;
  }
};

const GetNextValue = (value: number, prodMaps: ProductionMap[]): number => {
  let returnValue = value;
  prodMaps.map((prodMap: ProductionMap) => {
    const destinationRange = GetDestinationRange(prodMap);
    const sourceRange = GetSourceRange(prodMap);
    const isValueSourceable = GetMappedSourceValue(
      destinationRange,
      sourceRange,
      value
    );
    if (isValueSourceable) {
      returnValue = isValueSourceable;
    }
  });
  return returnValue;
};

const GetLocation = (
  seed: number,
  maps: ProductionMap[][],
  index: number
): number => {
  const value = GetNextValue(seed, maps[index]);

  if (index + 1 === maps.length) {
    return value;
  } else {
    return GetLocation(value, maps, index + 1);
  }
};

const GetAllLocations = (seeds: number[], input: string) => {
  const productionMaps = MAPS.map((mapName: string) => {
    return GetMap(input, mapName);
  });
  return seeds.map((seed: number) => {
    return GetLocation(seed, productionMaps, 0);
  });
};

const Part1 = (input: string) => {
  const seeds = GetSeeds(input.split('\n')[0]);
  return GetAllLocations(seeds, input).reduce((a, b) => {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  });
};

// console.log(Part1(TEST_INPUT));

writeFileSync('./05/output_05_part1.txt', Part1(INPUT).toString(), 'utf-8');

export { GetAllLocations, GetSeeds };
