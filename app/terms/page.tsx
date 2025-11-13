import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
          <p className="text-sm text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using PosturePro (&quot;the App&quot;), you accept and agree to be bound by the
                terms and provisions of this agreement. If you do not agree to these terms, please do not
                use the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Medical Disclaimer</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4">
                <p className="font-bold text-yellow-900 mb-2">IMPORTANT - PLEASE READ CAREFULLY:</p>
                <ul className="list-disc pl-6 space-y-2 text-yellow-900">
                  <li>PosturePro is NOT a medical device</li>
                  <li>PosturePro does NOT diagnose, treat, cure, or prevent any medical condition or disease</li>
                  <li>PosturePro is an educational and wellness tool only</li>
                  <li>All information provided is for educational purposes and should not be considered medical advice</li>
                  <li>Always consult a licensed healthcare professional (physician, physical therapist, chiropractor)
                      before making any changes to your health routine or if you experience persistent pain</li>
                  <li>If you have existing medical conditions, injuries, or chronic pain, seek professional medical
                      evaluation before using this app</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Use at Your Own Risk</h2>
              <p className="text-gray-700 mb-4">
                By using PosturePro, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You use the App and any recommended exercises at your own risk</li>
                <li>You are responsible for ensuring exercises are appropriate for your physical condition</li>
                <li>You will stop any exercise immediately if you experience pain or discomfort</li>
                <li>The App&apos;s analysis is based on AI algorithms and may not be 100% accurate</li>
                <li>Results may vary based on camera quality, lighting, positioning, and individual factors</li>
                <li>The App is not a substitute for professional medical or ergonomic assessment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>PosturePro and its creators are NOT liable for any injury, loss, or damage resulting from
                    use of the App</li>
                <li>We make no warranties about the accuracy, reliability, or completeness of the information provided</li>
                <li>We are not liable for any direct, indirect, incidental, consequential, or punitive damages</li>
                <li>Your sole remedy for dissatisfaction with the App is to stop using it</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the App only for its intended purpose (posture awareness and education)</li>
                <li>Not rely solely on the App for medical decisions</li>
                <li>Consult appropriate healthcare professionals for medical concerns</li>
                <li>Ensure you have adequate space and safe environment when performing exercises</li>
                <li>Not use the App if you have conditions that contraindicate the exercises shown</li>
                <li>Provide accurate information if you create an account</li>
                <li>Not attempt to reverse engineer or modify the App</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, features, and functionality of PosturePro, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Software code and algorithms</li>
                <li>User interface design</li>
                <li>Text, images, and educational content</li>
                <li>Logos and branding</li>
              </ul>
              <p className="text-gray-700 mt-4">
                are owned by PosturePro and protected by copyright, trademark, and other intellectual
                property laws. You may not copy, modify, distribute, or create derivative works without
                express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Privacy and Data</h2>
              <p className="text-gray-700">
                Your use of the App is also governed by our{' '}
                <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                Please review it to understand how we handle your data. Key points:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Video processing happens entirely on your device</li>
                <li>We do not collect or store video recordings</li>
                <li>We collect minimal data necessary for app functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Content and Services</h2>
              <p className="text-gray-700">
                The App may use third-party AI models and libraries (TensorFlow.js, MediaPipe) for pose
                detection. We are not responsible for the accuracy or performance of these third-party
                components. Additionally, the App may contain links to third-party websites or resources,
                for which we are not responsible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Age Restrictions</h2>
              <p className="text-gray-700">
                You must be at least 13 years old to use PosturePro. Users under 18 should use the App
                under parental supervision. We recommend consulting a healthcare provider before children
                or adolescents perform posture exercises.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Availability and Changes</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Modify, suspend, or discontinue the App at any time without notice</li>
                <li>Update these Terms of Use at any time</li>
                <li>Change pricing for premium features (with advance notice to existing users)</li>
                <li>Limit access to certain features or users</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Continued use of the App after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access to the App immediately, without prior notice,
                for any reason, including breach of these Terms. Upon termination, your right to use
                the App will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of the
                jurisdiction in which PosturePro operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision
                shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
                shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless PosturePro and its officers, directors,
                employees, and agents from any claims, liabilities, damages, losses, or expenses arising
                out of your use of the App or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms of Use, please contact:
              </p>
              <p className="text-primary-600 font-semibold mt-2">
                legal@posturepro.app
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Entire Agreement</h2>
              <p className="text-gray-700">
                These Terms of Use, together with our Privacy Policy, constitute the entire agreement
                between you and PosturePro regarding the use of the App.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600 mb-4">
              By using PosturePro, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Use.
            </p>
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
