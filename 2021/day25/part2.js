const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
