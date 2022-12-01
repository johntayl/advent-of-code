const path = require("path");
const { readLines } = require("../utils/file");
const Arr = require("../utils/array");
const Numbers = require("../utils/numbers");
const Vector = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

let deltas = [[0, 0, 0]]; // scanner at origin.
let tfs = new Set();

function implementation(lines = []) {
  // scanner -> all beacons
  // 1000 units away from scanner, x,y,z.
  // scanner xyz = 500,0,-500
  // beacons -500,1000,-1500 and 1501,0,-500
  // first beacon = -1000,1000,-1000 relative
  // second beacon = null
  // scanners dont know position

  // 12 common beacons, scanners are relative to each other.

  let scanners = [];
  let newScanner = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("---")) {
      // new scanner
      newScanner = [];
      continue;
    } else if (line.length == 0) {
      // skip
      scanners.push(newScanner);
      continue;
    }

    //push vector
    let [x, y, z] = line.split(",");
    newScanner.push(Vector.create(x, y, z));
  }

  scanners.push(newScanner);

  let current = scanners.shift();
  let count = 0;

  while (scanners.length > 0) {
    let updated = false;
    console.log("Scanner", count++);

    for (const scanner of scanners) {
      let out = matchCheck(current, scanner);
      if (out !== undefined) {
        current = out;
        scanners.splice(scanners.indexOf(scanner), 1);
        updated = true;
        break;
      }
    }

    if (!updated) {
      throw new Error("failed");
    }
  }

  return maxManhattan(deltas);
}

function matchCheck(scanner1, scanner2) {
  let curB = scanner2;
  let tf = [1, 2, 3];

  for (let xr = 0; xr < 4; xr++) {
    // xy rotation
    curB = curB.map((p) => [-p[1], p[0], p[2]]);
    tf = [-tf[1], tf[0], tf[2]];
    for (let yr = 0; yr < 4; yr++) {
      // yz rotation
      curB = curB.map((p) => [p[0], -p[2], p[1]]);
      tf = [tf[0], -tf[2], tf[1]];
      for (let zr = 0; zr < 4; zr++) {
        // xz rotation
        curB = curB.map((p) => [-p[2], p[1], p[0]]);
        tf = [-tf[2], tf[1], tf[0]];
        tfs = tfs.add([tf]);

        const delta = matchCheckNoRotate(scanner1, curB);
        if (delta !== undefined) {
          let aSet = new Set(scanner1);
          let bSet = new Set(curB.map((p) => Vector.add(p, delta)));
          let aCoords = Array.from(aSet).map(([x, y, z]) =>
            Arr.coordsToStr(x, y, z)
          );
          let bCoords = Array.from(bSet).map(([x, y, z]) =>
            Arr.coordsToStr(x, y, z)
          );
          let merged = new Set([...aCoords, ...bCoords]);
          deltas.push(delta);
          return Array.from(merged).map((v) => Arr.coordsToArray(v));
        }
      }
    }
  }

  return undefined;
}

function matchCheckNoRotate(a, b) {
  let aSet = new Set(
    Array.from(a).map(([x, y, z]) => Arr.coordsToStr(x, y, z))
  );
  let highestCommon = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let common = 0;
      let delta = Vector.subtract(a[i], b[j]);

      for (let k = 0; k < b.length; k++) {
        // Compare common beacons.
        let bCompare = b[k].map((p, i) => p + delta[i]);
        bCompare = Arr.coordsToStr(bCompare[0], bCompare[1], bCompare[2]);

        if (aSet.has(bCompare)) {
          common++;
        }
      }

      if (common > highestCommon) {
        highestCommon = common;
      }
      if (common >= 12) {
        // 12 common beacons
        return delta;
      }
    }
  }

  return undefined;
}

function maxManhattan(pos) {
  let max = 0;
  for (const p of pos) {
    for (const q of pos) {
      max = Math.max(
        max,
        Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2])
      );
    }
  }

  return max;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
