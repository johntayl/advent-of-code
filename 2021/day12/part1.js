const path = require("path");
const { readLines } = require("../utils/file");
const filename = "./input.txt";

function implementation(lines) {
  const paths = {};
  const found = [];

  for (const line of lines) {
    const [b, e] = line.split("-");
    paths[b] = [...(paths[b] ?? []), e];
    paths[e] = [...(paths[e] ?? []), b];
  }

  function pathFind(pos, current) {
    if (pos == "end") {
      found.push([...current, pos]);
      return;
    }

    const next = [...current, pos];
    for (const cave of paths[pos])
      if (cave.toLowerCase() !== cave || !current.includes(cave))
        pathFind(cave, next);
  }

  pathFind("start", []);

  return found.length;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
