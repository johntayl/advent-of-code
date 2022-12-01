const path = require("path");
const { readLines } = require("../utils/file");
const { array2d, print2d } = require("../utils/array");
const filename = "./input.txt";

// fold along y=7
// fold along x=5

const folds = [
  ["x", 655],
  ["y", 447],
  ["x", 327],
  ["y", 223],
  ["x", 163],
  ["y", 111],
  ["x", 81],
  ["y", 55],
  ["x", 40],
  ["y", 27],
  ["y", 13],
  ["y", 6]
];

function implementation(lines) {
  let maxX = 0;
  let maxY = 0;

  let points = lines
    .map((line) => line.split(","))
    .map((pos) => {
      maxX = Math.max(pos[0], maxX);
      maxY = Math.max(pos[1], maxY);

      return pos.reverse();
    });

  let map = array2d(maxY + 1, maxX + 1, ".");

  points.forEach((p) => {
    map[p[0]][p[1]] = "#";
  });

  let finalMap = folds.reduce((next, foldPoint) => {
    return fold(next, foldPoint[0], foldPoint[1]);
  }, map);

  print2d(finalMap);
  return;
}

function fold(map, dir, line) {
  if (dir == "y") {
    let bottom = map.splice(line).reverse();
    // map.pop(); // fold.

    let finalMap = [...map];

    return merge(finalMap, bottom);
  } else {
    // x direction fold.
    let right = map.map((row) => {
      let newRow = row.splice(line).reverse();
      // newRow.pop(); // for the fold line
      return newRow;
    });
    let finalMap = [...map];
    return merge(finalMap, right);
  }
}

function count(arr) {
  let overlap = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == "#") {
        overlap++;
      }
    }
  }
  return overlap;
}

function merge(arr1, arr2) {
  let final = [...arr1];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[0].length; j++) {
      if (arr1[i][j] == ".") {
        final[i][j] = arr2[i][j];
      }
    }
  }
  return final;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
