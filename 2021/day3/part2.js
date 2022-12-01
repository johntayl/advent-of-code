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

function filter(data, index, commonFn) {
  let common = commonFn(data, index);

  let filtered = data.filter((bits) => {
    return parseInt(bits[index]) == common;
  });

  if (filtered.length === 1) return filtered;

  return filter(filtered, index + 1, commonFn);
}

function leastCommon(data, index) {
  let most = mostCommon(data, index);

  return most === 1 ? 0 : 1;
}

function mostCommon(data, index) {
  let bits = 0;

  data.forEach((bit) => {
    bits += parseInt(bit[index]);
  });

  if (bits == Math.ceil(data.length / 2)) {
    return 1;
  }

  if (bits >= Math.ceil(data.length / 2)) {
    return 1;
  }
  return 0;
}

function implementation(data) {
  // Write here.
  let oxygen = filter(data, 0, mostCommon);
  let co2 = filter(data, 0, leastCommon);

  return parseInt(co2[0], 2) * parseInt(oxygen[0], 2);
}

function main() {
  console.time("speed");
  const result = implementation(data);
  console.timeEnd("speed");

  console.log(result);
}

main();
