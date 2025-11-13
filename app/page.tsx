import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">PosturePro</h1>
          <nav className="hidden md:flex gap-6">
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600">How It Works</a>
            <a href="#features" className="text-gray-600 hover:text-primary-600">Features</a>
            <a href="#privacy" className="text-gray-600 hover:text-primary-600">Privacy</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Check Your Posture in <span className="text-primary-600">30 Seconds</span>
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            AI-powered posture analysis for remote workers and students.
          </p>
          <p className="text-lg text-gray-500 mb-8">
            No signup required • Privacy-first • Completely free
          </p>

          <Link
            href="/check"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Free Posture Check
          </Link>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Your video never leaves your device
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Allow Camera</h4>
            <p className="text-gray-600">We process video locally on your device - nothing is uploaded to servers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Get Analyzed</h4>
            <p className="text-gray-600">AI detects your pose and measures common postural issues in real-time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Get Actionable Tips</h4>
            <p className="text-gray-600">Receive personalized exercises and ergonomic recommendations</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">What We Detect</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Forward Head Posture', desc: 'Ear-shoulder alignment issues common in screen users' },
              { name: 'Rounded Shoulders', desc: 'Upper back curvature that can lead to pain' },
              { name: 'Shoulder Asymmetry', desc: 'Uneven shoulder heights indicating imbalances' },
              { name: 'Slouching', desc: 'Poor sitting posture affecting spine health' },
              { name: 'Pelvic Tilt', desc: 'Hip position impacting lower back' },
              { name: 'Head Tilt', desc: 'Lateral head positioning issues' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">{feature.name}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Privacy-First by Design</h3>
          <p className="text-lg text-gray-600 mb-8">
            Your privacy is our top priority. All posture analysis happens directly on your device using AI models that run in your browser.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold mb-1">No Video Upload</p>
                <p className="text-sm text-gray-600">Video never leaves your device</p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold mb-1">Local Processing</p>
                <p className="text-sm text-gray-600">AI runs entirely in your browser</p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold mb-1">No Account Needed</p>
                <p className="text-sm text-gray-600">Start immediately, no signup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-yellow-50 border-t border-b border-yellow-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-700">
            <p className="font-semibold mb-2">Medical Disclaimer</p>
            <p>
              This app provides educational information about posture. It is NOT a medical device and does NOT diagnose or treat medical conditions.
              Always consult a healthcare professional for persistent pain or health concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600">
        <p className="mb-4">Built with privacy and your health in mind</p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-primary-600">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary-600">Terms of Use</Link>
          <a href="#" className="hover:text-primary-600">Contact</a>
        </div>
      </footer>
    </main>
  );
}
