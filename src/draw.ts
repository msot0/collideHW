import type p5 from "p5";
import { Shape, Polyline, Pt, Polygon } from "./collide";

const colors = {
  pt: "pink",
  polyline: "black",
  polygon: "lightblue",
  intersection: "red",
  selection: "lightgreen",
};

export const draw = (p: p5, geom: Shape[], selection: Shape[]): void => {
  p.push();
  p.background(220);
  if (geom) {
    for (const shape of geom) {
      if (shape.kind === "Pt") {
        drawPt(p, shape);
      } else if (shape.kind === "Polyline") {
        drawPolyline(p, shape);
      } else if (shape.kind === "Polygon") {
        drawPolygon(p, shape, selection.includes(shape));
      }
    }
  }
  p.pop();
};

export const drawIntersections = (p: p5, intersections: Pt[]): void => {
  p.push();
  // draw a small X at each intersection point
  p.stroke(colors.intersection);
  for (const pt of intersections) {
    p.line(pt.x - 5, pt.y - 5, pt.x + 5, pt.y + 5);
    p.line(pt.x - 5, pt.y + 5, pt.x + 5, pt.y - 5);
  }
  p.pop();
};

const drawPt = (p: p5, pt: Pt): void => {
  p.push();
  p.fill(colors.pt);
  p.stroke(colors.polyline);
  p.ellipse(pt.x, pt.y, 10, 10);
  p.pop();
};

const drawPolyline = (p: p5, polyline: Polyline) => {
  p.push();
  p.stroke(colors.polyline);
  for (let i = 0; i < polyline.vertices.length - 1; i++) {
    const ptA = polyline.vertices[i];
    const ptB = polyline.vertices[i + 1];
    p.line(ptA.x, ptA.y, ptB.x, ptB.y);
  }
  for (const pt of polyline.vertices) {
    p.ellipse(pt.x, pt.y, 3, 3);
  }
  p.pop();
};

const drawPolygon = (p: p5, polygon: Polygon, isSelected = false) => {
  p.push();
  p.stroke(colors.polyline);
  if (isSelected) {
    p.fill(colors.selection);
  } else {
    p.fill(colors.polygon);
  }
  p.beginShape();
  for (const pt of polygon.vertices) {
    p.vertex(pt.x, pt.y);
  }
  p.endShape(p.CLOSE);
  p.pop();
};
