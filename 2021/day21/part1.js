const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines = []) {
  let result = "FAIL";

  const [score1, score2, rolls] = playGame();

  return [score1, score2, rolls, Math.min(score1, score2) * rolls];
}

function playGame() {
  let score1 = 0;
  let score2 = 0;

  let p1Pos = 6;
  let p2Pos = 2;

  let rolls = 0;

  let turns = [1, 2];

  let lastRoll = 0;

  while (true) {
    let [one, two, three, last] = roll(lastRoll);
    let i = one + two + three;
    lastRoll = last;
    rolls += 3;

    let turn = turns[0];
    turns.push(turns.shift());

    let singleRoll =
      i.toString().length >= 1
        ? parseInt(i.toString()[i.toString().length - 1])
        : i;
    let orgp1 = p1Pos;
    let orgp2 = p2Pos;

    if (turn == 1) {
      p1Pos += singleRoll;

      if (p1Pos > 10) {
        let rem = p1Pos % 10;
        if (rem == 0) {
          rem = 1;
        }
        p1Pos = rem;
      }

      score1 += p1Pos;
    } else if (turn == 2) {
      p2Pos += singleRoll;

      if (p2Pos > 10) {
        let rem = p2Pos % 10;

        if (rem == 0) {
          rem = 1;
        }
        p2Pos = rem;
      }

      score2 += p2Pos;
    }

    console.log(
      "Player",
      turn,
      "rolls",
      [one, two, three],
      `(${i})`,
      `and moves from ${turn == 1 ? orgp1 : orgp2} to space`,
      turn == 1 ? p1Pos : p2Pos,
      "for a total score of",
      turn == 1 ? score1 : score2
    );

    if (score1 >= 1000 || score2 >= 1000) {
      return [score1, score2, rolls];
    }
  }

  return null;
}

function roll(lastRoll) {
  if (lastRoll == 98) {
    return [lastRoll + 1, lastRoll + 2, 1, 1];
  }

  if (lastRoll == 99) {
    return [lastRoll + 1, 1, 2, 2];
  }
  if (lastRoll == 100) {
    return [1, 2, 3, 3];
  }

  return [lastRoll + 1, lastRoll + 2, lastRoll + 3, lastRoll + 3];
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
