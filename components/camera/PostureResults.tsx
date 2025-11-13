'use client';

import { PostureAnalysis, PostureIssue } from '@/types/posture';
import Link from 'next/link';

interface PostureResultsProps {
  analysis: PostureAnalysis;
  onRetry?: () => void;
}

export default function PostureResults({ analysis, onRetry }: PostureResultsProps) {
  const { score, issues } = analysis;

  const significantIssues = issues.filter(
    issue => issue.severity !== 'good'
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getSeverityBadge = (severity: PostureIssue['severity']) => {
    const badges = {
      severe: 'bg-red-100 text-red-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      minor: 'bg-blue-100 text-blue-800',
      good: 'bg-green-100 text-green-800',
    };

    const labels = {
      severe: 'Needs Attention',
      moderate: 'Monitor',
      minor: 'Minor',
      good: 'Good',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${badges[severity]}`}>
        {labels[severity]}
      </span>
    );
  };

  const getIssueIcon = (type: PostureIssue['type']) => {
    const icons = {
      forward_head: '🦒',
      rounded_shoulders: '🙇',
      shoulder_asymmetry: '⚖️',
      slouching: '😴',
      pelvic_tilt: '🏋️',
      head_tilt: '🤕',
    };
    return icons[type] || '📍';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Overall Score */}
      <div className={`border-2 rounded-lg p-6 mb-6 text-center ${getScoreBgColor(score)}`}>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Posture Score</h2>
        <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
          {score}
          <span className="text-2xl text-gray-500">/100</span>
        </div>
        <p className="text-gray-600">
          {score >= 80 && 'Excellent posture! Keep it up!'}
          {score >= 60 && score < 80 && 'Good posture with some room for improvement'}
          {score < 60 && 'Your posture needs attention - see recommendations below'}
        </p>
      </div>

      {/* Issues Detected */}
      {significantIssues.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Detected Issues ({significantIssues.length})
          </h3>
          <div className="space-y-4">
            {significantIssues.map((issue, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getIssueIcon(issue.type)}</span>
                    <h4 className="font-semibold text-gray-800">{issue.message}</h4>
                  </div>
                  {getSeverityBadge(issue.severity)}
                </div>

                <p className="text-gray-600 mb-3 ml-10">{issue.tip}</p>

                {issue.angle !== undefined && (
                  <div className="ml-10 text-sm text-gray-500">
                    Measurement: {issue.angle.toFixed(1)}°
                  </div>
                )}

                {issue.deviation !== undefined && (
                  <div className="ml-10 text-sm text-gray-500">
                    Deviation: {issue.deviation.toFixed(1)}%
                  </div>
                )}

                {issue.exerciseId && (
                  <div className="ml-10 mt-3">
                    <Link
                      href={`/exercises/${issue.exerciseId}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                    >
                      <span>View recommended exercise</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Great Posture!</h3>
          <p className="text-green-700">No significant issues detected. Keep maintaining this posture!</p>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Quick Tips
        </h4>
        <ul className="text-sm text-blue-800 space-y-1 ml-7">
          <li>• Take a posture check every 30-60 minutes</li>
          <li>• Adjust your monitor to eye level</li>
          <li>• Sit with feet flat on the floor</li>
          <li>• Keep shoulders relaxed and back</li>
          <li>• Take regular stretch breaks</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Check Again
          </button>
        )}
        <Link
          href="/"
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
        >
          Done
        </Link>
      </div>

      {/* Medical Disclaimer */}
      <div className="mt-6 text-xs text-gray-500 text-center border-t pt-4">
        <p>
          This app provides educational information about posture. It is NOT a medical device.
          Consult a healthcare professional for persistent pain or health concerns.
        </p>
      </div>
    </div>
  );
}
