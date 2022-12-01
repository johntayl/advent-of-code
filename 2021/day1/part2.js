const data = require("./data");

let lastNum = null;
let increases = 0;

for (let i = 0; i < data.length - 2; i++) {
  const current = parseInt(data[i]);

  const window =
    parseInt(data[i]) + parseInt(data[i + 1]) + parseInt(data[i + 2]);

  if (lastNum !== null) {
    if (lastNum < window) {
      increases++;
    }
  }

  lastNum = window;
}

console.log(increases);
