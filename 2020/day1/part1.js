const { readFile } = require("../utils/readFile");

let input = readFile(__dirname + "/input.txt");
input = input.map((i) => parseInt(i));
console.log(input);

let num1;
let num2;

for (const i of input) {
  for (const j of input) {
    if (i + j === 2020) {
      num1 = i;
      num2 = j;
      break;
    }
  }
}

console.log(num1, num2);

console.log(num1 * num2);
