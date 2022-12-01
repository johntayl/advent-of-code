const path = require("path");
const { readLines } = require("../utils/file");
const {
  array2d,
  print2d,
  sum,
  mapValue,
  inBounds,
  coordsToArray,
  coordsToStr
} = require("../utils/array");
const { add } = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  const grid = lines.map((line) => line.split("").map((x) => parseInt(x)));
  const MAX = grid.reduce(
    (total, line) => total + line.reduce((acc, cur) => acc + cur, 0),
    0
  );

  const repeat = 5;

  const endX = grid[0].length * repeat - 1;
  const endY = grid.length * repeat - 1;

  const nodes = {};
  const visited = new Set();
  const queue = new Set();
  const notInfinite = new Set();

  let currentNode = [0, 0]; //start

  // build out queue
  for (let i = 0; i < repeat; i++) {
    grid.forEach((line, y) => {
      const realY = i * grid.length + y;

      for (let j = 0; j < 5; j++) {
        line.forEach((value, x) => {
          const realX = j * grid[y].length + x;
          let realValue = value + i + j; //

          if (realValue > 9) {
            realValue = realValue % 9; //wrap to 1
          }

          nodes[coordsToStr(realX, realY)] = {
            value: realValue,
            distance: MAX
          };
          queue.add(coordsToStr(realX, realY));
        });
      }
    });
  }

  // Set start to 0
  nodes[coordsToStr(0, 0)].distance = 0;
  notInfinite.add(coordsToStr(0, 0));

  function updateDistance([x, y], dist) {
    if (x >= 0 && x <= endX && (y >= 0) & (y <= endY)) {
      const coordStr = coordsToStr(x, y);

      if (coordStr in nodes && !visited.has(coordStr)) {
        nodes[coordStr].distance = Math.min(
          nodes[coordStr].distance,
          dist + nodes[coordStr].value
        );

        if (nodes[coordStr].distance < MAX) {
          notInfinite.add(coordStr);
        }
      }
    }
  }

  let shortestPath = Infinity;

  function getShortest() {
    const shortest = {
      coords: [0, 0],
      distance: Infinity
    };

    Array.from(notInfinite).forEach((coords) => {
      if (nodes[coords].distance < shortest.distance) {
        shortest.distance = nodes[coords].distance;
        shortest.coords = coordsToArray(coords);
      }
    });

    shortestPath = shortest.distance;

    return shortest;
  }

  while (queue.size > 0 && queue.has(coordsToStr(endX, endY))) {
    const coordStr = coordsToStr(currentNode[0], currentNode[1]);
    const currentDistance = nodes[coordStr].distance;
    visited.add(coordStr);
    queue.delete(coordStr);
    notInfinite.delete(coordStr);

    updateDistance([currentNode[0], currentNode[1] - 1], currentDistance); // up
    updateDistance([currentNode[0], currentNode[1] + 1], currentDistance); // down
    updateDistance([currentNode[0] - 1, currentNode[1]], currentDistance); // left
    updateDistance([currentNode[0] + 1, currentNode[1]], currentDistance); // right

    currentNode = getShortest().coords;
  }

  return nodes[coordsToStr(endX, endY)];
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
