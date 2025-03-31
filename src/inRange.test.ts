import { inRange } from "./collide";

test("inRange", () => {
  expect(inRange(0)).toBe(true);
  expect(inRange(0.5)).toBe(true);
  expect(inRange(1)).toBe(true);
  expect(inRange(-0.5)).toBe(false);
  expect(inRange(1.5)).toBe(false);
  expect(inRange(0, -1, 1)).toBe(true);
  expect(inRange(0.5, -1, 1)).toBe(true);
  expect(inRange(1, -1, 1)).toBe(true);
  expect(inRange(1.001)).toBe(false);
  expect(inRange(1.001, 1, 2)).toBe(true);
});
