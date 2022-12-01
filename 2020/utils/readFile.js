const fs = require("fs");

exports.readFile = (file) => {
  let data = fs.readFileSync(file);

  data = data.toString();

  const lines = data.split("\n").map((v) => v.replace("\r", ""));

  lines.pop();

  return lines;
};
