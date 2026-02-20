import { LockedOverlay } from '../../components/LockedOverlay';

export function DemoPatterns() {
  // Mock intimacy check-in data
  const checkIns = [
    { dayNumber: 10, confidence: 4, realAttraction: 3, emotionalConnection: 3 },
    { dayNumber: 20, confidence: 6, realAttraction: 5, emotionalConnection: 4 },
    { dayNumber: 30, confidence: 7, realAttraction: 6, emotionalConnection: 5 },
    { dayNumber: 40, confidence: 8, realAttraction: 7, emotionalConnection: 6 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Patterns</h1>
        <p className="text-gray-600 text-sm">Insights from your recovery journey, powered by your data.</p>
      </div>

      {/* Journey Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Journey Overview</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary-600">42</p>
            <p className="text-sm text-gray-500">Total Days Won</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary-600">85%</p>
            <p className="text-sm text-gray-500">Consistency Rate</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary-600">2</p>
            <p className="text-sm text-gray-500">Total Resets</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Streak</span>
            <span className="font-semibold text-gray-900">7 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Highest Streak</span>
            <span className="font-semibold text-gray-900">14 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Days Won</span>
            <span className="font-semibold text-gray-900">42</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Avg Streak Before Reset</span>
            <span className="font-semibold text-gray-900">6 days</span>
          </div>
        </div>
      </div>

      {/* Intimacy Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Intimacy Progress</h2>
        <p className="text-sm text-gray-500 mb-4">How your real-world connections are improving</p>

        <div className="space-y-4">
          {[
            { label: 'Confidence Around Women', key: 'confidence' as const, barColor: 'bg-rose-300', activeColor: 'bg-rose-500' },
            { label: 'Real-World Attraction', key: 'realAttraction' as const, barColor: 'bg-pink-300', activeColor: 'bg-pink-500' },
            { label: 'Emotional Connection', key: 'emotionalConnection' as const, barColor: 'bg-fuchsia-300', activeColor: 'bg-fuchsia-500' },
          ].map(({ label, key, barColor, activeColor }) => {
            const latest = checkIns[checkIns.length - 1];
            const change = latest[key] - checkIns[0][key];
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{latest[key]}/10</span>
                    {change !== 0 && (
                      <span className={`text-sm font-semibold ${change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {change > 0 ? '+' : ''}{change} since Day {checkIns[0].dayNumber}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1.5 items-end">
                  {checkIns.map((ci, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-sm ${i === checkIns.length - 1 ? activeColor : barColor}`}
                        style={{ height: `${ci[key] * 3}px` }}
                      />
                      <span className="text-xs text-gray-400 mt-1">D{ci.dayNumber}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PPCS Recovery Assessment */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recovery Assessment (PPCS)</h2>
        <p className="text-sm text-gray-500 mb-4">Problematic pornography consumption score over time</p>

        <div className="flex gap-2 items-end justify-center mb-4">
          {[
            { milestone: 'Baseline', score: 78 },
            { milestone: 'Day 90', score: 52 },
          ].map(({ milestone, score }, i, arr) => {
            const maxScore = 126;
            const height = Math.max((score / maxScore) * 120, 16);
            const isLatest = i === arr.length - 1;
            return (
              <div key={milestone} className="flex flex-col items-center flex-1 max-w-[80px]">
                <span className="text-sm font-bold text-gray-900 mb-1">{score}</span>
                <div
                  className={`w-full rounded-sm ${isLatest ? 'bg-purple-500' : 'bg-purple-300'}`}
                  style={{ height: `${height}px` }}
                />
                <span className="text-xs text-gray-500 mt-1">{milestone}</span>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">
            26 points lower since baseline — measurable improvement
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Based on the Problematic Pornography Consumption Scale (Bothe et al., The Journal of Sex Research, 2017)
        </p>
      </div>

      {/* Trigger Analysis */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Trigger Analysis</h2>
        <p className="text-sm text-gray-500 mb-3">Your most common triggers from journal entries</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700">
            🌙 Late Night (8)
          </span>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700">
            😑 Bored (6)
          </span>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700">
            😤 Stressed (4)
          </span>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">
            <span className="font-semibold">Riskiest day:</span> Saturday — this is when you use Urge Surf the most. Plan ahead for this day.
          </p>
        </div>
      </div>

      {/* Mood Patterns - Locked */}
      <LockedOverlay message="Sign up to see your mood patterns">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Mood Patterns</h2>
          <p className="text-sm text-gray-500 mb-3">Your most frequently logged moods</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
              💪 Strong (12)
            </span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
              🔥 Motivated (9)
            </span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
              😌 Calm (7)
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Recent Mood Trend (last 7)</p>
            <div className="flex gap-1 flex-wrap">
              <span className="text-lg">💪</span>
              <span className="text-lg">🔥</span>
              <span className="text-lg">😌</span>
              <span className="text-lg">🏆</span>
              <span className="text-lg">💪</span>
              <span className="text-lg">🔥</span>
              <span className="text-lg">😌</span>
            </div>
          </div>
        </div>
      </LockedOverlay>

      {/* Timing Insights - Locked */}
      <LockedOverlay message="Sign up to see your timing insights">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Timing Insights</h2>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Peak Journaling Time</span>
              <span className="font-semibold text-gray-900">9 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Peak Urge Time</span>
              <span className="font-semibold text-gray-900">11 PM</span>
            </div>
          </div>
        </div>
      </LockedOverlay>

      {/* Urge Surfing */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Urge Surfing</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">12</p>
            <p className="text-xs text-gray-500">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">8</p>
            <p className="text-xs text-gray-500">Last 30 Days</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Breathing Completion</span>
              <span className="text-sm font-semibold text-gray-900">83%</span>
            </div>
            <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all"
                style={{ width: '83%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Resumed Exercise</span>
              <span className="text-sm font-semibold text-gray-900">67%</span>
            </div>
            <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: '67%' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="text-green-600 font-semibold">Urges are decreasing</span> compared to the prior 30 days. Your resistance is growing.
          </p>
        </div>
      </div>

      {/* Desensitization Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Desensitization Progress</h2>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Points Progress</span>
            <span className="text-sm font-semibold text-gray-900">45 / 300</span>
          </div>
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary-500 h-full rounded-full transition-all"
              style={{ width: '15%' }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">9</p>
            <p className="text-xs text-gray-500">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">5</p>
            <p className="text-xs text-gray-500">Avg Points/Session</p>
          </div>
        </div>
      </div>

      {/* Journal Activity - Locked */}
      <LockedOverlay message="Sign up to see your journal activity">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Journal Activity</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-primary-600">24</p>
              <p className="text-sm text-gray-500">Total Entries</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-primary-600">18</p>
              <p className="text-sm text-gray-500">Last 30 Days</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-primary-600">4.5</p>
              <p className="text-sm text-gray-500">Avg/Week</p>
            </div>
          </div>
        </div>
      </LockedOverlay>
    </div>
  );
}
