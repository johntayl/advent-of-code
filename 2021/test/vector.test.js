const assert = require("assert");
const Vector = require("../utils/vector");

describe("Vector", () => {
  describe("#add", () => {
    it("should add (2,3) (-3,2) points together", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(-3, 2);

      const c = Vector.add(a, b);

      assert.equal(c[0], -1);
      assert.equal(c[1], 5);
    });

    it("should add (1,2) (3,4) points together", () => {
      const a = Vector.create(1, 2);
      const b = Vector.create(3, 4);

      const c = Vector.add(a, b);

      assert.equal(c[0], 4);
      assert.equal(c[1], 6);
    });
  });

  describe("#subtract", () => {
    it("should subtract (2,3) (-3,2) points together", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(-3, 2);

      const c = Vector.subtract(a, b);

      assert.equal(c[0], 5);
      assert.equal(c[1], 1);
    });

    it("should subtract (1,2) (3,4) points together", () => {
      const a = Vector.create(1, 2);
      const b = Vector.create(3, 4);

      const c = Vector.subtract(a, b);

      assert.equal(c[0], -2);
      assert.equal(c[1], -2);
    });
  });

  describe("#isHorizontal", () => {
    it("should detect horizontal vector", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(6, 3);

      const c = Vector.isHorizontal(a, b);

      assert.equal(c, true);
    });

    it("should not detect horizontal vector", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(1, 6);

      const c = Vector.isHorizontal(a, b);

      assert.equal(c, false);
    });
  });

  describe("#isVertical", () => {
    it("should detect vertical vector", () => {
      const a = Vector.create(3, 3);
      const b = Vector.create(3, 6);

      const c = Vector.isVertical(a, b);

      assert.equal(c, true);
    });

    it("should not detect vertical vector", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(1, 6);

      const c = Vector.isVertical(a, b);

      assert.equal(c, false);
    });
  });

  describe("#isEqual", () => {
    it("should detect equal vectors", () => {
      const a = Vector.create(3, 3);
      const b = Vector.create(3, 3);

      const c = Vector.isEqual(a, b);

      assert.equal(c, true);
    });

    it("should detect not equal vector", () => {
      const a = Vector.create(2, 3);
      const b = Vector.create(1, 6);

      const c = Vector.isEqual(a, b);

      assert.equal(c, false);
    });
  });
});
