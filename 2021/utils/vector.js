exports.create = (x, y, z) => {
  return [parseInt(x), parseInt(y), parseInt(z)];
};

exports.add = (v1, v2) => {
  return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
};

exports.subtract = (v1, v2) => {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
};

exports.isHorizontal = (v1, v2) => {
  return v1[1] == v2[1];
};

exports.isVertical = (v1, v2) => {
  return v1[0] == v2[0];
};

exports.isEqual = (v1, v2) => {
  return v1[0] == v2[0] && v1[1] == v2[1] && v1[2] == v2[2];
};
