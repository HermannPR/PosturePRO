import { Keypoint } from '@tensorflow-models/pose-detection';

export interface PostureIssue {
  type: 'forward_head' | 'rounded_shoulders' | 'shoulder_asymmetry' | 'slouching' | 'pelvic_tilt' | 'head_tilt';
  severity: 'good' | 'minor' | 'moderate' | 'severe';
  angle?: number;
  deviation?: number;
  message: string;
  tip: string;
  exerciseId?: string;
}

export interface PostureAnalysis {
  score: number; // 0-100
  issues: PostureIssue[];
  timestamp: number;
  viewAngle: 'side' | 'front';
}

export interface PostureSession {
  id: string;
  startTime: number;
  endTime?: number;
  analyses: PostureAnalysis[];
  averageScore: number;
}

export interface PoseKeypoints {
  nose: Keypoint;
  leftEye: Keypoint;
  rightEye: Keypoint;
  leftEar: Keypoint;
  rightEar: Keypoint;
  leftShoulder: Keypoint;
  rightShoulder: Keypoint;
  leftElbow: Keypoint;
  rightElbow: Keypoint;
  leftWrist: Keypoint;
  rightWrist: Keypoint;
  leftHip: Keypoint;
  rightHip: Keypoint;
  leftKnee: Keypoint;
  rightKnee: Keypoint;
  leftAnkle: Keypoint;
  rightAnkle: Keypoint;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  steps: string[];
  videoUrl?: string;
  targetIssues: PostureIssue['type'][];
}

export interface UserPreferences {
  reminderInterval: number; // minutes
  reminderEnabled: boolean;
  soundEnabled: boolean;
  preferredView: 'side' | 'front' | 'auto';
}
