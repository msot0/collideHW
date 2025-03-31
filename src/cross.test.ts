import { createPt, cross } from "./collide";

test("Cross product of two vectors", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(3, 4);
  const result = cross(ptA, ptB);
  expect(result).toBeCloseTo(-2);

  // Test with negative coordinates
  const ptC = createPt(-1, -2);
  const ptD = createPt(-3, -4);
  const result2 = cross(ptC, ptD);
  expect(result2).toBeCloseTo(-2);

  // Test with zero coordinates
  const ptE = createPt(0, 0);
  const ptF = createPt(0, 0);
  const result3 = cross(ptE, ptF);
  expect(result3).toBeCloseTo(0);

  // Test with (0, 0) and (4, 6)
  const ptG = createPt(0, 0);
  const ptH = createPt(4, 6);
  const result4 = cross(ptG, ptH);
  expect(result4).toBeCloseTo(0);

  // test with parallel vectors
  const ptI = createPt(1, 2);
  const ptJ = createPt(2, 4);
  const result5 = cross(ptI, ptJ);
  expect(result5).toBeCloseTo(0);
});
