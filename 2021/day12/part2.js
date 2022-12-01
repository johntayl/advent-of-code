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
    if (pos === "start" && current.length > 0) return;
    if (pos == "end") {
      found.push([...current, pos]);
      return;
    }

    const next = [...current, pos];
    const counts = {};

    for (const a of next)
      if (a.toLowerCase() === a) counts[a] = (counts[a] ?? 0) + 1;

    const hasLowDup = Object.values(counts).some((v) => v > 1);

    for (const dir of paths[pos])
      if (!hasLowDup || dir.toLowerCase() !== dir || !current.includes(dir))
        pathFind(dir, next);
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
