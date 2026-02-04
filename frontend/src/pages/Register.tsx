import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { stripe, referral } from '../api/client';
import { usePreview } from '../context/PreviewContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { endDemo } = usePreview();
  const fromDemo = (location.state as { fromDemo?: boolean })?.fromDemo;

  // Get referral code from URL
  const referralCode = searchParams.get('ref') || '';
  const [referralValid, setReferralValid] = useState<boolean | null>(null);

  // Validate referral code on mount
  useEffect(() => {
    if (referralCode) {
      referral.validateCode(referralCode)
        .then((res) => setReferralValid(res.valid))
        .catch(() => setReferralValid(false));
    }
  }, [referralCode]);

  const handleStartCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const stripeInstance = await stripePromise;
      if (!stripeInstance) {
        throw new Error('Stripe failed to load');
      }

      // Pass referral code if valid
      const session = await stripe.createCheckout(
        referralValid ? referralCode : undefined
      );

      if (session.url) {
        window.location.href = session.url;
      } else {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId: session.sessionId,
        });
        if (error) {
          throw error;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
      setLoading(false);
    }
  };

  const handleStartCheckoutWithCleanup = async () => {
    endDemo(); // Clear demo state before checkout
    await handleStartCheckout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        {fromDemo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm text-center">
              <strong>Demo complete!</strong> Ready to start your real journey?
            </p>
          </div>
        )}

        {/* Referral Banner */}
        {referralCode && referralValid === true && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-medium">You've been referred!</p>
                <p className="text-green-700 text-sm">You and your referrer both get 1 week free.</p>
              </div>
            </div>
          </div>
        )}

        {referralCode && referralValid === false && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm text-center">
              Referral code not recognized, but you can still sign up!
            </p>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Start Your Journey
        </h1>
        <p className="text-gray-600 text-center mb-6">
          365 days to freedom begins today
        </p>

        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">$0.69/week</div>
            <p className="text-sm text-primary-700">
              Billed monthly • First day free
              {referralValid && <span className="text-green-600 font-medium"> + 1 week referral bonus</span>}
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Daily accountability check-ins
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              365 unique affirmations
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Anonymous community support
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Desensitization exercises
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Auto-cancels at 365 days
            </li>
          </ul>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <button
          onClick={handleStartCheckoutWithCleanup}
          disabled={loading}
          className="w-full btn btn-primary py-3 text-lg"
        >
          {loading ? 'Loading...' : 'Continue to Payment'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe. Cancel anytime.
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="text-primary-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
