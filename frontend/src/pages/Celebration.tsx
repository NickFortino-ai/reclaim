import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useReferralStats, useClaimLifetime, useLifetimeCheckout, useUserData } from '../hooks/useApi';

export function Celebration() {
  const { user } = useAuth();
  const { data: referralData, isLoading } = useReferralStats();
  const { data: userData } = useUserData();
  const claimLifetime = useClaimLifetime();
  const lifetimeCheckout = useLifetimeCheckout();
  const [copied, setCopied] = useState(false);
  const [showPassItForward, setShowPassItForward] = useState(true);

  const handleCopy = async () => {
    if (!referralData) return;
    try {
      await navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = referralData.referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaimLifetime = async () => {
    try {
      await claimLifetime.mutateAsync();
    } catch (error) {
      console.error('Failed to claim lifetime access:', error);
    }
  };

  const canClaimLifetime = referralData?.canGetLifetimeAccess && !referralData?.lifetimeAccess;
  const hasLifetimeAccess = referralData?.lifetimeAccess;
  const referralsNeeded = referralData?.referralsNeededForLifetime || 3;
  const referralCount = referralData?.referralCount || 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="max-w-lg w-full space-y-6 px-4">
        {/* Main Celebration Card */}
        <div className="card text-center">
          <div className="text-6xl mb-6">🎉</div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            You Did It!
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            365 Total Days Won — a year of strength, discipline, and growth.
          </p>

          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold text-primary-600 mb-2">365</div>
            <p className="text-primary-700">Total Days Won</p>
          </div>

          <p className="text-gray-600 mb-6">
            You've proven that you have what it takes.
            The strength you've built is yours forever.
          </p>

          <div className="space-y-4">
            {user && (
              <Link to="/dashboard" className="block btn btn-primary py-3">
                View Your Journey
              </Link>
            )}
            <Link to="/community" className="block btn btn-outline py-3">
              Celebrate with the Community
            </Link>
          </div>
        </div>

        {/* Lifetime Membership Offer */}
        {userData && !userData.user.lifetimeAccess && (
          <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Join the Hall of Fame
              </h2>
              <p className="text-gray-700 mb-4">
                As a 365-day warrior, you've unlocked a special offer: <span className="font-semibold text-amber-700">lifetime access for a one-time $20</span>.
                Stay in the community, keep your streak going, and inspire others from the Hall of Fame.
              </p>
              {userData.gracePeriodDaysRemaining !== null && userData.gracePeriodDaysRemaining > 0 && (
                <p className="text-sm text-amber-600 mb-4">
                  {userData.gracePeriodDaysRemaining} day{userData.gracePeriodDaysRemaining !== 1 ? 's' : ''} remaining to claim this offer
                </p>
              )}
              <button
                onClick={async () => {
                  try {
                    const result = await lifetimeCheckout.mutateAsync();
                    if (result.url) window.location.href = result.url;
                  } catch (error) {
                    console.error('Failed to create lifetime checkout:', error);
                  }
                }}
                disabled={lifetimeCheckout.isPending}
                className="w-full btn bg-amber-600 hover:bg-amber-700 text-white py-3 font-bold"
              >
                {lifetimeCheckout.isPending ? 'Loading...' : 'Get Lifetime Access — $20'}
              </button>
            </div>
          </div>
        )}

        {/* Pass It Forward Section */}
        {showPassItForward && !isLoading && referralData && (
          <div className="card bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Pass It Forward</h2>
              <button
                onClick={() => setShowPassItForward(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {hasLifetimeAccess ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">
                  Lifetime Access Unlocked!
                </h3>
                <p className="text-purple-700">
                  You've helped {referralCount} brother{referralCount !== 1 ? 's' : ''} start their journey.
                  Thank you for paying it forward.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-4">
                  You've completed the journey. Now help others do the same.
                  <span className="font-semibold text-purple-700"> Invite 3 brothers and unlock lifetime access</span> to Reclaim.
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Referral Progress</span>
                    <span className="font-medium text-purple-700">{referralCount} / 3</span>
                  </div>
                  <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((referralCount / 3) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Referral Link */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={referralData.referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm bg-white border border-purple-200 rounded-lg text-gray-600 truncate"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Share Buttons */}
                <div className="flex gap-2 mb-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=I%20just%20completed%20365%20days%20of%20freedom%20with%20Reclaim.%20If%20you%27re%20ready%20to%20break%20free%2C%20start%20here%3A&url=${encodeURIComponent(referralData.referralLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn btn-secondary text-sm py-2 justify-center"
                  >
                    Share on X
                  </a>
                  <a
                    href={`sms:?body=I%20just%20completed%20365%20days%20with%20Reclaim.%20Check%20it%20out%3A%20${encodeURIComponent(referralData.referralLink)}`}
                    className="flex-1 btn btn-secondary text-sm py-2 justify-center"
                  >
                    Text a Friend
                  </a>
                </div>

                {/* Claim Button */}
                {canClaimLifetime && (
                  <button
                    onClick={handleClaimLifetime}
                    disabled={claimLifetime.isPending}
                    className="w-full btn bg-purple-600 hover:bg-purple-700 text-white py-3 font-bold"
                  >
                    {claimLifetime.isPending ? 'Claiming...' : 'Claim Lifetime Access'}
                  </button>
                )}

                {referralsNeeded > 0 && !canClaimLifetime && (
                  <p className="text-sm text-purple-600 text-center">
                    {referralsNeeded} more referral{referralsNeeded !== 1 ? 's' : ''} to unlock lifetime access
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* Quote */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            "The chains of habit are too light to be felt until they are too heavy to be broken."
            <br />
            — You broke them. You're free.
          </p>
        </div>
      </div>
    </div>
  );
}
