const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines = []) {
  let algo = lines.shift();

  console.log("algo", algo.length);

  lines.shift();

  let input = lines.map((line) => line.split(""));
  let image = input;

  console.log("original", image.length, image[0].length);

  let enhances = 2;

  let light = 0;
  let dark = 0;

  for (let enhance = 1; enhance <= enhances; enhance++) {
    console.log("enhance: ", enhance);
    let output = [];
    light = 0;
    dark = 0;
    for (let y = -1; y <= image.length; y++) {
      for (let x = -1; x <= image[0].length; x++) {
        let num = Numbers.bin2int(
          toBinary(getBox([y, x], image, enhance % 2 === 1 ? "." : "#"))
        );

        let outputPixel = algo[num];
        if (outputPixel === "#") light++;
        else dark++;

        let resultY = y + 1;
        let resultX = x + 1;

        if (output[resultY]) {
          output[resultY][resultX] = outputPixel;
        } else {
          output[resultY] = [outputPixel];
        }
      }
    }

    image = output;

    console.log("output", image.length, image[0].length);
    console.log("light", light);
    console.log("dark", dark);
  }

  // let light = 0;
  // let dark = 0;
  // image.forEach((line) => line.forEach((c) => (c === "#" ? light++ : dark++)));
  return;
}

function getBox(pos, map, c = ".") {
  let box = [
    [c, c, c],
    [c, c, c],
    [c, c, c]
  ];

  let boxPoint = [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2]
  ];

  let around = [
    [pos[0] - 1, pos[1] - 1],
    [pos[0], pos[1] - 1],
    [pos[0] + 1, pos[1] - 1],
    [pos[0] - 1, pos[1]],
    [pos[0], pos[1]],
    [pos[0] + 1, pos[1]],
    [pos[0] - 1, pos[1] + 1],
    [pos[0], pos[1] + 1],
    [pos[0] + 1, pos[1] + 1]
  ];

  for (let i = 0; i < around.length; i++) {
    let p = around[i];
    let boxP = boxPoint[i];

    if (map[p[0]] && map[p[0]][p[1]]) {
      box[boxP[0]][boxP[1]] = map[p[0]][p[1]];
    } else {
      // Doesnt exist, its a dot.
      box[boxP[0]][boxP[1]] = c;
    }
  }

  return box;
}

function toBinary(box) {
  return box
    .map((line) => line.map((c) => (c == "." ? "0" : "1")).join(""))
    .join("");
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
