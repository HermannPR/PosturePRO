import { Keypoint } from '@tensorflow-models/pose-detection';

/**
 * Calculate the angle between three points (in degrees)
 * @param a First point
 * @param b Vertex point (middle)
 * @param c Third point
 * @returns Angle in degrees
 */
export function calculateAngle(a: Keypoint, b: Keypoint, c: Keypoint): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
}

/**
 * Calculate Euclidean distance between two points
 */
export function calculateDistance(a: Keypoint, b: Keypoint): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

/**
 * Calculate the slope/angle of a line between two points relative to horizontal
 */
export function calculateSlope(a: Keypoint, b: Keypoint): number {
  const radians = Math.atan2(b.y - a.y, b.x - a.x);
  return (radians * 180.0) / Math.PI;
}

/**
 * Check if keypoint has sufficient confidence
 */
export function isKeypointValid(keypoint: Keypoint, minConfidence = 0.3): boolean {
  return keypoint && keypoint.score !== undefined && keypoint.score >= minConfidence;
}

/**
 * Calculate vertical distance (Y-axis only)
 */
export function calculateVerticalDistance(a: Keypoint, b: Keypoint): number {
  return Math.abs(b.y - a.y);
}

/**
 * Calculate horizontal distance (X-axis only)
 */
export function calculateHorizontalDistance(a: Keypoint, b: Keypoint): number {
  return Math.abs(b.x - a.x);
}

/**
 * Get midpoint between two keypoints
 */
export function getMidpoint(a: Keypoint, b: Keypoint): Keypoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    score: Math.min(a.score || 0, b.score || 0),
  };
}

/**
 * Normalize a value to a 0-100 scale based on expected range
 */
export function normalizeToScale(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}
