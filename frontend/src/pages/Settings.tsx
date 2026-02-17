import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemePicker } from '../components/ThemePicker';
import { useReferralStats, useUserData, useUpdateReminderTime, useUpdateLeaderboardVisibility, useUpdateDisplayName, useChangeAccessCode, useWarriorNameOptions } from '../hooks/useApi';
import { user as userApi, stripe as stripeApi } from '../api/client';

export function Settings() {
  const { user, token, logout, updateUser } = useAuth();
  const { data: userData } = useUserData();
  const navigate = useNavigate();

  // Sync subscription status from fresh /me data into auth context
  const freshStatus = userData?.user?.subscriptionStatus;
  if (freshStatus && user && freshStatus !== user.subscriptionStatus) {
    updateUser({ subscriptionStatus: freshStatus });
  }

  // Modal states
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDataDialog, setShowDataDialog] = useState(false);

  const [cancelLoading, setCancelLoading] = useState(false);

  const handleCancelSubscription = async () => {
    if (!user) return;
    setCancelLoading(true);
    try {
      await stripeApi.cancelSubscription(user.id);
      setShowCancelDialog(false);
      window.location.reload();
    } catch {
      alert('Failed to cancel subscription. Please contact support@reclaim365.app.');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleDownloadData = async () => {
    if (!token) return;
    try {
      const data = await userApi.exportData(token);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reclaim-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setShowDataDialog(false);
    } catch {
      alert('Failed to export data. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) return;
    try {
      await userApi.deleteAccount(token);
      setShowDeleteDialog(false);
      logout();
      navigate('/');
    } catch {
      alert('Failed to delete account. Please try again or contact support.');
    }
  };

  const supportEmail = 'support@reclaim365.app';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences.</p>
      </div>

      {/* Theme Picker */}
      <ThemePicker />

      {/* Support Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${supportEmail}?subject=Reclaim App Support Request`}
            className="btn btn-outline"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </span>
          </a>
          <Link
            to="/faq"
            className="btn btn-secondary"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </span>
          </Link>
        </div>
      </div>

      {/* Preferences Section */}
      <PreferencesSection userData={userData} />

      {/* Account Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Subscription Status</p>
              <p className="text-lg font-semibold capitalize">
                {user?.subscriptionStatus === 'active' && (
                  <span className="text-green-600">Active</span>
                )}
                {user?.subscriptionStatus === 'trialing' && (
                  <span className="text-blue-600">Trial</span>
                )}
                {user?.subscriptionStatus === 'canceled' && (
                  <span className="text-red-600">Cancelled</span>
                )}
                {user?.subscriptionStatus === 'completed' && (
                  <span className="text-purple-600">Completed (365 Days Won!)</span>
                )}
                {!['active', 'trialing', 'canceled', 'completed'].includes(user?.subscriptionStatus || '') && (
                  <span className="text-gray-600">{user?.subscriptionStatus || 'Unknown'}</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Streak Progress</p>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-lg font-bold text-primary-600">{user?.currentStreak || 0} / 365</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setShowDataDialog(true)}
              className="btn btn-secondary justify-center"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download My Data
              </span>
            </button>
            {user?.subscriptionStatus === 'active' && (
              <button
                onClick={() => setShowCancelDialog(true)}
                className="btn btn-secondary text-orange-600 border-orange-200 hover:bg-orange-50 justify-center"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <ReferralSection />

      {/* Danger Zone */}
      <div className="card border-red-200">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>

        <div className="space-y-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">
              <span className="font-medium">Warning:</span> Logging out will require your access code
              to log back in. Make sure you have it saved somewhere safe.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={logout}
              className="btn bg-gray-600 text-white hover:bg-gray-700"
            >
              Log Out
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="btn bg-red-600 text-white hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Dialog */}
      {showCancelDialog && (
        <ConfirmDialog
          title="Cancel Subscription?"
          message="Are you sure you want to cancel your subscription? You'll lose access to the app at the end of your current billing period. Your progress will be saved if you decide to return."
          confirmText="Yes, Cancel Subscription"
          confirmStyle="orange"
          onConfirm={handleCancelSubscription}
          onCancel={() => setShowCancelDialog(false)}
          loading={cancelLoading}
        />
      )}

      {/* Download Data Dialog */}
      {showDataDialog && (
        <ConfirmDialog
          title="Download Your Data"
          message="This will download a JSON file containing all your data: check-in history, journal entries, bookmarks, desensitization logs, and urge surf events."
          confirmText="Download Data"
          confirmStyle="primary"
          onConfirm={handleDownloadData}
          onCancel={() => setShowDataDialog(false)}
        />
      )}

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <ConfirmDialog
          title="Delete Account Permanently?"
          message="This action cannot be undone. All your data, progress, and streak history will be permanently deleted. Your subscription will be cancelled immediately with no refund."
          confirmText="Yes, Delete My Account"
          confirmStyle="red"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 ${
          enabled ? 'bg-primary-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function ReferralSection() {
  const { data, isLoading } = useReferralStats();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = data.referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Program</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div className="text-center p-2 sm:p-3 bg-primary-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-primary-600">{data.referralCount}</div>
          <div className="text-sm text-primary-700">Referred</div>
        </div>
        <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{data.totalCreditDays}</div>
          <div className="text-sm text-green-700">Free Days</div>
        </div>
        <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">
            {data.lifetimeAccess ? '∞' : data.referralsNeededForLifetime}
          </div>
          <div className="text-sm text-purple-700">
            {data.lifetimeAccess ? 'Lifetime' : 'To Lifetime'}
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Link</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={data.referralLink}
            readOnly
            className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 truncate"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          When someone signs up with your link, you both get 1 week free.
        </p>
      </div>

      {/* Referral List */}
      {data.referrals.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Referrals</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {data.referrals.map((referral) => (
              <div
                key={referral.number}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
              >
                <span className="text-gray-600">Brother #{referral.number}</span>
                <div className="flex items-center gap-3">
                  <span className="text-primary-600 font-medium">
                    Day {referral.currentStreak}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(referral.joinedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lifetime Access Info */}
      {!data.lifetimeAccess && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            <span className="font-medium">Lifetime Access:</span> Complete a 365-day streak and refer 3 brothers
            to unlock free lifetime access to Reclaim.
          </p>
        </div>
      )}

      {data.lifetimeAccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            You have lifetime access! Thank you for spreading the word.
          </p>
        </div>
      )}
    </div>
  );
}

function PreferencesSection({ userData }: { userData: ReturnType<typeof useUserData>['data'] }) {
  const updateReminderTime = useUpdateReminderTime();
  const updateLeaderboardVisibility = useUpdateLeaderboardVisibility();
  const updateDisplayName = useUpdateDisplayName();
  const changeAccessCode = useChangeAccessCode();
  const { data: nameOptions } = useWarriorNameOptions();

  const [selectedAdjective, setSelectedAdjective] = useState('');
  const [selectedNoun, setSelectedNoun] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const [showAccessCodeConfirm, setShowAccessCodeConfirm] = useState(false);
  const [newAccessCode, setNewAccessCode] = useState('');

  const userInfo = userData?.user;
  const hideFromLeaderboard = userInfo?.hideFromLeaderboard ?? false;
  const reminderTime = userInfo?.reminderTime ?? null;

  // Calculate days until name change is allowed
  const nameChangeDaysRemaining = (() => {
    if (!userInfo?.displayNameChangedAt) return 0;
    const daysSince = Math.floor(
      (Date.now() - new Date(userInfo.displayNameChangedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, 30 - daysSince);
  })();

  const handleReminderChange = (time: string) => {
    updateReminderTime.mutate(time || null);
  };

  const handleLeaderboardToggle = () => {
    updateLeaderboardVisibility.mutate(!hideFromLeaderboard);
  };

  const handleNameSubmit = () => {
    setNameError('');
    setNameSuccess('');
    if (!selectedAdjective || !selectedNoun) {
      setNameError('Please select both an adjective and an animal');
      return;
    }
    const newName = `${selectedAdjective} ${selectedNoun}`;
    updateDisplayName.mutate(newName, {
      onSuccess: () => {
        setNameSuccess('Warrior name updated!');
        setSelectedAdjective('');
        setSelectedNoun('');
        setShowNameInput(false);
        setTimeout(() => setNameSuccess(''), 3000);
      },
      onError: (err: Error) => {
        setNameError(err.message || 'Failed to update name');
      },
    });
  };

  const handleChangeAccessCode = () => {
    changeAccessCode.mutate(undefined, {
      onSuccess: (data) => {
        setNewAccessCode(data.accessCode);
        setShowAccessCodeConfirm(false);
      },
      onError: () => {
        alert('Failed to change access code. Please try again.');
      },
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>

      <div className="space-y-6">
        {/* Daily Reminder Time */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Daily Reminder Time</p>
              <p className="text-sm text-gray-500">When to remind you to check in</p>
            </div>
            <input
              type="time"
              value={reminderTime || ''}
              onChange={(e) => handleReminderChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          {reminderTime && (
            <button
              onClick={() => updateReminderTime.mutate(null)}
              className="text-sm text-gray-400 hover:text-gray-600 mt-1 py-1"
            >
              Clear reminder
            </button>
          )}
        </div>

        <div className="border-t border-gray-100" />

        {/* Hide from Leaderboard */}
        <ToggleRow
          label="Hide from Leaderboard"
          description="Don't show your progress on the Brotherhood Leaderboard"
          enabled={hideFromLeaderboard}
          onToggle={handleLeaderboardToggle}
        />

        <div className="border-t border-gray-100" />

        {/* Change Warrior Name */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Change Warrior Name</p>
              <p className="text-sm text-gray-500">
                {userInfo?.displayName ? `Currently: ${userInfo.displayName}` : 'No name set'}
              </p>
            </div>
            {!showNameInput && (
              <button
                onClick={() => setShowNameInput(true)}
                disabled={nameChangeDaysRemaining > 0}
                className="btn btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {nameChangeDaysRemaining > 0 ? `${nameChangeDaysRemaining}d cooldown` : 'Change'}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">Can only be changed once every 30 days</p>
          {nameSuccess && (
            <p className="text-sm text-green-600 mt-1">{nameSuccess}</p>
          )}
          {showNameInput && nameOptions && (
            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                <select
                  value={selectedAdjective}
                  onChange={(e) => setSelectedAdjective(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select adjective...</option>
                  {nameOptions.adjectives.map((adj) => (
                    <option key={adj} value={adj}>{adj}</option>
                  ))}
                </select>
                <select
                  value={selectedNoun}
                  onChange={(e) => setSelectedNoun(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select animal...</option>
                  {nameOptions.nouns.map((noun) => (
                    <option key={noun} value={noun}>{noun}</option>
                  ))}
                </select>
              </div>
              {selectedAdjective && selectedNoun && (
                <p className="text-sm text-gray-600">
                  Preview: <span className="font-semibold text-gray-900">{selectedAdjective} {selectedNoun}</span>
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleNameSubmit}
                  disabled={updateDisplayName.isPending || !selectedAdjective || !selectedNoun}
                  className="btn btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateDisplayName.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => { setShowNameInput(false); setSelectedAdjective(''); setSelectedNoun(''); setNameError(''); }}
                  className="btn btn-secondary text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {nameError && (
            <p className="text-sm text-red-600 mt-1">{nameError}</p>
          )}
        </div>

        <div className="border-t border-gray-100" />

        {/* Change Access Code */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Change Access Code</p>
              <p className="text-sm text-gray-500">
                Current code: <span className="font-mono font-semibold">{userInfo?.accessCode || '****'}</span>
              </p>
            </div>
            <button
              onClick={() => setShowAccessCodeConfirm(true)}
              className="btn btn-secondary text-sm"
            >
              Regenerate
            </button>
          </div>
          {newAccessCode && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Your new access code: <span className="font-mono text-lg">{newAccessCode}</span>
              </p>
              <p className="text-sm text-green-600 mt-1">
                Save this code somewhere safe. You'll need it to log back in.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Access Code Confirmation Dialog */}
      {showAccessCodeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Change Access Code?</h3>
            <p className="text-gray-600 mb-2">
              This will generate a new access code and invalidate your current one.
            </p>
            <p className="text-sm text-amber-700 font-medium mb-6">
              Make sure to save your new code — you won't be able to log in with the old one.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowAccessCodeConfirm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleChangeAccessCode}
                disabled={changeAccessCode.isPending}
                className="btn bg-primary-600 hover:bg-primary-700 text-white"
              >
                {changeAccessCode.isPending ? 'Generating...' : 'Generate New Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmDialog({
  title,
  message,
  confirmText,
  confirmStyle,
  onConfirm,
  onCancel,
  loading,
}: {
  title: string;
  message: string;
  confirmText: string;
  confirmStyle: 'primary' | 'red' | 'orange';
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const buttonStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    orange: 'bg-orange-500 hover:bg-orange-600 text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} className={`btn ${buttonStyles[confirmStyle]}`} disabled={loading}>
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
