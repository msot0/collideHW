import { createPt, subtract } from "./collide";

test("Vector subtraction", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(3, 4);
  const result = subtract(ptA, ptB);
  expect(result).not.toBeNull();
  expect(result.x).toBe(-2);
  expect(result.y).toBe(-2);
  expect(result.kind).toBe("Pt");

  const ptC = createPt(5, 9);
  const result2 = subtract(ptC, ptA);
  expect(result2).not.toBeNull();
  expect(result2.x).toBe(4);
  expect(result2.y).toBe(7);
  expect(result2.kind).toBe("Pt");
});
