const data = require("./data");

// const data = ["2x3x4", "1x1x10"];

function surfaceArea(l, w, h) {
  return 2 * l * w + 2 * w * h + 2 * h * l;
}

function smallest(l, w, h) {
  return Math.min(l * w, w * h, h * l);
}

function total(l, w, h) {
  return surfaceArea(l, w, h) + smallest(l, w, h);
}

function ribbon(l, w, h) {
  const sorted = [l, w, h].sort((a, b) => a - b);

  return sorted[0] + sorted[0] + sorted[1] + sorted[1];
}

function bow(l, w, h) {
  return l * w * h;
}

function totalRibbon(l, w, h) {
  return ribbon(l, w, h) + bow(l, w, h);
}

const totalFeet = data.reduce((current, box) => {
  const [l, w, h] = box.split("x");
  return current + totalRibbon(parseInt(l), parseInt(w), parseInt(h));
}, 0);

console.log(totalFeet); // 3737498
