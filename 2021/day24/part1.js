const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  const input = "11111111111111";
  const memory = { w: 0, x: 0, y: 0, z: 0 };

  const inputQueue = [...input];
  const snapshot = [];

  for (const line of lines) {
    const [cmd, a, b] = parseLine(line, memory);
    switch (cmd) {
      case "inp":
        snapshot.push([memory.z, memory.z % 26]);
        memory[a] = inputQueue.shift();
        break;
      case "add":
        memory[a] = memory[a] + b;
        break;
      case "mul":
        memory[a] = memory[a] * b;
        break;
      case "div":
        if (b > 0) {
          memory[a] = Math.trunc(memory[a] / b);
        }
        break;
      case "mod":
        if (memory[a] >= 0 && b > 0) {
          memory[a] = memory[a] % b;
        }
        break;
      case "eql":
        memory[a] = memory[a] === b ? 1 : 0;
        break;
    }
  }
  snapshot.shift();
  snapshot.push([memory.z, memory.z % 26]);
  return snapshot;
}

function parseLine(line, memory) {
  let [cmd, a, b] = line.split(" ");
  b = isNaN(b) ? memory[b] : Number(b);

  return [cmd, a, b];
}

function command(cmd, a, b, memory) {
  let scopedmemory = { ...memory };

  return scopedmemory;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
