const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

const ENERGY = { A: 1, B: 10, C: 100, D: 100 };
const HOMES = { A: 3, B: 5, C: 7, D: 9 };
const DIRECTION = { N: "n", E: "e", S: "s", W: "w" };
let hall = "...........".split("");

let roomIndex = [3, 5, 7, 9];

function implementation(lines) {
  let board = lines.map((line) =>
    line.split("").map((c) => (c == " " ? "#" : c))
  );
  Arr.print2d(board);
  console.log(board);
  return findSpaces(board);
}

function getSpot([i, j], board) {
  return board[i][j];
}

function findShortestSpace(pos, board) {
  let available = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      let spt = board[i][j];

      if (spt === ".") {
        // Check below.
        if (i == 1 && getSpot([i + 1, j]) == "#") available.push([i, j]);
      }
    }
  }
  return available;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
