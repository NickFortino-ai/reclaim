import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            &larr; Back to Reclaim
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              Reclaim ("we," "us," or "our") operates the Reclaim 365 accountability platform. We take your privacy
              seriously — especially given the sensitive nature of this service. This policy explains what data we
              collect, how we use it, and your rights regarding that data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What Data We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Account Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you sign up, we generate a unique access code and anonymous display name for you.
                  We do not collect your real name, email address, phone number, or any other personal
                  identifying information through our platform directly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Payment Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Payments are processed entirely through Stripe. We store your Stripe customer ID and
                  subscription ID to manage your account. We never see or store your credit card number,
                  billing address, or other payment details — Stripe handles all of that securely.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Usage Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  We track your streak progress, check-in history, desensitization exercise completions,
                  and community interactions (support sent/received). This data powers the app's core
                  features and your personal progress tracking.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Cookies & Local Storage</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use browser local storage to keep you logged in and store your preferences (color theme,
                  exercise progress). We do not use third-party tracking cookies or analytics services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Provide and maintain the Reclaim service</li>
              <li>Process subscription payments through Stripe</li>
              <li>Track your recovery progress and streaks</li>
              <li>Enable community features (anonymous support)</li>
              <li>Manage referral rewards</li>
              <li>Improve the service based on aggregate usage patterns</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Storage & Security</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is stored in a secure PostgreSQL database hosted on Supabase with encryption at
              rest and in transit. All connections use HTTPS/TLS encryption. Access to the database is
              restricted to authorized application services only.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Your account is identified by an anonymous access code — not by your name or email. Community
              members see only your randomly-generated display name and streak data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your account data for as long as your subscription is active. If your subscription
              is canceled, we retain your data for 90 days in case you return, then delete it. You can
              request immediate deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Access</strong> — Request a copy of the data we hold about you</li>
              <li><strong>Correction</strong> — Request corrections to inaccurate data</li>
              <li><strong>Deletion</strong> — Request complete deletion of your account and all associated data</li>
              <li><strong>Portability</strong> — Request your data in a machine-readable format</li>
              <li><strong>Opt-out</strong> — Cancel your subscription at any time through the app settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@reclaim365.app" className="text-primary-600 hover:text-primary-700 font-medium">
                support@reclaim365.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">GDPR Compliance (EU Users)</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are located in the European Economic Area, you have additional rights under the General
              Data Protection Regulation (GDPR). Our legal basis for processing your data is contractual
              necessity (to provide the service you subscribed to). You may lodge a complaint with your
              local data protection authority if you believe your rights have been violated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">CCPA / CalOPPA Compliance (California Users)</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are a California resident, you have the right to know what personal information we
              collect, request its deletion, and opt out of its sale. We do not sell personal information.
              We respond to verified consumer requests within 45 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Reclaim is intended for users 18 years of age and older. We do not knowingly collect data
              from anyone under 18. If we learn that we have collected data from a minor, we will delete
              it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy from time to time. If we make significant changes, we will notify
              users through the app. Continued use of Reclaim after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions about this privacy policy? Contact us at{' '}
              <a href="mailto:support@reclaim365.app" className="text-primary-600 hover:text-primary-700 font-medium">
                support@reclaim365.app
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
            Terms of Service
          </Link>
          <span>Reclaim 365</span>
        </div>
      </div>
    </div>
  );
}
