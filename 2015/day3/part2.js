const data = require("./data");

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

let santaPosition = [0, 0];
let roboPosition = [0, 0];

data.forEach((direction, index) => {
  if (index % 2 === 0) {
    santaPosition = move(santaPosition, direction);
    const visitKey = `${santaPosition[0]},${santaPosition[1]}`;

    if (visited[visitKey]) {
      visited[visitKey]++;
    } else {
      visited[visitKey] = 1;
    }
  } else {
    roboPosition = move(roboPosition, direction);
    const visitKey = `${roboPosition[0]},${roboPosition[1]}`;

    if (visited[visitKey]) {
      visited[visitKey]++;
    } else {
      visited[visitKey] = 1;
    }
  }
});

console.log(Object.keys(visited).length); // 2639
