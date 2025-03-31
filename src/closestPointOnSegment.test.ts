import { closestPointOnSegment, createPt } from "./collide";

test("Nearest point on segment", () => {
  const ptA = createPt(2, 2); // should be on the segment
  const ptB = createPt(1, 2.5); //  inside segment, slightly above
  const ptC = createPt(1.5, -10); // outside segment, below
  const ptD = createPt(10, 15); // outside segment, above
  const segA = createPt(0, 0); // segment starts at the origin
  const segB = createPt(4, 4); // ... and ends at (4, 4). So it is a 45 degree line

  const resultA = closestPointOnSegment({ p: ptA, segA, segB });
  expect(resultA.closestPtOnSeg).toEqual(ptA);
  expect(resultA.t).toEqual(0.5);
  expect(resultA.closestPt).toEqual(ptA);

  const resultB = closestPointOnSegment({ p: ptB, segA, segB });
  expect(resultB.closestPtOnSeg).toEqual(createPt(1.75, 1.75));
  expect(resultB.t).toBeCloseTo(0.4375);

  const resultC = closestPointOnSegment({ p: ptC, segA, segB });
  expect(resultC.closestPtOnSeg).toEqual(segA);
  expect(resultC.t).toBeLessThan(0);

  const resultD = closestPointOnSegment({ p: ptD, segA, segB });
  expect(resultD.closestPtOnSeg).toEqual(segB);
  expect(resultD.t).toBeGreaterThan(1);
});
