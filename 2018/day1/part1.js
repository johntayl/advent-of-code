// Frequency Changes

// A device needs to be calibrated before first use.
// The device shows a sequence of changes in frequency (your input).
// A value like +6 means the current frequency increases by 6;
// a value like -3 means the current frequency decreases by 3.

// For example, if the device displays frequency changes of: +1, -2, +3, +1
// then starting from a frequency of zero, the following would occur:
// - Current frequency  0, change of +1, resulting frequency  1
// - Current frequency  1, change of -2, resulting frequency -1
// - Current frequency -1, change of +3, resulting frequency  2
// - Current frequency  2, change of +1, resulting frequency  3

// In this example, the resulting frequency is 3.

// QUESTION: Given a sequence of frequency changes, starting with a frequency of zero,
// what is the resulting frequency after all of the changes in frequency
// have been applied?

// Answer 592.

// PART TWO
// You notice that the device repeats the same frequency change list over and over.
// To calibrate the device, you need to find the first frequency it reaches _twice_.

// For example, using the same list of changes above, the device would loop as follows:
// - Current frequency  0, change of +1, resulting frequency  1
// - Current frequency  1, change of -2, resulting frequency -1
// - Current frequency -1, change of +3, resulting frequency  2
// - Current frequency  2, change of +1, resulting frequency  3
// - At this point, the device continues from the start of the list.
// - Current frequency  3, change of +1, resulting frequency  4
// - Current frequency  4, change of -2, resulting frequency  2, which has alread been seen.

// In this example, the first frequency reached twice is 2. Note that the device
// may need to repeat its list many times before a duplicate frequency is found
// and that duplicates may appear in the middle of processing the list.

// Other examples:
// +1, -1 first reaches 0 twice
// +3, +3, +4, -2, -4 first reaches 10 twice
// -6, +3, +8, +5, -6 first reaches 5 twice
// +7, +7, -2, -7, -4 first reaches 14 twice

// ANSWER: 241

const fs = require("fs");
const readfile = fs.readFileSync(__dirname + "/input.txt");
const inputString = readfile.toString();
let frequency = 0;
let changes = inputString.split("\n");

changes.forEach(fq => {
  let sign = fq[0];
  let amount = parseInt(fq.substr(1));
  if (sign == "+") frequency += amount;
  else sign === "-";
  frequency -= amount;
});
