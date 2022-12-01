exports.array2d = (x, y, fill) =>
  Array(x)
    .fill(fill)
    .map(() => Array(y).fill(fill));

exports.print2d = (arr) => {
  let lines = arr.map((a) => a.join("") + "\n");

  console.log(lines.join(""));
};

exports.sum = (arr, init = 0) => arr.reduce((total, cur) => total + cur, init);

exports.multiply = (arr, init = 1) =>
  arr.reduce((total, cur) => total * cur, init);

exports.inBounds = (point, map) =>
  point[0] >= 0 &&
  point[1] >= 0 &&
  point[0] <= map.length - 1 &&
  point[1] <= map.length - 1;

exports.mapValue = (map, point) => {
  if (map[point[0]]) {
    return map[point[0]][point[1]];
  } else {
    return 0;
  }
};

exports.coordsToStr = (x, y, z) => `${x}:${y}:${z}`;
exports.coordsToArray = (str) => str.split(":").map((x) => parseInt(x));

exports.chunk = (arr, size) => {
  let i = 0;
  let j = arr.length;
  let chunked = [];

  for (i = 0, j = arr.length; i < j; i += size) {
    chunked.push(arr.slice(i, i + size));
  }

  return chunked;
};
