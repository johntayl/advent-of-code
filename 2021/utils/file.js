const fs = require("fs");

exports.readLines = (filepath) => {
  const data = fs.readFileSync(filepath, "utf8");
  const lines = data.split("\n").map((line) => line.replace("\r", ""));

  lines.pop(); // remove added empty line.

  return lines;
};
