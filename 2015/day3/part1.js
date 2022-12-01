const data = require("./data");

const Direction = {
  UP: "^",
  RIGHT: ">",
  LEFT: "<",
  DOWN: "v"
};

const Vectors = {
  "^": [0, 1],
  ">": [1, 0],
  "<": [-1, 0],
  v: [0, -1]
};

function move(position, direction) {
  const moveVector = Vectors[direction];

  return [position[0] + moveVector[0], position[1] + moveVector[1]];
}

const visited = {
  "0,0": 1
};
let currentPosition = [0, 0];

data.forEach((direction) => {
  currentPosition = move(currentPosition, direction);
  const visitKey = `${currentPosition[0]},${currentPosition[1]}`;
  if (visited[visitKey]) {
    visited[visitKey]++;
  } else {
    visited[visitKey] = 1;
  }
});

console.log(Object.keys(visited).length); // 2565
