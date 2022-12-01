const path = require("path");
const { readLines } = require("../utils/file");

function implementation(lines) {
  let appear = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let [input, output] = line.split(" | ");
    console.log(buildInput(input));
    output = output.split(" ");

    output.forEach((part) => {
      if (segment(part)) {
        appear++;
      }
    });
  }

  return appear;
}

function main() {
  console.time("speed");
  const result = implementation(
    readLines(path.resolve(__dirname, "./input.txt"))
  );
  console.timeEnd("speed");

  console.log(result);
}

function buildInput(input) {
  const nums = input.split(" ").sort((a, b) => (a.length < b.length ? 1 : -1));
  return nums;
}

function segment(string) {
  switch (string.length) {
    case 2:
      console.log("2", string);
      return 1;
    case 3:
      console.log("7", string);
      return 7;
    case 4:
      console.log("4", string);
      return 4;
    case 7:
      console.log("8", string);
      return 8;
  }
  return null;
}

main();
