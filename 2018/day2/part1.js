const fs = require("fs");
const readfile = fs.readFileSync(__dirname + "/input.txt");
const inputString = readfile.toString();
const entries = inputString.split("\r\n");
entries.pop();

const BreakException = {};

function mapCount(str) {
  let map = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (map[char]) {
      map[char] += 1;
    } else {
      map[char] = 1;
    }
  }
  return map;
}

function containsCount(str, count) {
  let map = mapCount(str);
  let found = false;

  try {
    Object.keys(map).forEach(key => {
      if (map[key] === count) {
        found = true;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return found;
}

function main() {
  let twoCounts = 0;
  let threeCounts = 0;
  let checksum = 0;

  entries.map(entry => {
    if (containsCount(entry, 3)) {
      threeCounts++;
    }

    if (containsCount(entry, 2)) {
      twoCounts++;
    }
  });

  checksum = twoCounts * threeCounts;
  console.log(`Twos: ${twoCounts}`);
  console.log(`Threes: ${twoCounts}`);
  console.log(`Checksum: ${checksum}`);
}

main();
