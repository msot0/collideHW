import { createPt, Polygon, testPointInPolygon } from "./collide";

test("Is point in polygon", () => {
  const polygon: Polygon = {
    kind: "Polygon",
    // square from (0, 0) to (4, 4)
    vertices: [createPt(0, 0), createPt(4, 0), createPt(4, 4), createPt(0, 4)],
  };
  const ptA = createPt(2, 2);
  const resultA = testPointInPolygon({ pt: ptA, polygon });
  expect(resultA).toBe(true);

  const ptB = createPt(5, 5);
  const resultB = testPointInPolygon({ pt: ptB, polygon });
  expect(resultB).toBe(false);

  // test a point that is outside the polygon but within its y-range
  const ptC = createPt(5, 2);
  const resultC = testPointInPolygon({ pt: ptC, polygon });
  expect(resultC).toBe(false);

  // test a point that is outside the polygon but within its x-range
  const ptD = createPt(2, 5);
  const resultD = testPointInPolygon({ pt: ptD, polygon });
  expect(resultD).toBe(false);

  // this test doesn't look for boundary conditions at all. If this was a real
  // library, boundary conditions would be tested as well. For example, a point
  // on the edge of the polygon should return true.
});
