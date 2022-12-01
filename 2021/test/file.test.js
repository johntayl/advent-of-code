const assert = require("assert");
const path = require("path");
const { readLines } = require("../utils/file");

describe("File", () => {
  describe("#readLines", () => {
    it("should read a file and return the lines.", () => {
      const lines = readLines(path.resolve(__dirname, "./input.txt"));

      assert.equal(lines.length, 4);
      assert.equal(lines[lines.length - 1], "line4");
    });
  });
});
