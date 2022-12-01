const data = require("./data");

// const data = `199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263`.split("\n");

let lastNum = null;
let increases = 0;
for (let i = 0; i < data.length; i++) {
  const current = parseInt(data[i]);

  if (lastNum !== null) {
    if (lastNum < current) {
      increases++;
    }
  }

  lastNum = current;
}

console.log(increases);
