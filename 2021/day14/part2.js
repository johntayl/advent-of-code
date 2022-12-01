const path = require("path");
const { readLines } = require("../utils/file");
const { array2d, print2d, sum } = require("../utils/array");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  const pairMap = {};

  // let original = "NNCB";
  let original = "CNBPHFBOPCSPKOFNHVKV";

  let steps = 40;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [pair, end] = line.split(" -> ");

    pairMap[pair] = end;
  }

  let polyCount = original.split("").reduce((map, current, index, arr) => {
    let pair = arr[index] + arr[index + 1];
    if (pair.length == 2) {
      map[pair] = 1;
    }
    return map;
  }, {});

  let countMap = original.split("").reduce((map, char) => {
    map[char] = map[char] ? map[char] + 1 : 1;
    return map;
  }, {});

  for (let i = 0; i < steps; i++) {
    let newCount = {};
    for (let j = 0; j < Object.keys(polyCount).length; j++) {
      let pair = Object.keys(polyCount)[j];

      if (pairMap[pair]) {
        let count = polyCount[pair]; // Letter being inserted how many times.

        let newpair = pair[0] + pairMap[pair]; // NC
        let nextPair = pairMap[pair] + pair[1]; // NB

        countMap[pairMap[pair]] = countMap[pairMap[pair]]
          ? countMap[pairMap[pair]] + count
          : count;

        newCount[newpair] = newCount[newpair]
          ? newCount[newpair] + count
          : count;

        newCount[nextPair] = newCount[nextPair]
          ? newCount[nextPair] + count
          : count;
      }
    }

    polyCount = newCount;
  }

  let sort = Object.values(countMap).sort((a, b) => a - b);

  return sort[sort.length - 1] - sort[0];
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
