const path = require("path");
const { readLines } = require("../utils/file");
const {
  array2d,
  print2d,
  sum,
  mapValue,
  inBounds,
  coordsToArray,
  coordsToStr,
  chunk
} = require("../utils/array");
const Numbers = require("../utils/numbers");
const { add } = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  let box = [56, -134, 76, -162];

  let collisions = [];

  for (let i = Math.abs(box[2]) * -5; i < Math.abs(box[2]) * 5; i++) {
    for (let j = Math.abs(box[3]) * -5; j < Math.abs(box[3]) * 5; j++) {
      let start = [0, 0];
      let originalVelocity = [i, j];
      let velocity = [i, j];
      let highY = 0;
      let steps = 0;

      while (true) {
        [start, velocity] = step(start, velocity);
        steps++;

        if (start[1] > highY) {
          highY = start[1];
        }

        if (collision(start, box)) {
          collisions.push([originalVelocity, highY, steps]);
          break;
        }

        if (outOfBounds(start, box)) {
          break;
        }
      }
    }
  }

  let uniqueVelocity = new Set();

  collisions.forEach((col) => {
    let [vel, highY, step] = col;

    uniqueVelocity.add(coordsToStr(vel));
  });
  return uniqueVelocity.size;
}

function step(pos, velocity) {
  let [x, y] = pos;
  let [vx, vy] = velocity;

  // move
  x = x + vx;
  y = y + vy;

  // drag
  if (vx > 0) vx--;
  if (vx < 0) vx++;

  vy--; // gravity

  return [
    [x, y],
    [vx, vy]
  ];
}

function outOfBounds(point, box) {
  // x is beyond
  let [x, y] = point;
  let [x1, y1, x2, y2] = box;

  if (x > x2) {
    return "long";
  }

  if (x < x1 && y < y2) {
    return "short";
  }

  if (y < y2) {
    return "below";
  }

  return false;
}

function collision(point, box) {
  let [x, y] = point;
  let [x1, y1, x2, y2] = box;

  return x >= x1 && x <= x2 && y <= y1 && y >= y2;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
