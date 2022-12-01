const assert = require("assert");
const Numbers = require("../utils/numbers");

describe("Numbers", () => {
  describe("#bin2int", () => {
    it("convert binary to integer", () => {
      assert.equal(Numbers.bin2int("0001"), 1);
      assert.equal(Numbers.bin2int("0010"), 2);
      assert.equal(Numbers.bin2int("0100"), 4);
      assert.equal(Numbers.bin2int("1000"), 8);
      assert.equal(Numbers.bin2int("1111"), 15);
    });
  });

  describe("#bin2hex", () => {
    it("convert binary to hex", () => {
      assert.equal(Numbers.bin2hex("0001"), "1");
      assert.equal(Numbers.bin2hex("0010"), "2");
      assert.equal(Numbers.bin2hex("0100"), "4");
      assert.equal(Numbers.bin2hex("1000"), "8");
      assert.equal(Numbers.bin2hex("1111"), "F");
      assert.equal(Numbers.bin2hex("11110010"), "F2");
    });
  });

  describe("#hex2bin", () => {
    it("convert hex to bin", () => {
      assert.equal(Numbers.hex2bin("1"), "00000001");
      assert.equal(Numbers.hex2bin("2"), "00000010");
      assert.equal(Numbers.hex2bin("4"), "00000100");
      assert.equal(Numbers.hex2bin("8"), "00001000");
      assert.equal(Numbers.hex2bin("F"), "00001111");
      assert.equal(Numbers.hex2bin("F2"), "11110010");
    });
  });
});
