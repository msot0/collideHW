import { createPt, arePointsClose } from "./collide";

test("Are points close?", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(1, 2); // b to c is sqrt(3^2 + 4^2) = 5
  const ptC = createPt(4, 6);
  const threshold = 4; // points within this range are considered close

  expect(arePointsClose(ptA, ptB, threshold)).toBe(true); // Same point
  expect(arePointsClose(ptA, ptC, threshold)).toBe(false); // Different points
  expect(arePointsClose(ptA, ptC, 3)).toBe(false); // Different points with smaller threshold
});
