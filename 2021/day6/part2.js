function implementation(lines) {
  // Write here.

  let days = 256;
  let cycle = 6;
  let fishes = Array(cycle + 3).fill(0);
  // let initial = [3, 4, 3, 1, 2];
  let initial = [
    4, 1, 3, 2, 4, 3, 1, 4, 4, 1, 1, 1, 5, 2, 4, 4, 2, 1, 2, 3, 4, 1, 2, 4, 3,
    4, 5, 1, 1, 3, 1, 2, 1, 4, 1, 1, 3, 4, 1, 2, 5, 1, 4, 2, 2, 1, 1, 1, 3, 1,
    5, 3, 1, 2, 1, 1, 1, 1, 4, 1, 1, 1, 2, 2, 1, 3, 1, 3, 1, 3, 4, 5, 1, 2, 2,
    1, 1, 1, 4, 1, 5, 1, 3, 1, 3, 4, 1, 3, 2, 3, 4, 4, 4, 3, 4, 5, 1, 3, 1, 3,
    5, 1, 1, 1, 1, 1, 2, 4, 1, 2, 1, 1, 1, 5, 1, 1, 2, 1, 3, 1, 4, 2, 3, 4, 4,
    3, 1, 1, 3, 5, 3, 1, 1, 5, 2, 4, 1, 1, 3, 5, 1, 4, 3, 1, 1, 4, 2, 1, 1, 1,
    1, 1, 1, 3, 1, 1, 1, 1, 1, 4, 5, 1, 2, 5, 3, 1, 1, 3, 1, 1, 1, 1, 5, 1, 2,
    5, 1, 1, 1, 1, 1, 1, 3, 5, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 4, 5, 1, 1, 3, 1,
    5, 1, 1, 1, 1, 3, 3, 1, 1, 1, 4, 4, 1, 1, 4, 1, 2, 1, 4, 4, 1, 1, 3, 4, 3,
    5, 4, 1, 1, 4, 1, 3, 1, 1, 5, 5, 1, 2, 1, 2, 1, 2, 3, 1, 1, 3, 1, 1, 2, 1,
    1, 3, 4, 3, 1, 1, 3, 3, 5, 1, 2, 1, 4, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1,
    4, 5, 5, 1, 1, 1, 4, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 5
  ];

  initial.forEach((_) => fishes[_]++);

  debugger;

  for (let i = 0; i < days; i++) {
    const newFish = fishes[0];
    fishes.push(fishes.shift()); // cycle array elements
    fishes[cycle] += newFish;
  }

  return fishes.reduce((acc, cur) => (acc += cur));
}

function main() {
  console.time("speed");
  const result = implementation();
  console.timeEnd("speed");

  console.log(result);
}

main();
