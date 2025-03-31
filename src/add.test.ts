import { add, createPt } from "./collide";

test("Add two vectors (points, really)", () => {
  const ptA = createPt(1, 2);
  const ptB = createPt(3, 4);
  const result = add(ptA, ptB);
  expect(result).toEqual(createPt(4, 6));

  // Test with negative coordinates
  const ptC = createPt(-1, -2);
  const ptD = createPt(-3, -4);
  const result2 = add(ptC, ptD);
  expect(result2).toEqual(createPt(-4, -6));

  // Test with zero coordinates
  const ptE = createPt(0, 0);
  const ptF = createPt(0, 0);
  const result3 = add(ptE, ptF);
  expect(result3).toEqual(createPt(0, 0));

  // Test with mixed coordinates
  const ptG = createPt(1, -2);
  const ptH = createPt(-3, 4);
  const result4 = add(ptG, ptH);
  expect(result4).toEqual(createPt(-2, 2));

  // Test with large coordinates
  const ptI = createPt(1000, 2000);
  const ptJ = createPt(3000, 4000);
  const result5 = add(ptI, ptJ);
  expect(result5).toEqual(createPt(4000, 6000));
});
