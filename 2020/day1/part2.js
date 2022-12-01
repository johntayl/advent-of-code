const { readFile } = require("../utils/readFile");

let input = readFile(__dirname + "/input.txt");
input = input.map((i) => parseInt(i));
console.log(input);

let num1;
let num2;
let num3;

for (const i of input) {
  for (const j of input) {
    for (const k of input) {
      if (i + j + k === 2020) {
        num1 = i;
        num2 = j;
        num3 = k;
        break;
      }
    }
  }
}

console.log(num1 * num2 * num3);
