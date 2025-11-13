'use client';

import { useState, useCallback } from 'react';
import PostureCamera from '@/components/camera/PostureCamera';
import PostureResults from '@/components/camera/PostureResults';
import { PostureAnalysis } from '@/types/posture';
import Link from 'next/link';

export default function CheckPage() {
  const [sessionState, setSessionState] = useState<'intro' | 'checking' | 'results'>('intro');
  const [latestAnalysis, setLatestAnalysis] = useState<PostureAnalysis | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<PostureAnalysis[]>([]);
  const [sessionDuration, setSessionDuration] = useState(30); // seconds

  const handleAnalysisUpdate = useCallback((analysis: PostureAnalysis) => {
    setLatestAnalysis(analysis);
    setAnalysisHistory(prev => [...prev, analysis]);
  }, []);

  const handleStartCheck = () => {
    setSessionState('checking');
    setAnalysisHistory([]);
    setLatestAnalysis(null);
  };

  const handleRetry = () => {
    setSessionState('checking');
    setAnalysisHistory([]);
    setLatestAnalysis(null);
  };

  const handleFinishSession = () => {
    if (analysisHistory.length > 0) {
      // Calculate average score from last few analyses
      const recentAnalyses = analysisHistory.slice(-10);
      const avgScore = recentAnalyses.reduce((sum, a) => sum + a.score, 0) / recentAnalyses.length;

      // Use the most recent analysis with averaged score
      const finalAnalysis: PostureAnalysis = {
        ...analysisHistory[analysisHistory.length - 1],
        score: Math.round(avgScore),
      };

      setLatestAnalysis(finalAnalysis);
      setSessionState('results');
    }
  };

  // Auto-finish session after duration
  useState(() => {
    if (sessionState === 'checking') {
      const timer = setTimeout(() => {
        handleFinishSession();
      }, sessionDuration * 1000);

      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          PosturePro
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Intro State */}
        {sessionState === 'intro' && (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Posture Check</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <div className="text-left space-y-3 max-w-lg mx-auto">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold">1.</span>
                    <p className="text-gray-700">Position yourself in your normal sitting or standing posture</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold">2.</span>
                    <p className="text-gray-700">We&apos;ll analyze your posture for 30 seconds using AI</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold">3.</span>
                    <p className="text-gray-700">Get personalized feedback and actionable tips</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Best Results
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use side view for most accurate results</li>
                  <li>• Ensure good lighting</li>
                  <li>• Position camera at chest height</li>
                  <li>• Sit in your normal working posture</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-center gap-2 text-sm text-green-800">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your video never leaves your device - all processing is local
              </div>

              <button
                onClick={handleStartCheck}
                className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
              >
                Start Posture Check
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">← Back to Home</Link>
            </div>
          </div>
        )}

        {/* Checking State */}
        {sessionState === 'checking' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-2">Analyzing Your Posture...</h1>
              <p className="text-gray-600">Hold your normal position for best results</p>
            </div>

            <div className="aspect-video max-w-3xl mx-auto mb-6">
              <PostureCamera
                onAnalysisUpdate={handleAnalysisUpdate}
                showSkeleton={true}
                className="w-full h-full"
              />
            </div>

            <div className="max-w-md mx-auto">
              {latestAnalysis && (
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Current Score</span>
                    <span className={`text-2xl font-bold ${
                      latestAnalysis.score >= 80 ? 'text-green-600' :
                      latestAnalysis.score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {latestAnalysis.score}
                    </span>
                  </div>
                  {latestAnalysis.issues.filter(i => i.severity !== 'good').length > 0 && (
                    <div className="text-xs text-gray-600">
                      {latestAnalysis.issues.filter(i => i.severity !== 'good').length} issue(s) detected
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleFinishSession}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Finish & See Results
              </button>

              <div className="mt-3 text-center">
                <button
                  onClick={() => setSessionState('intro')}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results State */}
        {sessionState === 'results' && latestAnalysis && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Posture Analysis</h1>
            <PostureResults
              analysis={latestAnalysis}
              onRetry={handleRetry}
            />
          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <footer className="container mx-auto px-4 py-8 text-center text-xs text-gray-500">
        <p>
          This app provides educational information about posture. It is NOT a medical device.
          Consult a healthcare professional for persistent pain or health concerns.
        </p>
      </footer>
    </div>
  );
}
