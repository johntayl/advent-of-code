const data = require("./data");

// const data = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`.split("\n");

function implementation(data) {
  // Write here.

  let bits = Array(data[0].length);
  bits.fill(0);

  for (let i = 0; i < data.length; i++) {
    // loop
    const item = data[i];

    item.split("").forEach((bit, index) => {
      if (parseInt(bit) === 1) bits[index]++;
    });
  }

  const gamma = bits.map((bit) => {
    return bit > data.length / 2 ? 1 : 0;
  });

  const epsilon = gamma.map((gam) => (gam === 1 ? 0 : 1));

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

function main() {
  console.time("speed");
  const result = implementation(data);
  console.timeEnd("speed");

  console.log(result);
}

main();
