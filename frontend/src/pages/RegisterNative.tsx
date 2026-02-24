import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth as authApi, user as userApi } from '../api/client';
import { AgeGate } from '../components/AgeGate';
import { getOfferings, purchasePackage, loginRevenueCat } from '../services/revenuecat';
import { referral } from '../api/client';
import { useEffect } from 'react';

type Step = 'age-gate' | 'creating' | 'subscribe' | 'access-code';

export function RegisterNative() {
  const [step, setStep] = useState<Step>('age-gate');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Token/user stored temporarily between steps
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const referralCode = searchParams.get('ref') || '';
  const [referralValid, setReferralValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (referralCode) {
      referral.validateCode(referralCode)
        .then((res) => setReferralValid(res.valid))
        .catch(() => setReferralValid(false));
    }
  }, [referralCode]);

  const handleAgeVerified = async (timestamp: string) => {
    setStep('creating');
    setError('');
    setLoading(true);

    try {
      const response = await authApi.registerNative(
        referralValid ? referralCode : undefined,
        timestamp
      );

      setAccessCode(response.accessCode);
      setAuthToken(response.token);
      setUserId(response.user.id);

      // Log in to RevenueCat with the user ID
      await loginRevenueCat(response.user.id);

      setStep('subscribe');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      setStep('age-gate');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');

    try {
      const offering = await getOfferings();
      if (!offering) {
        throw new Error('No subscription offerings available');
      }

      // Find the weekly subscription package
      const weeklyPackage = offering.availablePackages.find(
        (pkg) => pkg.identifier === '$rc_weekly' || pkg.packageType === 'WEEKLY'
      ) || offering.availablePackages[0];

      if (!weeklyPackage) {
        throw new Error('Subscription package not found');
      }

      const customerInfo = await purchasePackage(weeklyPackage);

      // Link RevenueCat ID to our backend user
      if (authToken && userId) {
        await userApi.linkRevenueCat(authToken, userId);
        await userApi.confirmIapSubscription(authToken);
      }

      // Check if the purchase granted the entitlement
      if (customerInfo.entitlements.active['pro']) {
        // Log the user in and show access code
        if (authToken) {
          login(authToken, {
            id: userId!,
            currentStreak: 0,
            totalDaysWon: 0,
            desensitizationPoints: 0,
            lastCheckIn: null,
            colorTheme: 'slate',
            subscriptionStatus: 'active',
            completedAt: null,
            hasCompletedOnboarding: false,
          });
        }
        setStep('access-code');
      }
    } catch (err: unknown) {
      // User cancelled the purchase — this is not an error
      if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'PURCHASE_CANCELLED') {
        setLoading(false);
        return;
      }
      setError(err instanceof Error ? err.message : 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    setLoading(true);
    setError('');

    try {
      const { restorePurchases } = await import('../services/revenuecat');
      const customerInfo = await restorePurchases();

      if (customerInfo.entitlements.active['pro'] && authToken) {
        await userApi.confirmIapSubscription(authToken);
        login(authToken, {
          id: userId!,
          currentStreak: 0,
          totalDaysWon: 0,
          desensitizationPoints: 0,
          lastCheckIn: null,
          colorTheme: 'slate',
          subscriptionStatus: 'active',
          completedAt: null,
          hasCompletedOnboarding: false,
        });
        setStep('access-code');
      } else {
        setError('No active subscription found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Restore failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Step 1: Age verification
  if (step === 'age-gate') {
    return <AgeGate onVerified={handleAgeVerified} />;
  }

  // Step 2: Creating account
  if (step === 'creating') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  // Step 3: Subscribe via RevenueCat
  if (step === 'subscribe') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          {referralCode && referralValid && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm text-center font-medium">
                Referral applied! You and your referrer both benefit.
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
              <p className="text-sm text-primary-700">Auto-renewing subscription</p>
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
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full btn btn-primary py-3 text-lg"
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </button>

          <button
            onClick={handleRestorePurchases}
            disabled={loading}
            className="w-full mt-3 text-sm text-primary-600 hover:underline text-center"
          >
            Restore Purchases
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Payment will be charged to your Apple ID account. Subscription automatically renews unless canceled at least 24 hours before the end of the current period.
          </p>
        </div>
      </div>
    );
  }

  // Step 4: Show access code
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Reclaim!</h1>
          <p className="text-gray-600 mt-2">Your journey to freedom starts now.</p>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5 mb-6">
          <h2 className="font-bold text-yellow-800 mb-1 text-center text-lg">
            Save Your 4-Digit Code
          </h2>
          <p className="text-sm text-yellow-700 mb-4 text-center">
            This code is how you log in. Screenshot it, write it down, or memorize it.
          </p>

          <div className="bg-white rounded-lg p-6 text-center border border-yellow-200">
            <code className="text-5xl font-mono font-bold tracking-[0.5em] text-gray-900">
              {accessCode}
            </code>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full mt-4 btn btn-secondary"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>

          <p className="text-sm text-red-700 font-semibold text-center mt-4">
            If you lose this code, contact support@reclaim365.app
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full btn btn-primary py-3"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
