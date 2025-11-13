'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Pose } from '@tensorflow-models/pose-detection';
import { useCamera } from '@/lib/hooks/useCamera';
import { usePoseDetection } from '@/lib/hooks/usePoseDetection';
import { analyzePose, determineViewAngle } from '@/lib/posture/analyzer';
import { PostureAnalysis } from '@/types/posture';

interface PostureCameraProps {
  onAnalysisUpdate?: (analysis: PostureAnalysis) => void;
  showSkeleton?: boolean;
  className?: string;
}

export default function PostureCamera({
  onAnalysisUpdate,
  showSkeleton = true,
  className = '',
}: PostureCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPose, setCurrentPose] = useState<Pose | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<PostureAnalysis | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [calibrationCountdown, setCalibrationCountdown] = useState(3);

  const {
    stream,
    isLoading: cameraLoading,
    error: cameraError,
    startCamera,
    attachToVideo,
  } = useCamera();

  const handlePoseDetected = useCallback((poses: Pose[]) => {
    if (poses && poses.length > 0) {
      const pose = poses[0];
      setCurrentPose(pose);

      // Only analyze after calibration
      if (!isCalibrating) {
        const viewAngle = determineViewAngle(pose.keypoints);
        const analysis = analyzePose(pose, viewAngle);
        setCurrentAnalysis(analysis);

        if (onAnalysisUpdate) {
          onAnalysisUpdate(analysis);
        }
      }
    }
  }, [isCalibrating, onAnalysisUpdate]);

  const {
    isLoading: poseLoading,
    error: poseError,
    startDetection,
    stopDetection,
  } = usePoseDetection({ onPoseDetected: handlePoseDetected });

  // Initialize camera on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // Attach stream to video element
  useEffect(() => {
    if (stream && videoRef.current) {
      attachToVideo(videoRef.current);
    }
  }, [stream, attachToVideo]);

  // Start pose detection when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream) return;

    const handleCanPlay = () => {
      video.play();
      startDetection(video);
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      stopDetection();
    };
  }, [stream, startDetection, stopDetection]);

  // Calibration countdown
  useEffect(() => {
    if (isCalibrating && calibrationCountdown > 0) {
      const timer = setTimeout(() => {
        setCalibrationCountdown(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (calibrationCountdown === 0) {
      setIsCalibrating(false);
    }
  }, [isCalibrating, calibrationCountdown]);

  // Draw pose skeleton on canvas
  useEffect(() => {
    if (!currentPose || !canvasRef.current || !videoRef.current || !showSkeleton) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Match canvas size to video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw keypoints
    currentPose.keypoints.forEach(keypoint => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#00ff00';
        ctx.fill();
      }
    });

    // Draw connections
    const connections = [
      [11, 12], // shoulders
      [11, 23], // left shoulder to hip
      [12, 24], // right shoulder to hip
      [23, 24], // hips
      [11, 13], // left arm
      [13, 15], // left forearm
      [12, 14], // right arm
      [14, 16], // right forearm
      [23, 25], // left thigh
      [25, 27], // left shin
      [24, 26], // right thigh
      [26, 28], // right shin
      [0, 1], // nose to left eye
      [0, 2], // nose to right eye
      [1, 3], // left eye to ear
      [2, 4], // right eye to ear
    ];

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    connections.forEach(([i, j]) => {
      const kp1 = currentPose.keypoints[i];
      const kp2 = currentPose.keypoints[j];

      if (kp1.score && kp1.score > 0.3 && kp2.score && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  }, [currentPose, showSkeleton]);

  const isLoading = cameraLoading || poseLoading;
  const error = cameraError || poseError;

  return (
    <div className={`relative ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        playsInline
        muted
      />

      {/* Canvas overlay for skeleton */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading pose detection...</p>
            <p className="text-sm text-gray-300 mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-75 rounded-lg">
          <div className="text-center text-white p-6 max-w-md">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-semibold mb-2">Camera Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Calibration overlay */}
      {isCalibrating && !isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-center text-white">
            <div className="text-6xl font-bold mb-4">{calibrationCountdown}</div>
            <p className="text-xl">Get into your normal sitting position...</p>
          </div>
        </div>
      )}

      {/* Posture score overlay */}
      {currentAnalysis && !isCalibrating && !isLoading && !error && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg">
          <div className="text-sm font-semibold text-gray-600 mb-1">Posture Score</div>
          <div className={`text-3xl font-bold ${
            currentAnalysis.score >= 80 ? 'text-green-600' :
            currentAnalysis.score >= 60 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {currentAnalysis.score}
            <span className="text-sm text-gray-500">/100</span>
          </div>
        </div>
      )}

      {/* View angle indicator */}
      {currentAnalysis && !isCalibrating && !isLoading && !error && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-2 shadow-lg">
          <div className="text-xs font-semibold text-gray-600">
            {currentAnalysis.viewAngle === 'side' ? '📐 Side View' : '👁️ Front View'}
          </div>
        </div>
      )}

      {/* Positioning guide (shown during calibration) */}
      {isCalibrating && !isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="border-4 border-dashed border-white opacity-50 rounded-lg"
            style={{ width: '60%', height: '80%' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-white text-center bg-black bg-opacity-50 p-4 rounded">
                <p className="text-sm">Position yourself within this frame</p>
                <p className="text-xs mt-1">Side view recommended for best results</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
