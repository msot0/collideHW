import { createPt, intersectSegment } from "./collide";

test("Segment/segment intersection", () => {
  // and segments ab, cd, ce, and cf
  const ptA = createPt(2, 3);
  const ptB = createPt(6, 8);
  const ptC = createPt(3, 7);
  const ptD = createPt(7, 12);
  const ptE = createPt(5, 2);
  const ptF = createPt(9, 10);

  // test intersections:
  // ab should be parallel to cd
  // ce should cross ab on the inside of both segments
  // cf should cross ab outside of ab and inside of cf

  const resultABCD = intersectSegment({
    segAStart: ptA,
    segAEnd: ptB,
    segBStart: ptC,
    segBEnd: ptD,
  });
  expect(resultABCD).toBeNull(); // indicates parallel

  const resultABCE = intersectSegment({
    segAStart: ptA,
    segAEnd: ptB,
    segBStart: ptC,
    segBEnd: ptE,
  });
  expect(resultABCE).not.toBeNull();
  if (resultABCE != null) {
    expect(resultABCE.t).toBeCloseTo(0.4333);
    expect(resultABCE.u).toBeCloseTo(0.3666);
    expect(resultABCE.intersectionPt).not.toBeNull();
    expect(resultABCE.intersectionPt.x).toBeCloseTo(3.733);
    expect(resultABCE.intersectionPt.y).toBeCloseTo(5.166);
  }
  const resultABCF = intersectSegment({
    segAStart: ptA,
    segAEnd: ptB,
    segBStart: ptC,
    segBEnd: ptF,
  });
  expect(resultABCF).not.toBeNull();
  if (resultABCF != null) {
    console.log(resultABCF);
    expect(resultABCF.t).toBeCloseTo(1.1666);
    expect(resultABCF.u).toBeCloseTo(0.6111);
    expect(resultABCF.intersectionPt).not.toBeNull();
    expect(resultABCF.intersectionPt.x).toBeCloseTo(6.6666);
    expect(resultABCF.intersectionPt.y).toBeCloseTo(8.833);
  }
});
