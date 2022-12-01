const data = require("./data");

function doubleLetter(str) {
  let isValid = false;
  let hasPair = false;
  let hasBetween = false;
  for (let i = 0; i < str.length; i++) {
    // num pairs
    const pair = str[i] + str[i + 1];

    if (countOccurences(str, pair) > 1) {
      hasPair = pair;
    }

    if (str[i] === str[i + 2] && str[i] !== str[i + 1]) {
      hasBetween = str[i] + str[i + 1] + str[i + 2];
    }

    if (hasPair && hasBetween) {
      console.log(hasBetween, hasPair, str);
      return true;
    }
  }

  return false;
}

function countOccurences(string, word) {
  return string.split(word).length - 1;
}

function niceString(str) {
  return doubleLetter(str);
}

console.log(niceString("qjhvhtzxzqqjkmpb"));
console.log(niceString("xxyxx"));
console.log(niceString("uurcxstgmygtbstg"));
console.log(niceString("ieodomkazucvgmuy"));

const totalNice = data.reduce((total, str) => {
  if (niceString(str)) {
    console.log(str);
    return total + 1;
  }
  return total;
}, 0);

console.log(data.length);
console.log(totalNice); // 67 -  WRONG!!
