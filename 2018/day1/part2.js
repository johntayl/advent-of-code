const fs = require("fs");

const readfile = fs.readFileSync(__dirname + "/input2.txt");

const inputString = readfile.toString();

let frequency = 0;
let changes = inputString.split("\r\n");
changes.pop();
let foundFrequencyMap = {};
let duplicateFrequency = null;
let runs = 0;

function computeFrequency() {
  // for (let i = 0; i < changes.length; i++) {
  for (let i = 0; i < changes.length; i++) {
    let fq = changes[i];
    let sign = fq[0];
    let amount = parseInt(fq.substr(1));
    switch (sign) {
      case "+":
        frequency += amount;
        break;
      case "-":
        frequency -= amount;
        break;
    }

    if (foundFrequencyMap[frequency]) {
      console.log("Found frequency!");
      duplicateFrequency = frequency;
      break;
    } else {
      foundFrequencyMap[frequency] = true;
    }
  }

  if (!duplicateFrequency) {
    runs++;
    computeFrequency();
  }
}

computeFrequency();

console.log("Runs:", runs);
console.log("Changes:", changes.length);
console.log("Frequency changes:", runs * changes.length);
console.log("Frequency: ", frequency);
console.log("Twice: ", duplicateFrequency);
