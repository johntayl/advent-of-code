// const data = require("./data");
const data = require("./data");

const calledNumbers = data.calledNumbers;

const boardInput = data.boards;

let lastNumber = null;

let boardsWon = [];
let boardsWonIndex = [];

function buildBoards(rows) {
  let boards = [[]];
  let lastBoard = 0;

  rows.forEach((row) => {
    const numbers = row.split(" ").filter((num) => num !== "");

    if (numbers.length === 0) {
      // new board
      boards.push([]);
      lastBoard++;
    } else {
      boards[lastBoard].push(
        numbers.map((num) => {
          return {
            value: num,
            selected: false
          };
        })
      );
    }
  });

  return boards;
}

function markNumber(board, calledNumber) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = board[i][j];

      if (cell.value === calledNumber) {
        cell.selected = true;
        return;
      }
    }
  }
}

function checkWin(board) {
  let rowWin = true;
  let colWin = true;

  // Row
  for (let i = 0; i < board.length; i++) {
    rowWin = true;
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (!cell.selected) {
        rowWin = false;
        break;
      }
    }

    if (rowWin) {
      return rowWin;
    }
  }

  // col
  for (let i = 0; i < board.length; i++) {
    colWin = true;
    for (let j = 0; j < board.length; j++) {
      const cell = board[j][i];
      if (!cell.selected) {
        colWin = false;

        break;
      }
    }

    if (colWin) {
      return colWin;
    }
  }

  return rowWin || colWin;
}

function implementation(data) {
  // Write here.
  let boards = buildBoards(boardInput);

  for (let i = 0; i < calledNumbers.length; i++) {
    const calledNumber = calledNumbers[i];

    for (j = 0; j < boards.length; j++) {
      const board = boards[j];

      if (boardsWonIndex.indexOf(j) >= 0) {
        continue;
      }

      markNumber(board, calledNumber);
      if (checkWin(board)) {
        boardsWon.push(boards[j]);
        boardsWonIndex.push(j);
        lastNumber = calledNumber;
      }
    }
  }

  return boardsWon[boardsWon.length - 1];
}

function filterUnmarked(board) {
  const unmarked = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = board[j][i];
      if (!cell.selected) {
        unmarked.push(parseInt(cell.value));
      }
    }
  }

  return unmarked;
}

function main() {
  console.time("speed");
  const result = implementation(data);

  const value = filterUnmarked(result).reduce((total, current) => {
    return total + current;
  }, 0);

  console.log(boardsWon[boardsWon.length - 1]);

  console.timeEnd("speed");
  console.log(value, lastNumber);
  console.log(value * parseInt(lastNumber));
}

main();
