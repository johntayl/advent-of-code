const path = require("path");
const { readLines } = require("../utils/file");

function implementation(lines) {
  // Write here.

  let result = 0;

  let days = 18;
  let fish = [3, 4, 3, 1, 2];

  return 3 * Math.pow(1.091, 18);

  for (let i = 0; i < fish.length; i++) {
    const fi = fish[i];

    result += fi * Math.pow(1.091, days);
  }

  return result;
}

function main() {
  console.time("speed");
  const result = implementation(
    readLines(path.resolve(__dirname, "./input.txt"))
  );
  console.timeEnd("speed");

  console.log(result);
}

main();
