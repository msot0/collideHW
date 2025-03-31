import { createPt, distance, distanceSq } from "./collide";

test("Actual distance between two points", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(4, 6);
  const result = distance(ptA, ptB);
  expect(result).toBeCloseTo(5.0);

  // Test with negative coordinates
  const ptC = createPt(-1, -2);
  const ptD = createPt(-4, -6);
  const result2 = distance(ptC, ptD);
  expect(result2).toBeCloseTo(5.0);

  // Test with zero coordinates
  const ptE = createPt(0, 0);
  const ptF = createPt(0, 0);
  const result3 = distance(ptE, ptF);
  expect(result3).toBeCloseTo(0.0);
});

test("Squared distance between two points", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(4, 6);
  const result = distanceSq(ptA, ptB);
  expect(result).toBeCloseTo(25.0);

  // Test with negative coordinates
  const ptC = createPt(-1, -2);
  const ptD = createPt(-4, -6);
  const result2 = distanceSq(ptC, ptD);
  expect(result2).toBeCloseTo(25.0);

  // Test with zero coordinates
  const ptE = createPt(0, 0);
  const ptF = createPt(0, 0);
  const result3 = distanceSq(ptE, ptF);
  expect(result3).toBeCloseTo(0.0);

  // Test with mixed coordinates
  const ptG = createPt(1, -2); // 4^2 + 6^2
  const ptH = createPt(-3, 4);
  const result4 = distanceSq(ptG, ptH);
  expect(result4).toBeCloseTo(52.0);
});
