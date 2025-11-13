import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          PosturePro
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Privacy Commitment</h2>
              <p className="text-gray-700 mb-4">
                At PosturePro, your privacy is our highest priority. We believe you should have complete
                control over your data, which is why we&apos;ve designed our app to process everything locally
                on your device.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="font-semibold text-green-900">Key Privacy Principle:</p>
                <p className="text-green-800">
                  Your video and camera feed NEVER leave your device. All pose detection and analysis
                  happens entirely in your browser using client-side AI models.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What We Don&apos;t Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We do NOT collect or store video recordings</li>
                <li>We do NOT upload camera frames to any server</li>
                <li>We do NOT store biometric data without your explicit consent</li>
                <li>We do NOT sell or share your personal information with third parties</li>
                <li>We do NOT require an account to use basic features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What We Do Collect (Optional)</h2>
              <p className="text-gray-700 mb-4">
                The following data is only collected if you choose to create an account:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Email Address:</strong> Used for account authentication and password recovery</li>
                <li><strong>Posture Scores:</strong> Numerical scores (0-100) saved to track your progress over time</li>
                <li><strong>Session Timestamps:</strong> When you performed posture checks</li>
                <li><strong>Issue Categories:</strong> Types of posture issues detected (e.g., &quot;forward head&quot;), without images</li>
              </ul>
              <p className="text-gray-700 mt-4">
                All of this data is stored securely and can be deleted at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide you with posture analysis and feedback</li>
                <li>To track your progress over time (with your consent)</li>
                <li>To improve our AI models and app functionality</li>
                <li>To send you reminders (if you enable this feature)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Camera Permissions</h2>
              <p className="text-gray-700 mb-4">
                PosturePro requires camera access to analyze your posture. When you grant camera permission:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The camera feed is processed in real-time in your browser</li>
                <li>No video or images are transmitted over the internet</li>
                <li>AI models run entirely on your device using TensorFlow.js and MediaPipe</li>
                <li>You can revoke camera access at any time through your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Local Storage</h2>
              <p className="text-gray-700 mb-4">
                We use browser local storage to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Save your preferences (reminder settings, view mode)</li>
                <li>Cache posture scores for offline access</li>
                <li>Maintain your session without requiring login</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can clear this data at any time through your browser&apos;s clear browsing data feature.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-gray-700 mb-4">
                We use privacy-preserving analytics to understand how people use our app. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Anonymous usage statistics (page views, feature usage)</li>
                <li>Device type and browser information (for compatibility)</li>
                <li>No personally identifiable information (PII)</li>
                <li>No tracking across websites</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>CDN (Content Delivery Network):</strong> To deliver AI models efficiently</li>
                <li><strong>Hosting Provider:</strong> To serve the web application</li>
              </ul>
              <p className="text-gray-700 mt-4">
                These services do NOT have access to your camera feed or posture data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your data at any time</li>
                <li>Export your data in a portable format</li>
                <li>Delete your account and all associated data</li>
                <li>Opt out of analytics</li>
                <li>Use the app without creating an account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>HTTPS encryption for all connections</li>
                <li>Secure authentication protocols</li>
                <li>Regular security audits</li>
                <li>No plaintext storage of sensitive data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                PosturePro is not intended for children under 13. We do not knowingly collect
                information from children under 13. If you believe we have collected such information,
                please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify users of any
                significant changes by posting a notice on our website or sending an email to
                registered users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this privacy policy or our practices, please contact us at:
              </p>
              <p className="text-primary-600 font-semibold mt-2">
                privacy@posturepro.app
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
