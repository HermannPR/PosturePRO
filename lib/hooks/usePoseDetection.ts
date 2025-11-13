'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

export interface UsePoseDetectionOptions {
  onPoseDetected?: (poses: poseDetection.Pose[]) => void;
  minConfidence?: number;
  modelType?: 'lite' | 'full' | 'heavy';
}

export function usePoseDetection(options: UsePoseDetectionOptions = {}) {
  const {
    onPoseDetected,
    minConfidence = 0.3,
    modelType = 'lite',
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const animationFrameRef = useRef<number>();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize the pose detector
  useEffect(() => {
    let isMounted = true;

    async function initializeDetector() {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize TensorFlow.js backend
        await tf.ready();
        await tf.setBackend('webgl');

        // Create detector with MediaPipe Pose
        const detectorConfig: poseDetection.MediaPipePoseMediaPipeModelConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
          modelType: modelType,
        };

        const poseDetector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MediaPipePose,
          detectorConfig
        );

        if (isMounted) {
          setDetector(poseDetector);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize pose detector:', err);
        if (isMounted) {
          setError('Failed to load pose detection model. Please refresh the page.');
          setIsLoading(false);
        }
      }
    }

    initializeDetector();

    return () => {
      isMounted = false;
      if (detector) {
        detector.dispose();
      }
    };
  }, [modelType]);

  // Start detection loop
  const startDetection = useCallback(
    async (videoElement: HTMLVideoElement) => {
      if (!detector || !videoElement) return;

      videoRef.current = videoElement;

      const detectPose = async () => {
        if (!videoRef.current || videoRef.current.readyState !== 4) {
          animationFrameRef.current = requestAnimationFrame(detectPose);
          return;
        }

        try {
          const poses = await detector.estimatePoses(videoRef.current, {
            flipHorizontal: false,
          });

          if (poses && poses.length > 0 && onPoseDetected) {
            onPoseDetected(poses);
          }
        } catch (err) {
          console.error('Pose detection error:', err);
        }

        animationFrameRef.current = requestAnimationFrame(detectPose);
      };

      detectPose();
    },
    [detector, onPoseDetected]
  );

  // Stop detection loop
  const stopDetection = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    videoRef.current = null;
  }, []);

  return {
    isLoading,
    error,
    detector,
    startDetection,
    stopDetection,
  };
}
