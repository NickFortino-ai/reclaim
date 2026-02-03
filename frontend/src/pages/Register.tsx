import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { stripe } from '../api/client';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const stripeInstance = await stripePromise;
      if (!stripeInstance) {
        throw new Error('Stripe failed to load');
      }

      const session = await stripe.createCheckout();

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Start Your Journey
        </h1>
        <p className="text-gray-600 text-center mb-6">
          365 days to freedom begins today
        </p>

        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">$0.69/week</div>
            <p className="text-sm text-primary-700">Billed monthly • First day free</p>
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
          onClick={handleStartCheckout}
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
