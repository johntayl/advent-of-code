const path = require("path");
const { readLines } = require("../utils/file");

function implementation(lines) {
  const tokens = ["(", "[", "{", "<"];
  const closeTokens = [")", "]", "}", ">"];
  let linePoints = [];

  for (let i = lines.length - 1; i >= 0; i--) {
    let tokenStack = [];
    const line = lines[i];
    let isCorrupted = false;

    for (let j = 0; j < line.length; j++) {
      const char = tokenStack[tokenStack.length - 1];
      if (tokens.includes(line[j])) {
        // good to start
        tokenStack.push(line[j]);
      } else if (closeTokens.includes(line[j])) {
        if (
          (char == "(" && line[j] == ")") ||
          (char == "[" && line[j] == "]") ||
          (char == "{" && line[j] == "}") ||
          (char == "<" && line[j] == ">")
        ) {
          tokenStack.pop();
        } else {
          // Discard this line.
          isCorrupted = true;
          lines.splice(i, 1);
          break;
        }
      }
    }

    if (isCorrupted) continue;

    // Incomplete, create remaining

    let total = 0;
    for (let j = tokenStack.length - 1; j >= 0; j--) {
      const stackToken = tokenStack[j];

      total *= 5;

      if (stackToken == "(") total += 1;
      if (stackToken == "[") total += 2;
      if (stackToken == "{") total += 3;
      if (stackToken == "<") total += 4;
    }

    linePoints.push(total);
  }

  const middle = linePoints.sort((a, b) => a - b)[
    Math.round((linePoints.length - 1) / 2)
  ];

  return middle;
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
