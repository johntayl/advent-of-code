const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./test.txt";

function implementation(lines = []) {
  const steps = lines.map((line) => line.split(" "));

  const initArea = [-50, 50];

  const map = {};

  for (const step of steps) {
    console.log("step", step);
    let points = step[1].split(",").map((x) => x.split("="));

    let xr = points[0][1].split("..").map(Number);
    let yr = points[1][1].split("..").map(Number);
    let zr = points[2][1].split("..").map(Number);

    if (
      (xr[0] >= initArea[0] && xr[1] <= initArea[1]) ||
      (yr[0] >= initArea[0] && yr[1] <= initArea[1]) ||
      (zr[0] >= initArea[0] && zr[0] <= initArea[1])
    ) {
      for (let x = xr[0]; x <= xr[1]; x++) {
        for (let y = yr[0]; y <= yr[1]; y++) {
          for (let z = zr[0]; z <= zr[1]; z++) {
            let coord = `${x},${y},${z}`;
            map[coord] = step[0] == "on" ? 1 : 0;
          }
        }
      }
    }
  }

  return Object.values(map).filter((x) => x == 1).length;
  return steps;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
