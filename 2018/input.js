const fs = require("fs");

module.exports = {
  getData: path => {
    const readfile = fs.readFileSync(path);
    const inputString = readfile.toString();
    const entries = inputString.split("\r\n");
    entries.pop();
    return entries;
  }
};
