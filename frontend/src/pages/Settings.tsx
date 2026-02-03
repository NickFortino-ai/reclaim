import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemePicker } from '../components/ThemePicker';

export function Settings() {
  const { user, logout } = useAuth();

  // Notification preferences (UI only for now)
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    milestones: true,
    encouragement: true,
  });

  // Privacy settings
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);

  // Modal states
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDataDialog, setShowDataDialog] = useState(false);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // TODO: Save to backend when push notifications are implemented
  };

  const handleCancelSubscription = () => {
    // TODO: Implement Stripe subscription cancellation
    alert('Subscription cancellation will be implemented with Stripe integration.');
    setShowCancelDialog(false);
  };

  const handleDownloadData = () => {
    // TODO: Implement data export endpoint
    alert('Your data export has been requested. You will receive an email shortly.');
    setShowDataDialog(false);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    alert('Account deletion will be processed. You will receive a confirmation email.');
    setShowDeleteDialog(false);
    logout();
  };

  const supportEmail = 'support@reclaimapp.com';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences.</p>
      </div>

      {/* Theme Picker */}
      <ThemePicker />

      {/* Notifications Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure how and when you receive reminders.
        </p>

        <div className="space-y-4">
          <ToggleRow
            label="Daily Check-in Reminders"
            description="Get reminded to check in each day"
            enabled={notifications.dailyReminder}
            onToggle={() => handleToggle('dailyReminder')}
          />
          <ToggleRow
            label="Milestone Celebrations"
            description="Celebrate when you hit Day 7, 30, 90, and more"
            enabled={notifications.milestones}
            onToggle={() => handleToggle('milestones')}
          />
          <ToggleRow
            label="Encouragement Messages"
            description="Receive motivational messages during tough times"
            enabled={notifications.encouragement}
            onToggle={() => handleToggle('encouragement')}
          />
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Push notifications coming soon. These preferences will be saved.
        </p>
      </div>

      {/* Privacy Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>

        <div className="space-y-4">
          <ToggleRow
            label="Show on Leaderboard"
            description="Display your progress in the Brotherhood Leaderboard"
            enabled={showOnLeaderboard}
            onToggle={() => setShowOnLeaderboard(!showOnLeaderboard)}
          />
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Anonymous Mode:</span> Your identity is always protected.
            Other users only see your streak count and theme color—never your name, email, or any
            personal information. Your access code is your only identifier.
          </p>
        </div>
      </div>

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
          <button
            onClick={() => alert('FAQ page coming soon!')}
            className="btn btn-secondary"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </span>
          </button>
        </div>
      </div>

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
                  <span className="text-purple-600">Completed (365 Days!)</span>
                )}
                {!['active', 'trialing', 'canceled', 'completed'].includes(user?.subscriptionStatus || '') && (
                  <span className="text-gray-600">{user?.subscriptionStatus || 'Unknown'}</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-lg font-bold text-primary-600">{user?.totalDaysWon || 0} / 365</p>
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
        />
      )}

      {/* Download Data Dialog */}
      {showDataDialog && (
        <ConfirmDialog
          title="Download Your Data"
          message="We'll prepare an export of all your data including check-in history, streak records, and settings. The download link will be sent to your registered email."
          confirmText="Request Data Export"
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
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
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
}: {
  title: string;
  message: string;
  confirmText: string;
  confirmStyle: 'primary' | 'red' | 'orange';
  onConfirm: () => void;
  onCancel: () => void;
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
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className={`btn ${buttonStyles[confirmStyle]}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
