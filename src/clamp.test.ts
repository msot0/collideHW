import { clamp } from "./collide";

test("Clamp function", () => {
  const result = clamp(0.25);
  expect(result).toBe(0.25); // within bounds
  const result2 = clamp(-0.5);
  expect(result2).toBe(0); // below lower bound
  const result3 = clamp(1.5);
  expect(result3).toBe(1); // above upper bound
  const result4 = clamp(0);
  expect(result4).toBe(0); // at lower bound
  const result5 = clamp(1);
  expect(result5).toBe(1); // at upper bound
  const result6 = clamp(0.5, 0.2, 0.8);
  expect(result6).toBe(0.5); // within custom bounds
  const result7 = clamp(0.1, 0.2, 0.8);
  expect(result7).toBe(0.2); // below custom lower bound
  const result8 = clamp(0.9, 0.2, 0.8);
  expect(result8).toBe(0.8); // above custom upper bound
});
