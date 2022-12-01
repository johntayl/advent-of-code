const { readFile } = require("../utils/readFile");

let input = readFile(__dirname + "/input.txt");

const lines = input.length;

function validLinePosition(line, position) {
  return line[position] === ".";
}

function goToNextLine(currentLine, start) {
    if (currentLine)
}
