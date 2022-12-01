const data = require("./data");

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

function isDiagonal(a, b) {
  return Math.abs(a[0] - b[0]) == Math.abs(a[1] - b[1]);
}

function isValid(a, b) {
  return isHorizontal(a, b) || isVertical(a, b) || isDiagonal(a, b);
}

function direction(a, b) {
  return a < b ? 1 : -1;
}

function step(map, a, b) {
  let vector = [0, 0];

  if (isHorizontal(a, b)) {
    vector = [direction(a[0], b[0]), 0];
  }

  if (isVertical(a, b)) {
    vector = [0, direction(a[1], b[1])];
  }

  if (isDiagonal(a, b)) {
    vector = [direction(a[0], b[0]), direction(a[1], b[1])];
  }

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

function implementation(data) {
  // Write here.

  let map = [];
  let overlaps = 0;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const { a, b } = parse(element);

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
  const result = implementation(data);
  console.timeEnd("speed");
  console.log(result);
}

main();
