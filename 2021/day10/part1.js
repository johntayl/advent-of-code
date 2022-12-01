const path = require("path");
const { sum } = require("../utils/array");
const { readLines } = require("../utils/file");

function implementation(lines) {
  const tokens = ["(", "[", "{", "<"];
  const closeTokens = [")", "]", "}", ">"];

  let tokenCounts = [0, 0, 0, 0];

  let points = [3, 57, 1197, 25137];

  for (let i = 0; i < lines.length; i++) {
    let tokenStack = [];
    const line = lines[i];

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
          tokenCounts[closeTokens.indexOf(line[j])]++;
          break;
        }
      }
    }
  }

  return sum(tokenCounts.map((count, index) => count * points[index]));
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
