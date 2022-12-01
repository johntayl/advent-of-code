const path = require("path");
const { multiply, array2d } = require("../utils/array");
const { readLines } = require("../utils/file");
const vector = require("../utils/vector");

function implementation(lines) {
  const heightMap = lines.map((line) => {
    return line.split("");
  });

  let tileMaps = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
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

      if (Math.min(...nums) > number) {
        // Basin check.
        let tileMap = array2d(heightMap.length, heightMap[0].length, null); // Create entire board

        checkSurround([i, j], heightMap, tileMap);

        let count = 0;
        for (let i = 0; i < tileMap.length; i++) {
          for (let j = 0; j < tileMap[i].length; j++) {
            const element = tileMap[i][j];

            if (element === "1") count++;
          }
        }
        tileMaps.push(count);
      }
    }
  }

  return multiply(tileMaps.sort((a, b) => a - b).slice(-3));
}

function isValid(point, heightMap) {
  let inBounds =
    point[0] >= 0 &&
    point[0] < heightMap.length &&
    point[1] >= 0 &&
    point[1] < heightMap[0].length;

  if (inBounds) {
    if (parseInt(heightMap[point[0]][point[1]]) === 9) {
      return false;
    }
    return true;
  }

  return false;
}

function isSeen(point, tileMap) {
  return tileMap[point[0]] && tileMap[point[0]][point[1]] !== null;
}

function markSeen(point, tileMap, mark) {
  if (tileMap[point[0]]) {
    tileMap[point[0]][point[1]] = mark;
  } else {
    tileMap[point[0]] = [];
    tileMap[point[0]][point[1]] = mark;
  }
}

function checkSurround(start, heightMap, tileMap) {
  let currentNum = parseInt(heightMap[start[0]][start[1]]);
  if (currentNum === 9) {
    markSeen(start, tileMap, "x");
    return tileMap;
  }

  markSeen(start, tileMap, "1");

  // Check north
  let check = vector.add(start, [-1, 0]);
  if (isValid(check, heightMap) && !isSeen(check, tileMap)) {
    // Mark
    checkSurround(check, heightMap, tileMap);
  }

  check = vector.add(start, [1, 0]);
  if (isValid(check, heightMap) && !isSeen(check, tileMap)) {
    // Mark
    checkSurround(check, heightMap, tileMap);
  }

  check = vector.add(start, [0, -1]);
  if (isValid(check, heightMap) && !isSeen(check, tileMap)) {
    // Mark
    checkSurround(check, heightMap, tileMap);
  }

  check = vector.add(start, [0, 1]);
  if (isValid(check, heightMap) && !isSeen(check, tileMap)) {
    // Mark
    checkSurround(check, heightMap, tileMap);
  }

  return tileMap;
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
