const input = require("../input");
const data = input.getData(__dirname + "/input.txt");
let mapSize = 1000;
let map = [];
let squareInches = 0;

function main() {
  createMap();
  let fabrics = data.map(parseData);

  fabrics.map(updateMap);
  //   drawMap();

  console.log("Number of square inches within two:", squareInches);
}

function createMap() {
  map = [...Array(mapSize)].map(x => Array(mapSize).fill("-"));
}

function parseData(data) {
  let [id, at, position, dimension] = data.split(" ");
  position = position.slice(0, -1);
  let [x, y] = position.split(",").map(x => parseInt(x));
  let [width, height] = dimension.split("x").map(x => parseInt(x));

  return {
    id,
    x,
    y,
    width,
    height
  };
}

function updateMap(data) {
  let xWidth = data.x + data.width;
  let yHeight = data.y + data.height;

  for (let x = data.x; x < xWidth; x++) {
    for (let y = data.y; y < yHeight; y++) {
      if (map[x][y] === "-") {
        map[x][y] = 1;
      } else if (map[x][y] === 1) {
        squareInches++;
        map[x][y]++;
      } else {
        map[x][y]++;
      }
    }
  }
}

function drawMap() {
  map.forEach(row => console.log(...row));
}

main();
