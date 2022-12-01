const crypto = require("crypto");

function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

function checkHash(hash) {
  return hash.slice(0, 6) === "000000";
}

const key = "yzbqklnj";

let currentNumber = 0;
const start = Date.now();
while (true) {
  const input = `${key}${currentNumber}`;
  hash = md5(input);

  if (checkHash(hash)) break;
  currentNumber++;
}

const end = Date.now();

console.log("Done in ", (end - start) / 1000, "s");
console.log(currentNumber); // 282750
