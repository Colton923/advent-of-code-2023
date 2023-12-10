import { readFileSync, writeFileSync } from 'fs';

const INPUT = readFileSync('./07/input.txt', 'utf8');

const TEST_INPUT = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;

type InputHand = {
  bet: number;
  hand: [string, string, string, string, string];
};
type Hand = {
  bet: number;
  hand: [number, number, number, number, number];
};

const getHand = (hand: InputHand): Hand => {
  const Convert = hand.hand.map((card) => {
    if (card === 'A') return 14;
    if (card === 'K') return 13;
    if (card === 'Q') return 12;
    if (card === 'J') return 1;
    if (card === 'T') return 10;
    return parseInt(card);
  });
  return {
    bet: hand.bet,
    hand: Convert as [number, number, number, number, number],
  };
};

const IsFiveOfAKind = (hand: Hand): boolean => {
  return hand.hand.some(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) return true;
        return c === card;
      }).length === 5
  );
};
const IsFourOfAKind = (hand: Hand): boolean => {
  return hand.hand.some(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) return true;
        return c === card;
      }).length === 4
  );
};
const IsFullHouse = (hand: Hand): boolean => {
  const three = hand.hand.find(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) {
          return true;
        }
        return c === card;
      }).length === 3
  );
  if (!three) return false;
  const two = hand.hand.find(
    (card) =>
      card !== three &&
      card !== 1 &&
      hand.hand.filter((c) => c === card).length === 2
  );
  if (!two) return false;
  return true;
};
const IsThreeOfAKind = (hand: Hand): boolean => {
  const isFullHouse = IsFullHouse(hand);
  if (isFullHouse) return false;
  return hand.hand.some(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) return true;
        return c === card;
      }).length === 3
  );
};
const IsTwoPairs = (hand: Hand): boolean => {
  const firstPairCard = hand.hand.find(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) return true;
        return c === card;
      }).length === 2
  );
  if (!firstPairCard) return false;
  const secondPairCard = hand.hand.find(
    (card) =>
      card !== firstPairCard && hand.hand.filter((c) => c === card).length === 2
  );
  if (!secondPairCard) return false;
  return true;
};
const IsOnePair = (hand: Hand): boolean => {
  const onePair = hand.hand.find(
    (card) =>
      hand.hand.filter((c) => {
        if (c === 1) return true;
        return c === card;
      }).length === 2
  );
  if (!onePair) return false;
  const restOfCards = hand.hand.filter((card) => card !== onePair);
  const restOfCardsAreUnique = restOfCards.every(
    (card) => restOfCards.filter((c) => c === card).length === 1
  );
  return restOfCardsAreUnique;
};
const IsHighCard = (hand: Hand): boolean => {
  const isUniqueHand = hand.hand.every(
    (card) => hand.hand.filter((c) => c === card).length === 1
  );
  return isUniqueHand;
};

const IsHigherCard = (handOne: Hand, handTwo: Hand): Hand | false => {
  // first index that is higher wins
  for (let i = 0; i < 5; i++) {
    if (handOne.hand[i] > handTwo.hand[i]) return handOne;
    if (handOne.hand[i] < handTwo.hand[i]) return handTwo;
  }
  return false;
};

const SortSameHands = (hands: Hand[]): Hand[] => {
  const Sorted = hands.sort((a, b) => {
    const higher = IsHigherCard(a, b);
    if (higher) {
      return higher === a ? -1 : 1;
    }
    return 0;
  });
  return Sorted;
};
const FilterFives = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const fives = hands.filter((hand) => IsFiveOfAKind(hand));
  const sortedFives = SortSameHands(fives);
  const everyThingElse = hands.filter((hand) => !IsFiveOfAKind(hand));
  console.log('sortedFives', sortedFives);
  console.log('everyThingElse', everyThingElse);
  return { goodHands: [...sortedFives], badHands: [...everyThingElse] };
};

const FilterFours = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const fours = hands.filter((hand) => IsFourOfAKind(hand));
  const sortedFours = SortSameHands(fours);
  const everyThingElse = hands.filter((hand) => !IsFourOfAKind(hand));
  return { goodHands: [...sortedFours], badHands: [...everyThingElse] };
};

const FilterFullHouses = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const fullHouses = hands.filter((hand) => IsFullHouse(hand));
  const sortedFullHouses = SortSameHands(fullHouses);
  const everyThingElse = hands.filter((hand) => !IsFullHouse(hand));
  return { goodHands: [...sortedFullHouses], badHands: [...everyThingElse] };
};

const FilterThrees = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const threes = hands.filter((hand) => IsThreeOfAKind(hand));
  const sortedThrees = SortSameHands(threes);
  const everyThingElse = hands.filter((hand) => !IsThreeOfAKind(hand));
  return { goodHands: [...sortedThrees], badHands: [...everyThingElse] };
};

const FilterTwoPairs = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const twoPairs = hands.filter((hand) => IsTwoPairs(hand));
  const sortedTwoPairs = SortSameHands(twoPairs);
  const everyThingElse = hands.filter((hand) => !IsTwoPairs(hand));
  return { goodHands: [...sortedTwoPairs], badHands: [...everyThingElse] };
};

const FilterOnePairs = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const onePairs = hands.filter((hand) => IsOnePair(hand));
  const sortedOnePairs = SortSameHands(onePairs);
  const everyThingElse = hands.filter((hand) => !IsOnePair(hand));
  return { goodHands: [...sortedOnePairs], badHands: [...everyThingElse] };
};

const FilterHighCards = (
  hands: Hand[]
): {
  goodHands: Hand[];
  badHands: Hand[];
} => {
  const highCards = hands.filter((hand) => IsHighCard(hand));
  const sortedHighCards = SortSameHands(highCards);
  const everyThingElse = hands.filter((hand) => !IsHighCard(hand));
  return { goodHands: [...sortedHighCards], badHands: [...everyThingElse] };
};

const Filters = (hands: Hand[]): Hand[] => {
  const { goodHands: fives, badHands: notFives } = FilterFives(hands);
  const { goodHands: fours, badHands: notFours } = FilterFours(notFives);
  const { goodHands: fullHouses, badHands: notFullHouses } =
    FilterFullHouses(notFours);
  const { goodHands: threes, badHands: notThrees } =
    FilterThrees(notFullHouses);
  const { goodHands: twoPairs, badHands: notTwoPairs } =
    FilterTwoPairs(notThrees);
  const { goodHands: onePairs, badHands: notOnePairs } =
    FilterOnePairs(notTwoPairs);
  const { goodHands: highCards, badHands: notHighCards } =
    FilterHighCards(notOnePairs);
  const Filtered = [
    ...fives,
    ...fours,
    ...fullHouses,
    ...threes,
    ...twoPairs,
    ...onePairs,
    ...highCards,
  ];
  return Filtered;
};

const Inputs = (input: string): InputHand[] => {
  const inputArr = input.split('\n');
  const hands = inputArr.map((line) => line.split(' '));
  const Converted = hands.map((hand) => {
    const bet = parseInt(hand[1]);
    const cards = hand[0].split('');
    return { bet, hand: cards };
  });
  return Converted as InputHand[];
};

const ConvertInputs = (hands: InputHand[]): Hand[] => {
  const Converted = hands.map((hand) => getHand(hand));
  return Converted;
};

const ConvertBet = (hands: Hand[]): number => {
  const OrderedHands = hands.reverse();
  return OrderedHands.reduce((acc, hand, index) => {
    return (acc += hand.bet * (index + 1));
  }, 0);
};

const Solve = (input: string): number => {
  const hands = ConvertInputs(Inputs(input));
  const filteredHands = Filters(hands);
  const bet = ConvertBet(filteredHands);
  return bet;
};

console.log(Solve(INPUT));
