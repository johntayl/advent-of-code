const assert = require("assert");
const { array2d, multiply, chunk } = require("../utils/array");

describe("Array", () => {
  describe("#array2d", () => {
    it("should return a 10x10 2d array filled with 0", () => {
      const array = array2d(10, 10, 0);

      assert.equal(array.length, 10);
      assert.equal(array[0].length, 10);
    });

    it("should return a 5x10 2d array filled with 0", () => {
      const array = array2d(5, 10, 0);

      assert.equal(array.length, 5);
      assert.equal(array[0].length, 10);
    });
  });

  describe("#multiply", () => {
    it("multiply array values", () => {
      const value = multiply([9, 9, 14]);

      assert.equal(value, 1134);
    });
  });

  describe("#chunk", () => {
    it("should chunk into 2", () => {
      let arr = [1, 2, 3, 4];

      let chunked = chunk(arr, 2);

      assert.equal(chunked[0][0], 1);
      assert.equal(chunked[0][1], 2);
      assert.equal(chunked[1][0], 3);
      assert.equal(chunked[1][1], 4);
    });

    it("should chunk into 3", () => {
      let arr = [1, 2, 3, 4, 5, 6];

      let chunked = chunk(arr, 2);

      assert.equal(chunked[0][0], 1);
      assert.equal(chunked[0][1], 2);
      assert.equal(chunked[1][0], 3);
      assert.equal(chunked[1][1], 4);
      assert.equal(chunked[2][0], 5);
      assert.equal(chunked[2][1], 6);
    });
  });
});
