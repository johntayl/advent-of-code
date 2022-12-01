const { readFile } = require("../utils/readFile");

let input = readFile(__dirname + "/input.txt");

const invalid = [];
const valid = [];

for (const line of input) {
  const [range, letter, password] = line.split(" ");
  const [min, max] = range.split("-").map((v) => parseInt(v));
  const [predicate] = letter.split(":");

  console.log(min, max, predicate, password);
  const [minPos, maxPos] = [password[min - 1], password[max - 1]];
  console.log(minPos, maxPos);

  const a = minPos === predicate;
  const b = maxPos === predicate;
  // XOR
  if ((a || b) && !(a && b)) {
    valid.push(line);
  } else {
    invalid.push(line);
  }
}

console.log(invalid.length);
console.log(valid.length);
