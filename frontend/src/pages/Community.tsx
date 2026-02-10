import { useState } from 'react';
import { useCommunity, useSendSupport } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

export function Community() {
  const { user } = useAuth();
  const { data, isLoading, error } = useCommunity();
  const sendSupport = useSendSupport();
  const [justSupported, setJustSupported] = useState<Set<string>>(new Set());
  const [animating, setAnimating] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load community. Please try again.</p>
      </div>
    );
  }

  const handleSupport = async (memberId: string) => {
    // Trigger animation
    setAnimating(memberId);

    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    try {
      await sendSupport.mutateAsync(memberId);
      setJustSupported((prev) => new Set(prev).add(memberId));

      // Clear animation after delay
      setTimeout(() => setAnimating(null), 600);
    } catch {
      setAnimating(null);
    }
  };

  const hasSupported = (memberId: string) => {
    const member = data.members.find((m) => m.id === memberId)
      || data.hallOfFame?.find((m) => m.id === memberId);
    return member?.alreadySupported || justSupported.has(memberId);
  };

  // Filter for active streaks and get top 25
  const leaderboard = data.members
    .filter((m) => m.currentStreak > 0)
    .slice(0, 25);

  // Find current user's rank
  const userRank = data.members.findIndex((m) => m.id === user?.id) + 1;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">
          You're not alone. See others on the same journey and send them encouragement.
        </p>
      </div>

      {/* Hall of Fame Section */}
      {data.hallOfFame && data.hallOfFame.length > 0 && (
        <div className="card mb-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-bold text-amber-800">Hall of Fame</h2>
          </div>
          <p className="text-sm text-amber-700 mb-4">
            Warriors who completed the 365-day challenge and earned lifetime membership.
          </p>
          <div className="space-y-2">
            {data.hallOfFame.map((member) => {
              const isCurrentUser = member.id === user?.id;
              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrentUser ? 'bg-amber-100 border border-amber-300' : 'bg-amber-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getThemeColor(member.colorTheme) }}
                    />
                    <span className={`font-medium ${isCurrentUser ? 'text-amber-800' : 'text-gray-700'}`}>
                      {isCurrentUser ? 'You' : member.displayName}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-700">
                        Best: {member.highestStreak}
                      </div>
                      <div className="text-xs text-amber-600">
                        Current: {member.currentStreak}
                      </div>
                    </div>
                    {!isCurrentUser && (
                      <SupportButton
                        memberId={member.id}
                        hasSupported={hasSupported(member.id)}
                        isAnimating={animating === member.id}
                        isPending={sendSupport.isPending}
                        onSupport={handleSupport}
                        compact
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      {leaderboard.length > 0 && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Brotherhood Leaderboard</h2>
            {userRank > 0 && (
              <span className="text-sm text-gray-600">
                Your rank: <span className="font-bold text-primary-600">#{userRank}</span>
              </span>
            )}
          </div>

          <div className="space-y-2">
            {leaderboard.map((member, index) => {
              const isCurrentUser = member.id === user?.id;
              const rank = index + 1;

              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrentUser
                      ? 'bg-primary-50 border border-primary-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        rank === 1
                          ? 'bg-yellow-500 text-white'
                          : rank === 2
                          ? 'bg-gray-400 text-white'
                          : rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {rank}
                    </div>

                    {/* User Theme Color */}
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getThemeColor(member.colorTheme) }}
                    />

                    <span className={`font-medium ${isCurrentUser ? 'text-primary-700' : 'text-gray-700'}`}>
                      {isCurrentUser ? 'You' : member.displayName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary-600">
                      Day {member.currentStreak}
                    </span>
                    {member.isCompleted && (
                      <span className="text-green-600" title="Completed 365 days">
                        🏆
                      </span>
                    )}
                    {/* Quick support button in leaderboard */}
                    {!isCurrentUser && (
                      <SupportButton
                        memberId={member.id}
                        hasSupported={hasSupported(member.id)}
                        isAnimating={animating === member.id}
                        isPending={sendSupport.isPending}
                        onSupport={handleSupport}
                        compact
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {leaderboard.length === 25 && data.members.filter(m => m.currentStreak > 0).length > 25 && (
            <p className="text-sm text-gray-500 text-center mt-3">
              Showing top 25 of {data.members.filter(m => m.currentStreak > 0).length} active warriors
            </p>
          )}
        </div>
      )}

      {/* Community Cards Section */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Send Support</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.members.map((member) => (
          <div
            key={member.id}
            className={`card transition-all ${member.id === user?.id ? 'ring-2 ring-primary-500' : ''} ${
              animating === member.id ? 'scale-[1.02] shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: getThemeColor(member.colorTheme) }}
                />
                <span className="font-medium text-gray-900">
                  {member.displayName}
                  {member.id === user?.id && (
                    <span className="text-xs text-primary-600 ml-1">(You)</span>
                  )}
                </span>
              </div>
              {member.isCompleted && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Completed!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mb-3">
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  {member.currentStreak}
                </div>
                <div className="text-xs text-gray-500">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {member.totalDaysWon}
                </div>
                <div className="text-xs text-gray-500">Total Days</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {(member.supportReceivedToday + (justSupported.has(member.id) && !member.alreadySupported ? 1 : 0)) > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="text-green-600">♥</span>
                    {member.supportReceivedToday + (justSupported.has(member.id) && !member.alreadySupported ? 1 : 0)} today
                  </span>
                )}
              </span>

              {member.id !== user?.id && (
                <SupportButton
                  memberId={member.id}
                  hasSupported={hasSupported(member.id)}
                  isAnimating={animating === member.id}
                  isPending={sendSupport.isPending}
                  onSupport={handleSupport}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {data.members.length === 0 && (
        <div className="card text-center">
          <p className="text-gray-600">No community members yet. Be the first!</p>
        </div>
      )}
    </div>
  );
}

function SupportButton({
  memberId,
  hasSupported,
  isAnimating,
  isPending,
  onSupport,
  compact = false,
}: {
  memberId: string;
  hasSupported: boolean;
  isAnimating: boolean;
  isPending: boolean;
  onSupport: (id: string) => void;
  compact?: boolean;
}) {
  if (hasSupported) {
    return (
      <span
        className={`inline-flex items-center gap-1 ${
          compact ? 'text-sm' : 'btn text-sm py-1 px-3'
        } text-green-600 ${isAnimating ? 'animate-pulse' : ''}`}
      >
        <svg
          className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} ${isAnimating ? 'animate-bounce' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {!compact && 'Supported'}
      </span>
    );
  }

  return (
    <button
      onClick={() => onSupport(memberId)}
      disabled={isPending}
      className={`${
        compact
          ? 'p-1.5 rounded-full hover:bg-gray-200 transition-colors'
          : 'btn btn-outline text-sm py-1 px-3'
      } ${isAnimating ? 'animate-pulse' : ''}`}
      title="Send support"
    >
      {compact ? (
        <svg className="w-5 h-5 text-gray-500 hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ) : (
        'Send Support ♥'
      )}
    </button>
  );
}

function getThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    slate: '#475569',
    navy: '#334e68',
    charcoal: '#333333',
    gunmetal: '#3e4c59',
    forest: '#15803d',
    olive: '#4d5638',
    burgundy: '#8c1f3b',
    leather: '#71453a',
  };
  return colors[theme] || colors.slate;
}
