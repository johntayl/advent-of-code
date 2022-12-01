const path = require("path");
const { readLines } = require("../utils/file");
const { array2d, print2d } = require("../utils/array");
const filename = "./input.txt";

function implementation(lines) {
  const pairs = {};

  let original = "CNBPHFBOPCSPKOFNHVKV";
  let poly = original;
  let steps = 10;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [pair, end] = line.split(" -> ");

    pairs[pair] = end;
  }

  for (let i = 0; i < steps; i++) {
    let newPoly = [poly[0]];
    // step
    for (let j = 0; j < poly.length; j++) {
      let pair = poly[j] + poly[j + 1];
      if (pairs[pair]) {
        newPoly.push(pairs[pair]);
        if (poly[j + 1]) {
          newPoly.push(poly[j + 1]);
        }
      }
    }

    poly = newPoly.join("");
  }

  let componentCount = {};
  Object.values(pairs).forEach((comp) => {
    componentCount[comp] = poly.match(new RegExp(`${comp}`, "g") || []).length;
  });

  console.log(poly.length);
  let sort = Object.values(componentCount).sort((a, b) => a - b);

  return sort[sort.length - 1] - sort[0];
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
