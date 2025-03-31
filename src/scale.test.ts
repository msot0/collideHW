import { createPt, scale } from "./collide";

test("Scale a point by a number", () => {
  const ptA = createPt(1, 2);
  const result = scale(ptA, 2);
  expect(result).not.toBeNull();
  expect(result.x).toBe(2);
  expect(result.y).toBe(4);
  expect(result.kind).toBe("Pt");

  const ptB = createPt(3, 4);
  const result2 = scale(ptB, 0.5);
  expect(result2).not.toBeNull();
  expect(result2.x).toBe(1.5);
  expect(result2.y).toBe(2);
  expect(result2.kind).toBe("Pt");
});
