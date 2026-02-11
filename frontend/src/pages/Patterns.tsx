import { usePatterns } from '../hooks/useApi';
import { MOODS, TRIGGERS, DAY_NAMES } from '../utils/constants';

const formatHour = (h: number) => {
  if (h === 0) return '12 AM';
  if (h === 12) return '12 PM';
  return h > 12 ? `${h - 12} PM` : `${h} AM`;
};

export function Patterns() {
  const { data, isLoading, error } = usePatterns();

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
        <p className="text-red-600">Failed to load patterns. Please try again.</p>
      </div>
    );
  }

  const hasEnoughData = data.journey.totalDaysWon > 0 ||
    data.journalStats.totalEntries > 0 ||
    data.urgeSurfing.totalSessions > 0 ||
    data.desensitization.totalSessions > 0;

  if (!hasEnoughData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Patterns</h1>
          <p className="text-gray-600 mb-4">
            Your personal insights will appear here as you use the app.
          </p>
          <p className="text-sm text-gray-500">
            Check in daily, journal your thoughts, surf urges, and complete desensitization exercises
            to unlock powerful insights about your behavioral patterns.
          </p>
        </div>
      </div>
    );
  }

  const hasTriggerData = data.triggers.top.length >= 3;
  const hasMoodData = data.moods.top.length >= 3;
  const hasTimingData = data.journalStats.totalEntries >= 5 || data.urgeSurfing.totalSessions >= 5;
  const hasUrgeData = data.urgeSurfing.totalSessions > 0;
  const hasDesensData = data.desensitization.totalSessions > 0;
  const hasJournalData = data.journalStats.totalEntries > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Patterns</h1>
        <p className="text-gray-600 text-sm">Insights from your recovery journey, powered by your data.</p>
      </div>

      {/* Journey Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Journey Overview</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{data.journey.daysSinceStart}</p>
            <p className="text-xs text-gray-500">Days Since Start</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{data.journey.consistencyRate}%</p>
            <p className="text-xs text-gray-500">Consistency Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{data.journey.totalResets}</p>
            <p className="text-xs text-gray-500">Total Resets</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Streak</span>
            <span className="font-semibold text-gray-900">{data.journey.currentStreak} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Highest Streak</span>
            <span className="font-semibold text-gray-900">{data.journey.highestStreak} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Days Won</span>
            <span className="font-semibold text-gray-900">{data.journey.totalDaysWon}</span>
          </div>
          {data.journey.totalResets > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Streak Before Reset</span>
              <span className="font-semibold text-gray-900">{data.journey.avgStreakBeforeReset} days</span>
            </div>
          )}
        </div>
      </div>

      {/* Trigger Analysis */}
      {hasTriggerData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Trigger Analysis</h2>
          <p className="text-sm text-gray-500 mb-3">Your most common triggers from journal entries</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.triggers.top.map((t) => {
              const info = TRIGGERS.find(tr => tr.value === t.value);
              return (
                <span
                  key={t.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700"
                >
                  {info?.emoji || ''} {info?.label || t.value} ({t.count})
                </span>
              );
            })}
          </div>
          {data.timing.riskiestDayOfWeek && (
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <span className="font-semibold">Riskiest day:</span> {data.timing.riskiestDayOfWeek} — this is when you use Urge Surf the most. Plan ahead for this day.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mood Patterns */}
      {hasMoodData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Mood Patterns</h2>
          <p className="text-sm text-gray-500 mb-3">Your most frequently logged moods</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.moods.top.map((m) => {
              const info = MOODS.find(mo => mo.value === m.value);
              return (
                <span
                  key={m.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
                >
                  {info?.emoji || ''} {info?.label || m.value} ({m.count})
                </span>
              );
            })}
          </div>
          {data.moods.recentTrend.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Recent Mood Trend (last {data.moods.recentTrend.length})</p>
              <div className="flex gap-1 flex-wrap">
                {data.moods.recentTrend.map((mood, i) => {
                  const info = MOODS.find(m => m.value === mood);
                  return (
                    <span key={i} className="text-lg" title={info?.label || mood}>
                      {info?.emoji || '?'}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timing Insights */}
      {hasTimingData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Timing Insights</h2>
          <div className="space-y-3 mb-4">
            {data.timing.peakJournalHour !== null && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Peak Journaling Time</span>
                <span className="font-semibold text-gray-900">{formatHour(data.timing.peakJournalHour)}</span>
              </div>
            )}
            {data.timing.peakUrgeSurfHour !== null && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Peak Urge Time</span>
                <span className="font-semibold text-gray-900">{formatHour(data.timing.peakUrgeSurfHour)}</span>
              </div>
            )}
          </div>

          {/* Day of week breakdown */}
          {Object.keys(data.timing.journalByDayOfWeek).length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Journal Entries by Day</p>
              <div className="space-y-1.5">
                {DAY_NAMES.map(day => {
                  const count = data.timing.journalByDayOfWeek[day] || 0;
                  const maxCount = Math.max(...Object.values(data.timing.journalByDayOfWeek), 1);
                  const width = Math.max((count / maxCount) * 100, 0);
                  return (
                    <div key={day} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-8 text-right">{day.slice(0, 3)}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                        {count > 0 && (
                          <div
                            className="bg-primary-400 h-full rounded-full transition-all"
                            style={{ width: `${width}%` }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Urge Surfing */}
      {hasUrgeData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Urge Surfing</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.urgeSurfing.totalSessions}</p>
              <p className="text-xs text-gray-500">Total Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.urgeSurfing.last30DaysCount}</p>
              <p className="text-xs text-gray-500">Last 30 Days</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Breathing Completion</span>
                <span className="text-sm font-semibold text-gray-900">{data.urgeSurfing.breathingCompletionRate}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all"
                  style={{ width: `${data.urgeSurfing.breathingCompletionRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Resumed Exercise</span>
                <span className="text-sm font-semibold text-gray-900">{data.urgeSurfing.resumedExerciseRate}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${data.urgeSurfing.resumedExerciseRate}%` }}
                />
              </div>
            </div>
          </div>

          {data.urgeSurfing.trend && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                {data.urgeSurfing.trend === 'decreasing' && (
                  <><span className="text-green-600 font-semibold">Urges are decreasing</span> compared to the prior 30 days. Your resistance is growing.</>
                )}
                {data.urgeSurfing.trend === 'increasing' && (
                  <><span className="text-amber-600 font-semibold">Urges are increasing</span> compared to the prior 30 days. Stay vigilant and use your tools.</>
                )}
                {data.urgeSurfing.trend === 'stable' && (
                  <><span className="text-gray-600 font-semibold">Urge frequency is stable</span> compared to the prior 30 days.</>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Desensitization Progress */}
      {hasDesensData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Desensitization Progress</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Points Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {data.desensitization.totalPoints} / {data.desensitization.maxPoints}
              </span>
            </div>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary-500 h-full rounded-full transition-all"
                style={{ width: `${(data.desensitization.totalPoints / data.desensitization.maxPoints) * 100}%` }}
              />
            </div>
            {data.desensitization.totalPoints >= data.desensitization.maxPoints && (
              <p className="text-sm text-green-600 font-medium mt-1">Desensitization complete!</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.desensitization.totalSessions}</p>
              <p className="text-xs text-gray-500">Total Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.desensitization.avgPointsPerSession}</p>
              <p className="text-xs text-gray-500">Avg Points/Session</p>
            </div>
          </div>
        </div>
      )}

      {/* Journal Activity */}
      {hasJournalData && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Journal Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.journalStats.totalEntries}</p>
              <p className="text-xs text-gray-500">Total Entries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.journalStats.entriesLast30Days}</p>
              <p className="text-xs text-gray-500">Last 30 Days</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{data.journalStats.avgEntriesPerWeek}</p>
              <p className="text-xs text-gray-500">Avg/Week</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
