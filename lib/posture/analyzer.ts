import { Pose, Keypoint } from '@tensorflow-models/pose-detection';
import { PostureIssue, PostureAnalysis } from '@/types/posture';
import {
  calculateAngle,
  calculateDistance,
  calculateVerticalDistance,
  calculateHorizontalDistance,
  isKeypointValid,
  getMidpoint,
} from './geometry';

// Keypoint indices for MediaPipe Pose
const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_EYE: 1,
  RIGHT_EYE: 2,
  LEFT_EAR: 3,
  RIGHT_EAR: 4,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
};

/**
 * Analyze a detected pose for posture issues
 */
export function analyzePose(pose: Pose, viewAngle: 'side' | 'front' = 'side'): PostureAnalysis {
  const keypoints = pose.keypoints;
  const issues: PostureIssue[] = [];

  if (viewAngle === 'side') {
    // Detect side-view issues
    const forwardHeadIssue = detectForwardHead(keypoints);
    if (forwardHeadIssue) issues.push(forwardHeadIssue);

    const roundedShouldersIssue = detectRoundedShoulders(keypoints);
    if (roundedShouldersIssue) issues.push(roundedShouldersIssue);

    const slouchingIssue = detectSlouchingSide(keypoints);
    if (slouchingIssue) issues.push(slouchingIssue);

    const pelvicTiltIssue = detectPelvicTilt(keypoints);
    if (pelvicTiltIssue) issues.push(pelvicTiltIssue);
  } else {
    // Detect front-view issues
    const shoulderAsymmetryIssue = detectShoulderAsymmetry(keypoints);
    if (shoulderAsymmetryIssue) issues.push(shoulderAsymmetryIssue);

    const headTiltIssue = detectHeadTilt(keypoints);
    if (headTiltIssue) issues.push(headTiltIssue);
  }

  const score = calculatePostureScore(issues);

  return {
    score,
    issues,
    timestamp: Date.now(),
    viewAngle,
  };
}

/**
 * Detect forward head posture (ear should be aligned with shoulder)
 */
function detectForwardHead(keypoints: Keypoint[]): PostureIssue | null {
  const ear = keypoints[POSE_LANDMARKS.LEFT_EAR] || keypoints[POSE_LANDMARKS.RIGHT_EAR];
  const shoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER] || keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];
  const hip = keypoints[POSE_LANDMARKS.LEFT_HIP] || keypoints[POSE_LANDMARKS.RIGHT_HIP];

  if (!isKeypointValid(ear) || !isKeypointValid(shoulder) || !isKeypointValid(hip)) {
    return null;
  }

  // Calculate horizontal distance between ear and shoulder
  const horizontalDistance = ear.x - shoulder.x;

  // Calculate reference distance (shoulder to hip) for normalization
  const torsoLength = calculateDistance(shoulder, hip);
  const normalizedDistance = (horizontalDistance / torsoLength) * 100;

  // Thresholds (ear should be roughly above shoulder)
  // Positive value means ear is forward of shoulder
  if (normalizedDistance > 15) {
    return {
      type: 'forward_head',
      severity: 'severe',
      deviation: normalizedDistance,
      message: 'Significant forward head posture detected',
      tip: 'Try chin tucks: gently pull your chin back to align ears over shoulders. Adjust monitor height to eye level.',
      exerciseId: 'chin-tucks',
    };
  } else if (normalizedDistance > 8) {
    return {
      type: 'forward_head',
      severity: 'moderate',
      deviation: normalizedDistance,
      message: 'Moderate forward head posture',
      tip: 'Your head is slightly forward. Practice chin tucks and check your screen position.',
      exerciseId: 'chin-tucks',
    };
  } else if (normalizedDistance > 3) {
    return {
      type: 'forward_head',
      severity: 'minor',
      deviation: normalizedDistance,
      message: 'Slight forward head posture',
      tip: 'Minor deviation detected. Be mindful of head position during extended sitting.',
      exerciseId: 'chin-tucks',
    };
  }

  return {
    type: 'forward_head',
    severity: 'good',
    deviation: normalizedDistance,
    message: 'Good head alignment',
    tip: 'Keep maintaining this posture!',
  };
}

/**
 * Detect rounded shoulders (shoulder-elbow-hip angle)
 */
function detectRoundedShoulders(keypoints: Keypoint[]): PostureIssue | null {
  const shoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER] || keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];
  const elbow = keypoints[POSE_LANDMARKS.LEFT_ELBOW] || keypoints[POSE_LANDMARKS.RIGHT_ELBOW];
  const hip = keypoints[POSE_LANDMARKS.LEFT_HIP] || keypoints[POSE_LANDMARKS.RIGHT_HIP];
  const ear = keypoints[POSE_LANDMARKS.LEFT_EAR] || keypoints[POSE_LANDMARKS.RIGHT_EAR];

  if (!isKeypointValid(shoulder) || !isKeypointValid(hip) || !isKeypointValid(ear)) {
    return null;
  }

  // Check if shoulders are rotated forward by comparing shoulder position to ear-hip line
  const shoulderToEarDistance = calculateHorizontalDistance(shoulder, ear);
  const shoulderToHipDistance = calculateVerticalDistance(shoulder, hip);

  // Shoulder should be relatively in-line vertically, not too far forward
  const forwardRatio = (shoulder.x - hip.x) / shoulderToHipDistance * 100;

  if (forwardRatio > 20) {
    return {
      type: 'rounded_shoulders',
      severity: 'severe',
      angle: forwardRatio,
      message: 'Significantly rounded shoulders',
      tip: 'Practice shoulder blade squeezes. Pull shoulders back and down. Consider doorway stretches.',
      exerciseId: 'shoulder-rolls',
    };
  } else if (forwardRatio > 12) {
    return {
      type: 'rounded_shoulders',
      severity: 'moderate',
      angle: forwardRatio,
      message: 'Moderately rounded shoulders',
      tip: 'Your shoulders are rolling forward. Try shoulder blade squeezes throughout the day.',
      exerciseId: 'shoulder-rolls',
    };
  } else if (forwardRatio > 6) {
    return {
      type: 'rounded_shoulders',
      severity: 'minor',
      angle: forwardRatio,
      message: 'Slight shoulder rounding',
      tip: 'Minor forward shoulder position. Practice maintaining shoulders back and down.',
      exerciseId: 'shoulder-rolls',
    };
  }

  return {
    type: 'rounded_shoulders',
    severity: 'good',
    angle: forwardRatio,
    message: 'Good shoulder position',
    tip: 'Great shoulder alignment!',
  };
}

/**
 * Detect shoulder asymmetry (one shoulder higher than the other)
 */
function detectShoulderAsymmetry(keypoints: Keypoint[]): PostureIssue | null {
  const leftShoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER];
  const rightShoulder = keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];

  if (!isKeypointValid(leftShoulder) || !isKeypointValid(rightShoulder)) {
    return null;
  }

  const heightDifference = Math.abs(leftShoulder.y - rightShoulder.y);
  const shoulderWidth = calculateDistance(leftShoulder, rightShoulder);
  const asymmetryRatio = (heightDifference / shoulderWidth) * 100;

  const higherSide = leftShoulder.y < rightShoulder.y ? 'left' : 'right';

  if (asymmetryRatio > 8) {
    return {
      type: 'shoulder_asymmetry',
      severity: 'severe',
      deviation: asymmetryRatio,
      message: `${higherSide} shoulder significantly higher`,
      tip: `Your ${higherSide} shoulder is elevated. Check desk setup symmetry and practice shoulder leveling exercises.`,
      exerciseId: 'shoulder-shrugs',
    };
  } else if (asymmetryRatio > 5) {
    return {
      type: 'shoulder_asymmetry',
      severity: 'moderate',
      deviation: asymmetryRatio,
      message: `${higherSide} shoulder moderately higher`,
      tip: `Noticeable shoulder height difference. Be mindful of symmetry in your sitting position.`,
      exerciseId: 'shoulder-shrugs',
    };
  } else if (asymmetryRatio > 2.5) {
    return {
      type: 'shoulder_asymmetry',
      severity: 'minor',
      deviation: asymmetryRatio,
      message: 'Slight shoulder asymmetry',
      tip: 'Minor shoulder height difference detected. Monitor over time.',
      exerciseId: 'shoulder-shrugs',
    };
  }

  return {
    type: 'shoulder_asymmetry',
    severity: 'good',
    deviation: asymmetryRatio,
    message: 'Shoulders level',
    tip: 'Good shoulder symmetry!',
  };
}

/**
 * Detect slouching in side view (hip-shoulder-ear angle)
 */
function detectSlouchingSide(keypoints: Keypoint[]): PostureIssue | null {
  const ear = keypoints[POSE_LANDMARKS.LEFT_EAR] || keypoints[POSE_LANDMARKS.RIGHT_EAR];
  const shoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER] || keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];
  const hip = keypoints[POSE_LANDMARKS.LEFT_HIP] || keypoints[POSE_LANDMARKS.RIGHT_HIP];

  if (!isKeypointValid(ear) || !isKeypointValid(shoulder) || !isKeypointValid(hip)) {
    return null;
  }

  const angle = calculateAngle(hip, shoulder, ear);

  // Ideal posture: ~170-180 degrees (almost straight line)
  // Slouching: angle decreases significantly
  if (angle < 140) {
    return {
      type: 'slouching',
      severity: 'severe',
      angle,
      message: 'Severe slouching detected',
      tip: 'Sit upright with core engaged. Adjust chair height so feet are flat and hips slightly above knees.',
      exerciseId: 'core-engagement',
    };
  } else if (angle < 155) {
    return {
      type: 'slouching',
      severity: 'moderate',
      angle,
      message: 'Moderate slouching',
      tip: 'Your posture is hunched. Sit back in your chair and engage your core muscles.',
      exerciseId: 'core-engagement',
    };
  } else if (angle < 165) {
    return {
      type: 'slouching',
      severity: 'minor',
      angle,
      message: 'Slight slouching',
      tip: 'Minor slouch detected. Focus on sitting tall with shoulders back.',
      exerciseId: 'core-engagement',
    };
  }

  return {
    type: 'slouching',
    severity: 'good',
    angle,
    message: 'Good upright posture',
    tip: 'Excellent sitting posture!',
  };
}

/**
 * Detect anterior pelvic tilt
 */
function detectPelvicTilt(keypoints: Keypoint[]): PostureIssue | null {
  const shoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER] || keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];
  const hip = keypoints[POSE_LANDMARKS.LEFT_HIP] || keypoints[POSE_LANDMARKS.RIGHT_HIP];
  const knee = keypoints[POSE_LANDMARKS.LEFT_KNEE] || keypoints[POSE_LANDMARKS.RIGHT_KNEE];

  if (!isKeypointValid(shoulder) || !isKeypointValid(hip) || !isKeypointValid(knee)) {
    return null;
  }

  // Check if hip is too far forward relative to vertical alignment
  const hipToKneeHorizontal = Math.abs(hip.x - knee.x);
  const hipToShoulderVertical = calculateVerticalDistance(hip, shoulder);
  const tiltRatio = (hipToKneeHorizontal / hipToShoulderVertical) * 100;

  if (tiltRatio > 25) {
    return {
      type: 'pelvic_tilt',
      severity: 'moderate',
      angle: tiltRatio,
      message: 'Possible anterior pelvic tilt',
      tip: 'Your hips may be tilted forward. Strengthen core and glutes, stretch hip flexors.',
      exerciseId: 'hip-flexor-stretch',
    };
  } else if (tiltRatio > 15) {
    return {
      type: 'pelvic_tilt',
      severity: 'minor',
      angle: tiltRatio,
      message: 'Slight pelvic misalignment',
      tip: 'Minor hip positioning issue. Focus on neutral spine when sitting.',
      exerciseId: 'hip-flexor-stretch',
    };
  }

  return null; // Only report if there's an issue
}

/**
 * Detect head tilt in front view
 */
function detectHeadTilt(keypoints: Keypoint[]): PostureIssue | null {
  const leftEar = keypoints[POSE_LANDMARKS.LEFT_EAR];
  const rightEar = keypoints[POSE_LANDMARKS.RIGHT_EAR];
  const nose = keypoints[POSE_LANDMARKS.NOSE];

  if (!isKeypointValid(leftEar) || !isKeypointValid(rightEar)) {
    return null;
  }

  const earHeightDiff = Math.abs(leftEar.y - rightEar.y);
  const earDistance = calculateDistance(leftEar, rightEar);
  const tiltRatio = (earHeightDiff / earDistance) * 100;

  const tiltDirection = leftEar.y < rightEar.y ? 'left' : 'right';

  if (tiltRatio > 15) {
    return {
      type: 'head_tilt',
      severity: 'moderate',
      angle: tiltRatio,
      message: `Head tilted ${tiltDirection}`,
      tip: `Your head is tilted to the ${tiltDirection}. Level your head and check monitor position.`,
      exerciseId: 'neck-stretches',
    };
  } else if (tiltRatio > 8) {
    return {
      type: 'head_tilt',
      severity: 'minor',
      angle: tiltRatio,
      message: `Slight head tilt ${tiltDirection}`,
      tip: `Minor head tilt detected. Be mindful of keeping head level.`,
      exerciseId: 'neck-stretches',
    };
  }

  return null;
}

/**
 * Calculate overall posture score based on detected issues
 */
function calculatePostureScore(issues: PostureIssue[]): number {
  let score = 100;

  for (const issue of issues) {
    switch (issue.severity) {
      case 'severe':
        score -= 20;
        break;
      case 'moderate':
        score -= 12;
        break;
      case 'minor':
        score -= 6;
        break;
      case 'good':
        // No deduction for good posture
        break;
    }
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Determine if user is in side view or front view based on pose
 */
export function determineViewAngle(keypoints: Keypoint[]): 'side' | 'front' {
  const leftShoulder = keypoints[POSE_LANDMARKS.LEFT_SHOULDER];
  const rightShoulder = keypoints[POSE_LANDMARKS.RIGHT_SHOULDER];
  const leftHip = keypoints[POSE_LANDMARKS.LEFT_HIP];
  const rightHip = keypoints[POSE_LANDMARKS.RIGHT_HIP];

  // If both shoulders and hips are clearly visible, it's likely front view
  const bothShouldersVisible = isKeypointValid(leftShoulder, 0.4) && isKeypointValid(rightShoulder, 0.4);
  const bothHipsVisible = isKeypointValid(leftHip, 0.3) && isKeypointValid(rightHip, 0.3);

  if (bothShouldersVisible && bothHipsVisible) {
    const shoulderDistance = calculateDistance(leftShoulder, rightShoulder);
    const hipDistance = calculateDistance(leftHip, rightHip);

    // In side view, shoulder distance would be very small
    // Use a threshold to determine
    if (shoulderDistance > 50) { // Adjust threshold based on your camera setup
      return 'front';
    }
  }

  return 'side'; // Default to side view for MVP
}
