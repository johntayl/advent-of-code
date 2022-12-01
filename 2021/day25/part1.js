const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  let board = lines.map((line) => line.split(""));
  let step = 1;
  let moreMoves = false;

  do {
    // for (let i = 1; i <= 2; i++) {
    let hasEastMove = checkEast(board);
    if (hasEastMove) {
      board = makeMoves(board, ">");
    }

    let hasSouthMove = checkSouth(board);
    if (hasSouthMove) {
      board = makeMoves(board, "v");
    }

    step++;
    console.log(`After ${step} steps:`);
    // Arr.print2d(board);

    // check if there is another move after this one?
    moreMoves = checkEast(board) || checkSouth(board);
    // }
  } while (moreMoves);

  return step;
}

function getSpot([x, y], board) {
  return board[y][x];
}

function nextEast([x, y], board) {
  let nextX = x == board[0].length - 1 ? 0 : x + 1;
  let nextY = y;
  let spot = board[y][x];
  let nextSpot = board[nextY][nextX];

  if (spot == ">" && nextSpot == ".") {
    return {
      x: nextX,
      y: nextY
    };
  }

  return false;
}

function nextSouth([x, y], board) {
  let nextX = x;
  let nextY = y == board.length - 1 ? 0 : y + 1;
  let spot = board[y][x];
  let nextSpot = board[nextY][nextX];

  if (spot == "v" && nextSpot == ".") {
    return {
      x: nextX,
      y: nextY
    };
  }

  return false;
}

function checkEast(board) {
  // check to the right.
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (getSpot([j, i], board) == ">") {
        let nextSpot = nextEast([j, i], board);

        // stop on first true move spot
        if (nextSpot) return true;
      }
    }
  }

  return false;
}

function checkSouth(board) {
  // check to the south.
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (getSpot([j, i], board) == "v") {
        let nextSpot = nextSouth([j, i], board);

        // stop on first true move spot
        if (nextSpot) return true;
      }
    }
  }

  return false;
}

function makeMoves(board, turn) {
  if (turn == ">") {
    let old = [];
    let news = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        let next = nextEast([j, i], board);
        if (next) {
          old.push([j, i]);
          news.push([next.x, next.y]);
        }
      }
    }

    old.map((o) => (board[o[1]][o[0]] = "."));
    news.map((n) => (board[n[1]][n[0]] = ">"));
  } else {
    let old = [];
    let news = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        let next = nextSouth([j, i], board);
        if (next) {
          old.push([j, i]);
          news.push([next.x, next.y]);
        }
      }
    }

    old.map((o) => (board[o[1]][o[0]] = "."));
    news.map((n) => (board[n[1]][n[0]] = "v"));
  }

  return board;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
