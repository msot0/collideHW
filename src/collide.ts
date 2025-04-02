// collide.ts

// ---------------------------------------------------------    [ Types ]

/** Pt represents either a 2D point in space, or a 2D vector. */
export type Pt = {
  kind: "Pt";
  x: number;
  y: number;
};

/** A polyline is a sequence of points that begin at the first point and end at
 * the last point. The sequence does _not_ wrap around. */
export type Polyline = {
  kind: "Polyline";
  vertices: Pt[]; // open path, don't repeat the first vertex
};

/** A polygon is a sequence of points that wraps around. The last point
 * implicitly forms a line segment to the first point. */
export type Polygon = {
  kind: "Polygon";
  vertices: Pt[]; // closed path, don't repeat the first vertex
};

/** A shape is any of the given types. */
export type Shape = Pt | Polyline | Polygon;

// ---------------------------------------------------------    [ Initialize ]

/** Create a 2D point with the given coordinates. */
export const createPt = (x: number, y: number): Pt => {
  return { kind: "Pt", x, y }; 
  
};

// ---------------------------------------------------------    [ Operations ]

// Hint: implement these in order for health and happiness.

/** Compute the squared distance from point a to point b. To do this, calculate
 * the difference the x and y values, square them, and add them together.*/
export const distanceSq = (a: Pt, b: Pt): number => {
  const deltaX = a.x - b.x
  const deltaY = a.y - b.y;
  return deltaX * deltaX + deltaY * deltaY ;
};

/** Compute the distance between points a and b. You can use the distanceSq
 * function to do this. Just take the square root. */
export const distance = (a: Pt, b: Pt): number => {
  return Math.sqrt(distanceSq(a,b));
};

/**
 * Dot product of two vectors a and b. This is the sum of the products of the
 * corresponding components. For example, if a = (1, 2) and b = (3, 4), then
 * the dot product is 1 * 3 + 2 * 4 = 3 + 8 = 11.
 */
export const dot = (a: Pt, b: Pt): number => {
  return a.x * b.x + a.y * b.y;
  
};

/**
 * Cross product of two two dimensional points yields a number. This is also
 * the same math that is used to find the determinant of a matrix formed by
 * these two points.
 *
 * If the matrix is like this:
 *
 * | a.x, b.x |
 * | a.y, b.y |
 *
 * Then the determinant is a.x * b.y - a.y * b.x.
 **/
export const cross = (a: Pt, b: Pt): number => {
  return a.x * b.y - a.y * b.x;
};

/** Adds two points (vectors) together. Just sum their x and y values and make a
 * new point out of those sums. */
export const add = (a: Pt, b: Pt): Pt => {
  return { kind: "Pt", x: a.x + b.x, y: a.y + b.y};

};

/** Subtracts two points (vectors): "a - b" gives you another vector that tells
 * you how far to travel in the x and y dimensions to get from b to a. For
 * example,  a = (2, 3) and b = (5, 7) gives you a - b = (-3, -4). This means
 * that to get from b to a, you need to go left 3 and down 4.
 **/
export const subtract = (a: Pt, b: Pt): Pt => {
  return {kind: "Pt", x: a.x - b.x, y: a.y - b.y};
};

/** Scale the given point (vector) by some amount. For example, if a = (3, 5)
 * and we scale it by 2, then the result is (3 * 2, 5 * 2) = (6, 10) */
export const scale = (a: Pt, s: number): Pt => {
  return { kind: "Pt", x: a.x * s, y: a.y *s};
};

/**
 * Tests if points a and b are 'close' according to the given threshold. You
 * can and should use your implementation of distanceSq or distance from above.
 **/
export const arePointsClose = (a: Pt, b: Pt, threshold: number): boolean => {
   return distanceSq(a,b) <= threshold * threshold;
};

/**
 * Tests if the given number t is within some range, which defaults to [0, 1]
 * inclusive. Example usage:
 *
 * - inRange(0.5) returns true
 * - inRange(1.5) returns false
 * - inRange(1.5, 0, 2) returns true
 **/
export const inRange = (t: number, lowerBound = 0, upperBound = 1): boolean => {
  return t >= lowerBound && t <= upperBound; 
};

/**
 * Given the input number and an optional bound (default is [0, 1]), return a
 * number that is constrained within that bounds. Example usage:
 *
 * - clamp(-0.5) returns 0 because 0 is the closest value to -0.5 in the range.
 * - clamp(0.5) returns 0.5 because it is in the range.
 * - clamp(1.5) returns 1 because 1 is the closest value to 1.5 in the range
 * - clamp(1.5, 0, 2) returns 1.5 because it is in the range.
 **/
export const clamp = (t: number, lowerBound = 0, upperBound = 1): number => {
  if (t < lowerBound) {
    return lowerBound;
  } else if (t > upperBound) {
    return upperBound; 
  } else {
    return t;
  } 
};

/**
 * Given a line segment from points segA and segB, and a third point p, compute
 * the parameter t, and the closest point to the line, and the closet point to
 * the line segment. They will be different if p projects to an extension of the
 * line segment.
 **/
export const closestPointOnSegment = ({
  segA,
  segB,
  p,
}: {
  segA: Pt;
  segB: Pt;
  p: Pt;
}): {
  t: number; // how far from segA [t=0] to segB [t=1] the closestPt is
  closestPt: Pt; // closest point on the line
  closestPtOnSeg: Pt; // closest point on the segment
} => {
  const ab = subtract(segB, segA);
  const abDotAb = dot(ab, ab);
  if (abDotAb === 0) {
    return {
      t: 0,
      closestPt: segA,
      closestPtOnSeg: segA,
    };
  }
  const ap = subtract(p, segA); 
  const t = dot(ap, ab) / abDotAb; 
  const closestPt = add(segA, scale(ab, t)); 
  const clampedT = clamp(t); 
  const closestPtOnSeg = add(segA, scale(ab, clampedT)); 


  /*
    Pseudocode taken from collision book's C++ (page 128):
    
    a and b are the endpoints of the line segment
    c is the point we're projecting onto the line
    t is the projection parameter
    d is the closest point on the line (constrained or otherwise)
    
    ab = b – a;                       : subtraction
    t = Dot(c – a, ab) / Dot(ab, ab); : subtraction, dot product and division
    d = a + t * ab;                   : scale and add

    Be aware that your code needs to also calculate a clamped version of t, and
    use that to produce the closest point on the segment. Pseudocode for that:

    clampedT = clamp(t)                : clamp
    closestPtOnSeg = a + clampedT * ab : scale and add
  */

    return {
      t,
      closestPt,
      closestPtOnSeg,
    };
};

/**
 * Given two line segments that start and end at the given locations, determine
 * if and where they intersect.
 *
 * The return value includes two numbers (t and u) that tells you how far along
 * each segment the intersection occurs. If the intersection falls somewhere
 * inside segA, thet t will be between 0 and 1. If it falls outside segA, t will
 * be either less than 0 or greater than 1.  Same thing for u and segB.
 *
 * If t and u are both between 0 and 1, the input segments intersect. Otherwise,
 * they don't. We'll return both params and the intersection point (which might
 * or might not be within both segments - you'll have to check the params to
 * know).
 *
 * If there is no intersection (i.e. the segments are parallel), return null.
 */
export const intersectSegment = ({
  segAStart,
  segAEnd,
  segBStart,
  segBEnd,
}: {
  segAStart: Pt;
  segAEnd: Pt;
  segBStart: Pt;
  segBEnd: Pt;
}): { t: number; u: number; intersectionPt: Pt } | null => {
  const segA = subtract(segAEnd, segAStart);
  const segB = subtract(segBEnd, segBStart);
  const denom = cross(segA, segB);
  if (Math.abs(denom)  < 1e-10) {
    return null;
  }
  const delta = subtract(segBStart, segAStart);
  const t = cross(delta, segB) / denom;
  const u = cross(delta, segA) / denom;
   
  const dirA = scale(segA,t);
  const intersectionPt = add(segAStart, dirA);
  return { t, u, intersectionPt };

  /*
    Pseudocode, using many of the functions you implemented above:

    segA = segAEnd - segAStart     : subtraction
    segB = segBEnd - segBStart     : subtraction
    denom = segA x segB            : cross product
    if denom is close to zero, return null
    delta = segBStart - segAStart  : subtraction
    t = (delta x segB) / denom     : cross product
    u = (delta x segA) / denom     : cross product
    dirA = segA * t                : scale segA by t amount
    intersect = segAStart + dirA   : add segAStart to dirA
    return object containing t, u, and intersect
  */

  return null as unknown as { t: number; u: number; intersectionPt: Pt };
};

/**
 * Given a point and a polygon, determine if the point is inside the polygon.
 *
 * There are several ways to do this, but a common one is to use the even-odd
 * winding number algorithm: draw a ray from the point to the right and count
 * how many times it intersects the edges of the polygon. If the number of
 * intersections is odd, the point is inside the polygon. If it's even, the
 * point is outside the polygon.
 *
 * This function assumes that the polygon is a simple polygon (no self
 * intersections) and that the point is not on the edge of the polygon. It also
 * does not support polygons with holes, so no need to worry about that.
 */
export const testPointInPolygon = ({
  pt,
  polygon,
}: {
  pt: Pt;
  polygon: Polygon;
}): boolean => {
  const vertices = polygon.vertices;
  const n = vertices.length;
  if (n < 3) {
    return false;
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % n]; 

    if (
      (v1.y > pt.y) !== (v2.y > pt.y) && 
      pt.x < ((v2.x - v1.x) * (pt.y - v1.y)) / (v2.y - v1.y) + v1.x
    ) {
      count++;
    }
  }

  return count % 2 === 1;
  /*
    Pseudocode:

    ray = horizontal line from pt to some point far to the right
    count = 0
    for each edge in polygon:
      if the edge intersects the ray:
        count += 1
    return count % 2 == 1
  */
  return false;
};
