const path = require("path");
const { readLines } = require("../utils/file");

const intersection = (a, b) => {
  let count = 0;
  for (const char of a) {
    if (b.includes(char)) {
      count++;
    }
  }
  return count;
};

function implementation(lines) {
  let outputValuesTotal = 0;

  for (const line of lines) {
    const [inputs, outputs] = line.split(" | ").map((p) => p.split(" "));
    const signalPatterns = inputs.concat(outputs);

    const one = signalPatterns.find((c) => c.length == 2) ?? "";
    const four = signalPatterns.find((c) => c.length == 4) ?? "";

    let outputValue = 0;

    for (const output of outputs) {
      let digit;
      switch (output.length) {
        case 2:
          digit = 1;
          break;
        case 3:
          digit = 7;
          break;
        case 4:
          digit = 4;
          break;
        case 7:
          digit = 8;
          break;
        case 5:
          digit =
            intersection(output, one) === 2
              ? 3
              : intersection(output, four) === 2
              ? 2
              : 5;
          break;
        case 6:
          digit =
            intersection(output, four) === 4
              ? 9
              : intersection(output, one) === 2
              ? 0
              : 6;
          break;
        default:
          throw new Error("no compatible digit");
      }
      outputValue = 10 * outputValue + digit;
    }
    outputValuesTotal += outputValue;
  }

  return outputValuesTotal;
}

function main() {
  console.time("speed");
  const result = implementation(
    readLines(path.resolve(__dirname, "./input.txt"))
  );
  console.timeEnd("speed");

  console.log(result);
}

main();
