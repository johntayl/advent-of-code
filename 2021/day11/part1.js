const path = require("path");
const { add } = require("../utils/vector");
const { readLines } = require("../utils/file");
const { inBounds } = require("../utils/array");

let flashes = 0;

function implementation(lines) {
  const octo = lines.map((line) => line.split("").map((i) => parseInt(i)));
  const steps = 100;

  for (let x = 1; x <= steps; x++) {
    for (let i = 0; i < octo.length; i++) {
      for (let j = 0; j < octo[i].length; j++) {
        increase([i, j], octo);
      }
    }

    reset(octo);
  }

  return flashes;
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
  let north = add(point, [-1, 0]);
  let south = add(point, [1, 0]);
  let east = add(point, [0, -1]);
  let west = add(point, [0, 1]);
  let ne = add(point, [-1, -1]);
  let nw = add(point, [-1, 1]);
  let se = add(point, [1, 1]);
  let sw = add(point, [1, -1]);

  if (inBounds(north, map) && map[north[0]][north[1]] <= 9) {
    increase(north, map);
  }

  if (inBounds(south, map) && map[south[0]][south[1]] <= 9) {
    increase(south, map);
  }

  if (inBounds(east, map) && map[east[0]][east[1]] <= 9) {
    increase(east, map);
  }

  if (inBounds(west, map) && map[west[0]][west[1]] <= 9) {
    increase(west, map);
  }

  if (inBounds(ne, map) && map[ne[0]][ne[1]] <= 9) {
    increase(ne, map);
  }

  if (inBounds(nw, map) && map[nw[0]][nw[1]] <= 9) {
    increase(nw, map);
  }

  if (inBounds(se, map) && map[se[0]][se[1]] <= 9) {
    increase(se, map);
  }

  if (inBounds(sw, map) && map[sw[0]][sw[1]] <= 9) {
    increase(sw, map);
  }
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
