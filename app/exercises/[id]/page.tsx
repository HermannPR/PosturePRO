import { getExerciseById, exercises } from '@/lib/data/exercises';
import Link from 'next/link';

interface ExercisePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(exercises).map((id) => ({
    id,
  }));
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const exercise = getExerciseById(params.id);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Exercise Not Found</h1>
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          PosturePro
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/check"
            className="text-gray-600 hover:text-gray-800 mb-6 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Exercise Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-4xl font-bold mb-4">{exercise.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{exercise.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{exercise.duration} seconds</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Recommended</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">How to Do It</h2>

            <div className="space-y-4">
              {exercise.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Important
              </h3>
              <ul className="text-sm text-yellow-900 space-y-1">
                <li>• Never force any stretch - it should feel comfortable</li>
                <li>• Stop immediately if you feel pain (mild discomfort is okay)</li>
                <li>• Breathe normally throughout the exercise</li>
                <li>• Consistency is key - do these exercises daily for best results</li>
                <li>• Consult a healthcare professional if you have existing injuries</li>
              </ul>
            </div>

            {/* Timer Tool (Future Enhancement) */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Set a timer for {exercise.duration} seconds</p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/check"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Check Posture Again
                </Link>
                <Link
                  href="/"
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8 text-xs text-gray-500 text-center">
            <p>
              These exercises are for educational purposes. Consult a healthcare professional
              before starting any new exercise program, especially if you have existing conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
