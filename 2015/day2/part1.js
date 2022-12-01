const data = require("./data");

function surfaceArea(l, w, h) {
  return 2 * l * w + 2 * w * h + 2 * h * l;
}

function smallest(l, w, h) {
  return Math.min(l * w, w * h, h * l);
}

function total(l, w, h) {
  return surfaceArea(l, w, h) + smallest(l, w, h);
}

const totalFeet = data.reduce((current, box) => {
  const [l, w, h] = box.split("x");
  return current + total(l, w, h);
}, 0);

console.log(totalFeet); // 1586300
