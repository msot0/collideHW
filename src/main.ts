import p5 from "p5";
import { createSketch, SketchDef } from "./p5-util/sketch";
import { setup } from "./setup";
import { draw, drawIntersections } from "./draw";
import {
  Shape,
  Pt,
  Polyline,
  arePointsClose,
  closestPointOnSegment,
  intersectSegment,
  inRange,
  testPointInPolygon,
} from "./collide";

const geometry: Shape[] = [];
const intersections: Pt[] = [];
const selection: Shape[] = [];

const calcIntersections = () => {
  // This will detect intersections present in the geometry array and add them
  // to the intersections array. There are several kinds of intersections to
  // consider, so we'll do them in order and just add to the intersections list.

  // we only care about the last two items in the geometry array, so if there
  // aren't that many, we can bail.
  if (geometry.length < 2) {
    return;
  }

  // first remove everything from the intersections list and clear selection.
  intersections.length = 0;
  selection.length = 0;

  // for the rest of this function we only need the last two items in the
  // geometry array, so we'll just use those.
  const last = geometry[geometry.length - 1];
  const secondLast = geometry[geometry.length - 2];
  console.log(`last: ${last.kind}, secondLast: ${secondLast.kind}`);

  // If the most recent geometry is a Pt and the one before that is a Polyline,
  // "intersect" the point with the older geometry using `closestPointOnSegment`
  // for all segments.
  if (last.kind === "Pt" && secondLast.kind === "Polyline") {
    const lastIdx = secondLast.vertices.length - 1;
    for (let i = 0; i < lastIdx; i++) {
      const segA = secondLast.vertices[i];
      const segB = secondLast.vertices[(i + 1) % secondLast.vertices.length];
      const { closestPtOnSeg } = closestPointOnSegment({
        p: last,
        segA,
        segB,
      });
      intersections.push(closestPtOnSeg);
    }
  }

  // if the most recent geometry is a Pt and the one before that is not a
  // Polyline, run a point-in-polygon test with all Polygons in our shape list
  // using `testPointInPolygon`. If the point is inside a polygon, add that
  // polygon to the selected list.
  if (last.kind === "Pt" && secondLast.kind !== "Polyline") {
    for (const shape of geometry) {
      if (shape.kind === "Polygon") {
        const isInside = testPointInPolygon({
          pt: last,
          polygon: shape,
        });
        if (isInside) {
          selection.push(shape);
        }
      }
    }
  }

  // If the most recent geometry is a Polyline and the one before that is a
  // Polyline or Polygon, "intersect" the polyline with the older geometry using
  // `intersectSegment` for all sequential segments.
  if (
    last.kind === "Polyline" &&
    (secondLast.kind === "Polygon" || secondLast.kind === "Polyline")
  ) {
    console.log("doing it!");
    // eslint-disable-next-line no-debugger
    debugger;
    const lastIdx =
      secondLast.kind === "Polygon"
        ? secondLast.vertices.length
        : secondLast.vertices.length - 1;
    for (let i = 0; i < lastIdx; i++) {
      const segA = secondLast.vertices[i];
      const segB = secondLast.vertices[(i + 1) % secondLast.vertices.length];
      for (let j = 0; j < last.vertices.length - 1; j++) {
        const segC = last.vertices[j];
        const segD = last.vertices[j + 1];
        const result = intersectSegment({
          segAStart: segA,
          segAEnd: segB,
          segBStart: segC,
          segBEnd: segD,
        });
        console.log("result", result);
        if (result != null && inRange(result.t) && inRange(result.u)) {
          intersections.push(result.intersectionPt);
        }
      }
    }
  }
};

const def: SketchDef = {
  setup,
  draw: (p: p5) => {
    draw(p, geometry, selection);
    drawIntersections(p, intersections);
  },
  mouseClicked: (p, event) => {
    console.log("mouseClicked", event);
    if (event) {
      const pt: Pt = {
        kind: "Pt",
        x: event.x,
        y: event.y,
      };
      const isAccumulating = event.shiftKey;
      if (isAccumulating && geometry.length > 0) {
        // if the most recent item in geometry is a Pt, we might be creating a
        // Polyline. In that cass, pop the last point and create a Polyline with
        // the popped point as the first point, and pt as the second, and push
        // the polyline into the geometry
        const last = geometry[geometry.length - 1];
        if (last && last.kind === "Pt") {
          geometry.pop();
          const polyline: Polyline = {
            kind: "Polyline",
            vertices: [last, pt],
          };
          geometry.push(polyline);
        } else if (last && last.kind === "Polyline") {
          // otherwise if the most recent item is a Polyline, we might be adding
          // to it, or we might want to close it off if we're clicking the first
          // point in the sequence.
          if (arePointsClose(pt, last.vertices[0], 20)) {
            // closing off a polygon - turn the polyline into a polygon
            const polygon: Shape = {
              kind: "Polygon",
              vertices: [...last.vertices],
            };
            geometry.pop(); // remove the polyline
            geometry.push(polygon); // add the polygon
          } else {
            // NOT closing off a polygon, so push pt into the verts of Polyline
            last.vertices.push(pt);
          }
        }
      } else {
        // If the user isn't holding shift, just push the point into the
        // geometry
        geometry.push(pt);
      }
    }
    // now that there is new geometry, calculate the intersections
    calcIntersections();
  },
};
const sketch = createSketch(def);
new p5(sketch);
