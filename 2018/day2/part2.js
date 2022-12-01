const input = require("../input");
const entries = input.getData(__dirname + "./input.txt");

function main() {
  let maxMatch = 0;
  let entry1 = null;
  let entry2 = null;

  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries.length; j++) {
      let match = characterMatch(entries[i], entries[j]);

      if (match < entries[i].length && match > maxMatch) {
        entry1 = entries[i];
        entry2 = entries[j];
        maxMatch = match;
      }
    }
  }

  console.log(entry1);
  console.log(entry2);
  console.log(maxMatch);
}

function characterMatch(a, b) {
  let matches = 0;
  for (let i = 0; i < a.length; i++) {
    a[i] == b[i] ? matches++ : null;
  }
  return matches;
}

main();
