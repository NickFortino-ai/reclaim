import { LockedOverlay } from '../../components/LockedOverlay';

const STAYING_POWER_LABELS: Record<string, string> = {
  'less-than-1min': '< 1 min',
  '1-5min': '1-5 min',
  '5-15min': '5-15 min',
  '15-30min': '15-30 min',
  '30-plus': '30+ min',
};

const mockLogs = [
  { id: '1', date: '2026-02-15', erectionQuality: 4, stayingPower: '15-30min', presence: 4, enjoyment: 4, connection: 4, notes: 'Really present this time. Noticed a big difference from a month ago.' },
  { id: '2', date: '2026-02-08', erectionQuality: 3, stayingPower: '5-15min', presence: 3, enjoyment: 3, connection: 3, notes: null },
  { id: '3', date: '2026-01-25', erectionQuality: 3, stayingPower: '5-15min', presence: 3, enjoyment: 4, connection: 3, notes: 'Feeling more connected.' },
  { id: '4', date: '2026-01-15', erectionQuality: 2, stayingPower: '1-5min', presence: 2, enjoyment: 2, connection: 2, notes: null },
  { id: '5', date: '2026-01-05', erectionQuality: 2, stayingPower: '1-5min', presence: 2, enjoyment: 2, connection: 2, notes: 'Starting to track. Honest baseline.' },
  { id: '6', date: '2025-12-20', erectionQuality: 1, stayingPower: 'less-than-1min', presence: 1, enjoyment: 1, connection: 1, notes: 'This is why I need to change.' },
];

const metrics = [
  { label: 'Erection Quality', key: 'erectionQuality' as const, color: 'bg-blue-500', lightColor: 'bg-blue-300' },
  { label: 'Presence', key: 'presence' as const, color: 'bg-emerald-500', lightColor: 'bg-emerald-300' },
  { label: 'Enjoyment', key: 'enjoyment' as const, color: 'bg-amber-500', lightColor: 'bg-amber-300' },
  { label: 'Connection', key: 'connection' as const, color: 'bg-rose-500', lightColor: 'bg-rose-300' },
];

export function DemoIntimacy() {
  const chronLogs = [...mockLogs].reverse();

  const groupedLogs: Record<string, typeof mockLogs> = {};
  for (const log of mockLogs) {
    const d = new Date(log.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groupedLogs[key]) groupedLogs[key] = [];
    groupedLogs[key].push(log);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Privacy badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-xs text-gray-500">Completely private. No one — not even Reclaim admins — can see this data.</p>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Intimacy Tracker</h1>
        <p className="text-gray-600 text-sm">Track real sexual experiences to see how your recovery impacts your intimate life.</p>
      </div>

      {/* Locked form */}
      <LockedOverlay message="Sign up to log experiences">
        <button disabled className="w-full btn btn-primary py-3">
          Log an Experience
        </button>
      </LockedOverlay>

      {/* Trends */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Trends</h2>
        <div className="space-y-4">
          {metrics.map(({ label, key, color, lightColor }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-900">
                  {chronLogs[chronLogs.length - 1][key]}/5
                </span>
              </div>
              <div className="flex gap-1 items-end">
                {chronLogs.map((log, i) => (
                  <div key={log.id} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-full rounded-sm ${i === chronLogs.length - 1 ? color : lightColor}`}
                      style={{ height: `${log[key] * 8}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions counter */}
      <div className="card text-center">
        <p className="text-3xl font-bold text-primary-600">{mockLogs.length}</p>
        <p className="text-sm text-gray-500">Total Sessions Logged</p>
      </div>

      {/* Improvement message */}
      <div className="card bg-green-50 border border-green-200">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎉</div>
          <div>
            <p className="font-semibold text-green-800">Noticeable improvement!</p>
            <p className="text-sm text-green-700">Your recent experiences are averaging significantly higher than your first entries. The rewiring is working.</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">History</h2>
        {Object.entries(groupedLogs).map(([monthKey, monthLogs]) => {
          const [y, m] = monthKey.split('-');
          const monthLabel = new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          return (
            <div key={monthKey} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">{monthLabel}</h3>
              <div className="space-y-2">
                {monthLogs.map((log) => (
                  <div key={log.id} className="card">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          EQ {log.erectionQuality}/5
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {STAYING_POWER_LABELS[log.stayingPower]}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          P {log.presence}/5
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          E {log.enjoyment}/5
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                          C {log.connection}/5
                        </span>
                      </div>
                      {log.notes && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{log.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
