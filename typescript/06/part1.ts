import { writeFileSync } from 'fs';

const INPUT = `Time:        61     70     90     66
Distance:   643   1184   1362   1041`;
const TEST_INPUT = `Time:      7  15   30
Distance:  9  40  200`;

type Race = {
  time: number;
  recordDistance: number;
};

const TestInput: Race[] = [
  { time: 7, recordDistance: 9 },
  { time: 15, recordDistance: 40 },
  { time: 30, recordDistance: 200 },
];

const Input: Race[] = [
  { time: 61, recordDistance: 643 },
  { time: 70, recordDistance: 1184 },
  { time: 90, recordDistance: 1362 },
  { time: 66, recordDistance: 1041 },
];

const AverageSpeed = (time: number, distance: number): number => {
  return distance / time;
};

const CalculateTimes = (
  averageSpeed: number,
  totalRaceLengthTime: number,
  distanceCovered: number
) => {
  let timeIntervals: number[] = [];

  for (let i = 0; i < totalRaceLengthTime; i++) {
    timeIntervals.push(i);
  }
  const first = timeIntervals.find((time) => {
    const timeLeft = totalRaceLengthTime - time;
    const timeSpentCharging = time;
    const newSpeed = timeSpentCharging * 1;
    const newDistanceCovered = timeLeft * newSpeed;
    const newAverageSpeed = AverageSpeed(timeLeft, newDistanceCovered);
    if (newAverageSpeed > averageSpeed) {
      if (newDistanceCovered > distanceCovered) {
        return time;
      }
    }
  });
  timeIntervals.reverse();
  const last = timeIntervals.find((time) => {
    const timeLeft = totalRaceLengthTime - time;
    const timeSpentCharging = time;
    const newSpeed = timeSpentCharging * 1;
    const newDistanceCovered = timeLeft * newSpeed;
    const newAverageSpeed = AverageSpeed(timeLeft, newDistanceCovered);
    if (newAverageSpeed > averageSpeed) {
      if (newDistanceCovered > distanceCovered) {
        return time;
      }
    }
  });

  return {
    first,
    last,
  };
};

const CountTimes = (first: number, last: number) => {
  let count = 0;
  for (let i = first; i <= last; i++) {
    count++;
  }
  return count;
};

const Part1 = (input: Race[]) => {
  let count = 1;
  input.map((race) => {
    const avgSpeed = race.recordDistance / race.time;
    const { first, last } = CalculateTimes(
      avgSpeed,
      race.time,
      race.recordDistance
    );
    const timeCount = CountTimes(first, last);
    count *= timeCount;
  });
  return count;
};

writeFileSync('./06/output_06_part1.txt', Part1(Input).toString(), 'utf-8');
