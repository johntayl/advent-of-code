const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines = []) {
  let result = "FAIL";

  let p1 = 6;
  let p2 = 2;
  let allGames = {};
  let currentGames = 1;
  let p1win = 0;
  let p2win = 0;
  allGames[p1 + "," + 0 + "," + p2 + "," + 0] = 1;

  while (currentGames > 0) {
    let p1State = {};
    for (let state in allGames) {
      let games = allGames[state];

      currentGames -= games;

      let [pos, val, enemyPos, enemyVal] = state.split(",").map(Number);

      for (let roll1 of [1, 2, 3]) {
        for (let roll2 of [1, 2, 3]) {
          for (let roll3 of [1, 2, 3]) {
            let sum = roll1 + roll2 + roll3;
            let newPos = pos + sum;
            while (newPos > 10) newPos -= 10;
            let newVal = val + newPos;

            if (newVal >= 21) {
              p1win += games;
            } else {
              p1State[newPos + "," + newVal + "," + enemyPos + "," + enemyVal] =
                (p1State[
                  newPos + "," + newVal + "," + enemyPos + "," + enemyVal
                ] || 0) + games;
              currentGames += games;
            }
          }
        }
      }
    }

    allGames = p1State;

    // p2 turn
    let p2State = {};
    for (let state in allGames) {
      let games = allGames[state];

      currentGames -= games;

      let [enemyPos, enemyVal, pos, val] = state.split(",").map(Number);

      for (let roll1 of [1, 2, 3]) {
        for (let roll2 of [1, 2, 3]) {
          for (let roll3 of [1, 2, 3]) {
            let sum = roll1 + roll2 + roll3;
            let newPos = pos + sum;
            while (newPos > 10) newPos -= 10;
            let newVal = val + newPos;

            if (newVal >= 21) {
              p2win += games;
            } else {
              p2State[enemyPos + "," + enemyVal + "," + newPos + "," + newVal] =
                (p2State[
                  enemyPos + "," + enemyVal + "," + newPos + "," + newVal
                ] || 0) + games;
              currentGames += games;
            }
          }
        }
      }
    }
    allGames = p2State;
  }

  console.log("p1 wins", p1win);
  console.log("p2 wins", p2win);
  return p1win - p2win;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
