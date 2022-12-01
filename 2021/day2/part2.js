const data = require("./data");

function implementation() {
  let position = [0, 0, 0];

  function move(position, step) {
    const [direction, points] = step.split(" ");

    let movePoints = parseInt(points);

    switch (direction) {
      case "forward":
        return [
          position[0] + movePoints,
          position[1] + position[2] * movePoints,
          position[2]
        ];
      case "up":
        return [position[0], position[1], position[2] - movePoints];
      case "down":
        return [position[0], position[1], position[2] + movePoints];
    }
  }

  for (let i = 0; i < data.length; i++) {
    position = move(position, data[i]);
  }

  return position[0] * position[1]; // 1938402
}

function main() {
  console.time("speed");
  const result = implementation();
  console.timeEnd("speed");

  console.log(result);
}

main();
