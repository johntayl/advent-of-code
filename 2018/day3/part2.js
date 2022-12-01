const input = require("../input");
const data = input.getData(__dirname + "/input.txt");
let mapSize = 1000;
let map = [];

function main() {
  createMap();
  let fabrics = data.map(parseData);
  fabrics.map(fabric => detectCollision(fabric, fabrics));
  let nonCollision = fabrics.filter(rect => !rect.collides);

  console.log(nonCollision);
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
    height,
    collides: false
  };
}

function detectCollision(fabric, fabrics) {
  for (let i = 0; i < fabrics.length; i++) {
    let rect1 = fabric;
    let rect2 = fabrics[i];

    if (rect1.id === rect2.id) continue;

    if (rect1.collides) continue;

    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      rect1.collides = true;
      rect2.collides = true;
    }
  }
}

main();
