const data = require("./data");

function doubleLetter(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }

  return false;
}

function countOccurences(string, word) {
  return string.split(word).length - 1;
}

function niceString(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const blacklisted = ["ab", "cd", "pq", "xy"];
  let hasBlacklist = false;

  blacklisted.forEach((black) => {
    if (countOccurences(str, black) > 0) {
      hasBlacklist = true;
    }
  });

  if (hasBlacklist) return false;

  const vowelCount = vowels.reduce((total, v) => {
    return total + countOccurences(str, v);
  }, 0);

  return vowelCount >= 3 && doubleLetter(str);
}

console.log(niceString("ugknbfddgicrmopn"));
console.log(niceString("aaa"));
console.log(niceString("jchzalrnumimnmhp"));
console.log(niceString("haegwjzuvuyypxyu"));
console.log(niceString("dvszwmarrgswjxmb"));

const totalNice = data.reduce((total, str) => {
  if (niceString(str)) return total + 1;
  return total;
}, 0);

console.log(totalNice); // 238
