import { createPt } from "./collide";

test("Dot product", () => {
  const a = createPt(1, 2);
  const b = createPt(3, 4);
  const result = a.x * b.x + a.y * b.y;
  expect(result).toBe(11); // 1 * 3 + 2 * 4 = 3 + 8 = 11, yo.

  const c = createPt(0, 0);
  const d = createPt(0, 0);
  const result2 = c.x * d.x + c.y * d.y;
  expect(result2).toBe(0); // 0 * 0 + 0 * 0 = 0, yo..

  const e = createPt(1, 0);
  const f = createPt(0, 1);
  const result3 = e.x * f.x + e.y * f.y;
  expect(result3).toBe(0); // 1 * 0 + 0 * 1 = 0, yo...
  const g = createPt(-1, -9);
  const h = createPt(-6, 2);
  const result4 = g.x * h.x + g.y * h.y;
  expect(result4).toBe(6 + -18); // -1 * -6 + -9 * 2 = 6 - 18 = 24, yo....
});
