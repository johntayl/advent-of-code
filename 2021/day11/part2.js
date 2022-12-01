const path = require("path");
const { add } = require("../utils/vector");
const { readLines } = require("../utils/file");
const { inBounds } = require("../utils/array");

let flashes = 0;

let allFlashes = null;

function implementation(lines) {
  const octo = lines.map((line) => line.split("").map((i) => parseInt(i)));
  let steps = 500;

  for (let x = 1; x <= steps; x++) {
    for (let i = 0; i < octo.length; i++) {
      for (let j = 0; j < octo[i].length; j++) {
        increase([i, j], octo);
      }
    }

    reset(octo);

    if (allUniform(octo)) {
      console.log(octo);
      return x;
    }
  }

  return octo;
}

function allUniform(map) {
  let sync = false;
  for (i = 0; i < 10; i++) {
    sync = map.every((line) => line.every((x) => x === i));

    if (sync) return true;
  }
  return false;
}

function reset(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] >= 10) {
        map[i][j] = 0;
      }
    }
  }
}

function flashAround(point, map) {
  // north
  flashes++;

  const dir = [
    add(point, [-1, 0]),
    add(point, [1, 0]),
    add(point, [0, -1]),
    add(point, [0, 1]),
    add(point, [-1, -1]),
    add(point, [-1, 1]),
    add(point, [1, 1]),
    add(point, [1, -1])
  ];

  dir.forEach((point) => {
    if (inBounds(point, map) && map[point[0]][point[1]] <= 9) {
      increase(point, map);
    }
  });
}

function increase(point, map) {
  if (inBounds(point, map)) {
    map[point[0]][point[1]]++;
    let num = map[point[0]][point[1]];

    if (num == 10) {
      return flashAround(point, map);
    }
  }
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
