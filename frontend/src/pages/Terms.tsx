import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            &larr; Back to Reclaim
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Reclaim ("the Service") is a 365-day accountability platform designed to help men break free from
              pornography addiction. The Service includes daily check-ins, streak tracking, desensitization
              exercises, community support features, and educational resources.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Reclaim is a self-help tool, not a medical or therapeutic service. It is not a substitute for
              professional counseling, therapy, or medical treatment. If you are experiencing a mental health
              crisis, please contact a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Subscription & Pricing</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Reclaim costs <strong>$0.69/week</strong>, billed monthly (~$2.99/month). Your subscription
                includes a 1-day free trial.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Auto-renewal:</strong> Your subscription renews automatically each billing cycle until
                canceled. You can cancel at any time through the app settings.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>365-day completion:</strong> When you achieve an unbroken 365-day streak (365 consecutive days
                where you checked in and stayed strong), your subscription is automatically canceled and your account
                is marked as completed. If you reset your streak, the completion progress resets and you stay
                subscribed until you complete a full 365-day streak.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Referral program:</strong> You can earn free weeks by referring others. Refer 10 people
                to unlock lifetime access.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Refunds:</strong> Due to the digital nature of the service, we generally do not offer
                refunds for completed billing periods. If you believe you were charged in error, contact us
                and we'll work with you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account & Access</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Your account is accessed via a unique access code provided at registration. You are
                responsible for keeping this code secure. Do not share your access code with others.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Each subscription is for a single user. Sharing access or creating multiple accounts to
                circumvent subscription terms is prohibited.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By using Reclaim, you agree to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Provide accurate payment information through our payment processor (Stripe)</li>
              <li>Use the Service honestly — your check-ins reflect your actual behavior</li>
              <li>Treat other community members with respect</li>
              <li>Not attempt to reverse-engineer, hack, or disrupt the Service</li>
              <li>Not use the Service if you are under 18 years of age</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Prohibited Uses</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may not use Reclaim to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Harass, bully, or send abusive messages to other members</li>
              <li>Upload inappropriate, illegal, or harmful content</li>
              <li>Impersonate another user or misrepresent your identity</li>
              <li>Attempt to access other users' accounts or data</li>
              <li>Use automated tools, bots, or scripts to interact with the Service</li>
              <li>Exploit bugs or vulnerabilities instead of reporting them</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that violate these terms without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content, design, code, and branding of Reclaim are owned by us and protected by applicable
              intellectual property laws. You may not copy, modify, distribute, or create derivative works
              from any part of the Service without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Reclaim is provided "as is" without warranties of any kind, either express or implied. We do not
              guarantee that the Service will be uninterrupted, error-free, or that it will achieve any
              particular result for your recovery journey.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              To the maximum extent permitted by law, Reclaim and its operators shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
              revenue, whether incurred directly or indirectly, or any loss of data or use.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Our total liability for any claim arising from or related to the Service shall not exceed the
              amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have a dispute with us, we encourage you to contact us first at{' '}
              <a href="mailto:support@reclaim365.app" className="text-primary-600 hover:text-primary-700 font-medium">
                support@reclaim365.app
              </a>{' '}
              so we can try to resolve it directly.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              If we can't resolve the dispute informally, both parties agree to resolve any claims through
              binding arbitration on an individual basis rather than in court. You waive the right to
              participate in class action lawsuits or class-wide arbitration.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              These terms are governed by the laws of the United States. Any arbitration will be conducted
              under the rules of the American Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              You may cancel your subscription and stop using the Service at any time. We may terminate or
              suspend your account for violations of these terms. Upon termination, your right to access the
              Service ends immediately. Provisions that should survive termination (liability limitations,
              dispute resolution) remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these terms from time to time. If we make material changes, we will notify users
              through the app. Continued use of Reclaim after changes take effect constitutes acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:support@reclaim365.app" className="text-primary-600 hover:text-primary-700 font-medium">
                support@reclaim365.app
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
            Privacy Policy
          </Link>
          <span>Reclaim 365</span>
        </div>
      </div>
    </div>
  );
}
