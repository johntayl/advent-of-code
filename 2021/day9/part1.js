const path = require("path");
const { sum } = require("../utils/array");
const { readLines } = require("../utils/file");

function implementation(lines) {
  const heightMap = lines.map((line) => {
    return line.split("");
  });

  let lowNums = [];

  for (let i = 0; i < heightMap.length; i++) {
    const row = heightMap[i];
    for (let j = 0; j < row.length; j++) {
      let nums = [];
      let number = parseInt(heightMap[i][j]);
      if (i > 0) {
        nums.push(parseInt(heightMap[i - 1][j]));
      }

      if (j > 0) {
        nums.push(parseInt(heightMap[i][j - 1]));
      }

      if (i < heightMap.length - 1) {
        nums.push(parseInt(heightMap[i + 1][j]));
      }

      if (j < heightMap[0].length - 1) {
        nums.push(parseInt(heightMap[i][j + 1]));
      }

      if (Math.min(...nums) > number) lowNums.push(number + 1);
    }
  }

  console.log(lowNums);

  return sum(lowNums);
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
