const path = require("path");
const { readLines } = require("../utils/file");

function parse(line) {
  const points = line.split(" -> ");

  let a = points[0].split(",");
  let b = points[1].split(",");
  return {
    a: [parseInt(a[0]), parseInt(a[1])],
    b: [parseInt(b[0]), parseInt(b[1])]
  };
}

function isHorizontal(a, b) {
  return a[1] == b[1];
}

function isVertical(a, b) {
  return a[0] == b[0];
}

function isValid(a, b) {
  return isHorizontal(a, b) || isVertical(a, b);
}

function direction(a, b) {
  if (a == b) return 0;
  return a < b ? 1 : -1;
}

function step(map, a, b) {
  const vector = isHorizontal(a, b)
    ? [direction(a[0], b[0]), 0]
    : [0, direction(a[1], b[1])];
  let current = a;

  while (!isEqual(current, b)) {
    bumpMap(map, current);
    current = addVector(current, vector);
  }

  bumpMap(map, current);

  return map;
}

function isEqual(a, b) {
  return a[0] == b[0] && a[1] == b[1];
}

function addVector(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function bumpMap(map, point) {
  if (!map[point[0]]) {
    map[point[0]] = [];
  }

  if (!map[point[0]][point[1]]) {
    map[point[0]][point[1]] = 1;
  } else {
    map[point[0]][point[1]]++;
  }
}

function implementation(lines) {
  // Write here.

  let map = [];
  let overlaps = 0;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const { a, b } = parse(line);

    if (isValid(a, b)) {
      map = step(map, a, b);
    }
  }

  for (let i = 0; i < map.length; i++) {
    const row = map[i];

    if (row) {
      for (let j = 0; j < row.length; j++) {
        const col = row[j];

        if (col >= 2) {
          overlaps++;
        }
      }
    }
  }

  return overlaps;
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
