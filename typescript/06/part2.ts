import { writeFileSync } from 'fs';

const INPUT = `Time:        61709066
Distance:   643118413621041`;
const TEST_INPUT = `Time:      71530
Distance:  940200`;

type Race = {
  time: number;
  recordDistance: number;
};

const TestInput: Race[] = [{ time: 71530, recordDistance: 940200 }];

const Input: Race[] = [{ time: 61709066, recordDistance: 643118413621041 }];

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

const Part2 = (input: Race[]) => {
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

writeFileSync('./06/output_06_part2.txt', Part2(Input).toString(), 'utf-8');
