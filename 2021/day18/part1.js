const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

let calc = 0;

class Node {
  constructor(
    value = null,
    left = null,
    right = null,
    parent = null,
    depth = 0
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.depth = depth;
  }

  add(node) {
    calc++;
    // Add another node.
    let newParent = new Node(null, this, node, null, 1);
    this.increaseDepth();
    node.increaseDepth();
    this.parent = newParent;
    node.parent = newParent;
    return newParent;
  }

  increaseDepth() {
    calc++;
    this.depth += 1;
    this.left?.increaseDepth();
    this.right?.increaseDepth();
  }

  getLeafs() {
    calc++;
    let leafs = [];

    if (this.value !== null) {
      leafs.push(this);
      return leafs;
    }

    // go down
    let leftLeafs = this.left?.getLeafs() || [];
    let rightLeafs = this.right?.getLeafs() || [];

    leftLeafs.forEach((l) => {
      leafs.push(l);
    });
    rightLeafs.forEach((l) => {
      leafs.push(l);
    });

    return leafs;
  }

  getPairs() {
    calc++;
    let pairs = [];

    if (
      this.left &&
      this.left.value !== null &&
      this.left.value >= 0 &&
      this.right &&
      this.right.value !== null &&
      this.right.value >= 0
    ) {
      // left and right are both values.
      pairs.push(this);
      return pairs;
    }

    // go down
    let leftPairs = this.left?.getPairs() || [];
    let rightPairs = this.right?.getPairs() || [];

    leftPairs.forEach((l) => {
      pairs.push(l);
    });
    rightPairs.forEach((l) => {
      pairs.push(l);
    });

    return pairs;
  }

  explode() {
    calc++;
    let leafs = this.getLeafs();
    let pairs = this.getPairs();
    // left most pair
    // Find the left most with largest depth.
    let pair = pairs.find((p) => p.depth > 4);
    if (pair) {
      pair.explodeNode(leafs);
      return true;
    }
    return false;
  }

  explodeNode(leafs) {
    calc++;
    let leftIndex = leafs.indexOf(this.left) - 1;
    let rightIndex = leafs.indexOf(this.right) + 1;
    let left = leftIndex >= 0 ? leafs[leftIndex] : null;
    let right = rightIndex < leafs.length ? leafs[rightIndex] : null;

    if (left) {
      left.value += this.left.value;
    }

    if (right) {
      right.value += this.right.value;
    }

    this.value = 0;
    this.left = null;
    this.right = null;

    return true;
  }

  split() {
    calc++;
    let node = this.getLeafs().find((l) => l.value > 9);

    if (node) {
      node.splitNode();
      return true;
    }
    return false;
  }

  splitNode() {
    calc++;
    // check this value
    if (this.value > 9) {
      // replace with a pair
      let [left, right] = [
        Math.floor(this.value / 2),
        Math.ceil(this.value / 2)
      ];

      this.value = null;
      this.left = new Node(left, null, null, this, this.depth + 1);
      this.right = new Node(right, null, null, this, this.depth + 1);

      return true;
    }

    return false;
  }
}

function buildGraph(array, parent = null, depth = 1) {
  calc++;
  let newNode = new Node();
  newNode.parent = parent;
  newNode.depth = depth;

  let left = Array.isArray(array[0])
    ? buildGraph(array[0], newNode, depth + 1)
    : new Node(array[0], null, null, newNode, depth + 1);
  let right = Array.isArray(array[1])
    ? buildGraph(array[1], newNode, depth + 1)
    : new Node(array[1], null, null, newNode, depth + 1);

  newNode.left = left;
  newNode.right = right;

  return newNode;
}

function implementation(lines = []) {
  // add left to right pairs
  // start reduce
  // if pair inside 4 pairs, left most [0] pair explodes
  // regular number >=10 leftmost splits[] 10 -> 1,0
  // no action in above, reduce
  // 1 action, go to top of list.
  // split -> explode, explode before split
  // explode = pair[0] + regular left of exploding, if any.
  // pair[1] + regular right number, if any.
  // explode always 2 regular,
  //exploding pair, replaced with 0.

  // test

  // return hasExplodePair([[[[[9, 8], 1], 2], 3], 4]);
  let nextLine = lines.shift();
  let fish = buildGraph(JSON.parse(nextLine));

  while (lines.length > 0) {
    let newLine = buildGraph(JSON.parse(lines.shift()));

    fish = fish.add(newLine);

    while (fish.explode() || fish.split()) {
      let strFish = str(fish);
    }
  }

  console.log("Calcs", calc);
  return magnitude(fish);

  // return str(fish);
}

function magnitude(pair) {
  calc++;
  if (!pair) {
    return 0;
  }
  if (pair.value) {
    return pair.value;
  }

  return 3 * magnitude(pair.left) + 2 * magnitude(pair.right);
}

function flatten(fish) {
  let level = [];
  let left = null;
  let right = null;
  if (fish.left && fish.left.value !== null) {
    left = fish.left.value;
  } else {
    left = flatten(fish.left);
  }

  if (fish.right && fish.right.value !== null) {
    right = fish.right.value;
  } else {
    right = flatten(fish.right);
  }

  level = [left, right];
  return level;
}

function str(fish) {
  return JSON.stringify(flatten(fish));
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
