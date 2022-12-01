const { readFile } = require("../utils/readFile");

let input = readFile(__dirname + "/input.txt");

const invalid = [];
const valid = [];

for (const line of input) {
  const [range, letter, password] = line.split(" ");
  const [min, max] = range.split("-").map((v) => parseInt(v));
  const [predicate] = letter.split(":");

  const count = password.split(predicate).length - 1;

  if (!(count >= min && count <= max)) {
    console.log(min, max, predicate, password, count);
    console.log(password.split(predicate));
    invalid.push(line);
  } else {
    valid.push(line);
  }
}

console.log(invalid.length);
console.log(valid.length);
