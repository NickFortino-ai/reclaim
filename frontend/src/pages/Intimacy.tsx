import { useState } from 'react';
import { useIntimacyLogs, useCreateIntimacyLog, useUpdateIntimacyLog, useDeleteIntimacyLog } from '../hooks/useApi';
import type { IntimacyLog } from '../api/client';

const STAYING_POWER_OPTIONS = [
  { value: 'less-than-1min', label: '< 1 min' },
  { value: '1-5min', label: '1-5 min' },
  { value: '5-15min', label: '5-15 min' },
  { value: '15-30min', label: '15-30 min' },
  { value: '30-plus', label: '30+ min' },
];

const STAYING_POWER_LABELS: Record<string, string> = {
  'less-than-1min': '< 1 min',
  '1-5min': '1-5 min',
  '5-15min': '5-15 min',
  '15-30min': '15-30 min',
  '30-plus': '30+ min',
};

function RatingButtons({ value, onChange, max = 5 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
            n === value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

interface FormData {
  date: string;
  erectionQuality: number;
  stayingPower: string;
  presence: number;
  enjoyment: number;
  connection: number;
  notes: string;
}

const emptyForm: FormData = {
  date: new Date().toISOString().split('T')[0],
  erectionQuality: 3,
  stayingPower: '5-15min',
  presence: 3,
  enjoyment: 3,
  connection: 3,
  notes: '',
};

export function Intimacy() {
  const { data, isLoading, error } = useIntimacyLogs();
  const createLog = useCreateIntimacyLog();
  const updateLog = useUpdateIntimacyLog();
  const deleteLog = useDeleteIntimacyLog();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        <p className="text-red-600">Failed to load intimacy logs. Please try again.</p>
      </div>
    );
  }

  const logs = data.logs;

  const handleSave = async () => {
    if (editingId) {
      await updateLog.mutateAsync({
        id: editingId,
        date: form.date,
        erectionQuality: form.erectionQuality,
        stayingPower: form.stayingPower,
        presence: form.presence,
        enjoyment: form.enjoyment,
        connection: form.connection,
        notes: form.notes || null,
      });
    } else {
      await createLog.mutateAsync({
        date: form.date,
        erectionQuality: form.erectionQuality,
        stayingPower: form.stayingPower,
        presence: form.presence,
        enjoyment: form.enjoyment,
        connection: form.connection,
        notes: form.notes || undefined,
      });
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleEdit = (log: IntimacyLog) => {
    setEditingId(log.id);
    setForm({
      date: log.date.split('T')[0],
      erectionQuality: log.erectionQuality,
      stayingPower: log.stayingPower,
      presence: log.presence,
      enjoyment: log.enjoyment,
      connection: log.connection,
      notes: log.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteLog.mutateAsync(id);
    setDeletingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Group logs by month
  const groupedLogs: Record<string, IntimacyLog[]> = {};
  for (const log of logs) {
    const d = new Date(log.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groupedLogs[key]) groupedLogs[key] = [];
    groupedLogs[key].push(log);
  }

  // Trends data (chronological order)
  const chronLogs = [...logs].reverse();

  // 30-day comparison
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
  const last30 = logs.filter(l => new Date(l.date).getTime() >= thirtyDaysAgo);
  const prior30 = logs.filter(l => {
    const t = new Date(l.date).getTime();
    return t >= sixtyDaysAgo && t < thirtyDaysAgo;
  });

  const avg = (arr: IntimacyLog[], key: keyof Pick<IntimacyLog, 'erectionQuality' | 'presence' | 'enjoyment' | 'connection'>) =>
    arr.length > 0 ? Math.round((arr.reduce((s, l) => s + l[key], 0) / arr.length) * 10) / 10 : 0;

  const metrics = [
    { label: 'Erection Quality', key: 'erectionQuality' as const, color: 'bg-blue-500', lightColor: 'bg-blue-300' },
    { label: 'Presence', key: 'presence' as const, color: 'bg-emerald-500', lightColor: 'bg-emerald-300' },
    { label: 'Enjoyment', key: 'enjoyment' as const, color: 'bg-amber-500', lightColor: 'bg-amber-300' },
    { label: 'Connection', key: 'connection' as const, color: 'bg-rose-500', lightColor: 'bg-rose-300' },
  ];

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

      {/* Log button */}
      {!showForm && (
        <button
          onClick={() => { setForm(emptyForm); setShowForm(true); }}
          className="w-full btn btn-primary py-3"
        >
          Log an Experience
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Edit Log' : 'Log an Experience'}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Erection Quality</label>
            <RatingButtons value={form.erectionQuality} onChange={(v) => setForm({ ...form, erectionQuality: v })} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Poor</span><span>Excellent</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staying Power</label>
            <select
              value={form.stayingPower}
              onChange={(e) => setForm({ ...form, stayingPower: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {STAYING_POWER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Presence / Mindfulness</label>
            <RatingButtons value={form.presence} onChange={(v) => setForm({ ...form, presence: v })} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Distracted</span><span>Fully present</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enjoyment</label>
            <RatingButtons value={form.enjoyment} onChange={(v) => setForm({ ...form, enjoyment: v })} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Low</span><span>High</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Connection</label>
            <RatingButtons value={form.connection} onChange={(v) => setForm({ ...form, connection: v })} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Disconnected</span><span>Deep connection</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any thoughts or reflections..."
              rows={3}
              maxLength={2000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={createLog.isPending || updateLog.isPending}
              className="btn btn-primary flex-1"
            >
              {createLog.isPending || updateLog.isPending ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Trends */}
      {chronLogs.length >= 2 && (
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
                  {chronLogs.slice(-12).map((log, i, arr) => (
                    <div key={log.id} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-sm ${i === arr.length - 1 ? color : lightColor}`}
                        style={{ height: `${(log[key] as number) * 8}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 30-day comparison */}
      {last30.length > 0 && prior30.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">30-Day Comparison</h2>
          <div className="space-y-2">
            {metrics.map(({ label, key }) => {
              const current = avg(last30, key);
              const previous = avg(prior30, key);
              const diff = Math.round((current - previous) * 10) / 10;
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{current}</span>
                    {diff !== 0 && (
                      <span className={`text-sm font-semibold ${diff > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {diff > 0 ? '+' : ''}{diff}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sessions counter */}
      {logs.length > 0 && (
        <div className="card text-center">
          <p className="text-3xl font-bold text-primary-600">{logs.length}</p>
          <p className="text-sm text-gray-500">Total Sessions Logged</p>
        </div>
      )}

      {/* Milestone messages */}
      {chronLogs.length >= 3 && (() => {
        const first3Avg = metrics.reduce((s, { key }) => s + avg(chronLogs.slice(0, 3), key), 0) / metrics.length;
        const last3Avg = metrics.reduce((s, { key }) => s + avg(chronLogs.slice(-3), key), 0) / metrics.length;
        const improvement = last3Avg - first3Avg;
        if (improvement >= 1) {
          return (
            <div className="card bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-semibold text-green-800">Noticeable improvement!</p>
                  <p className="text-sm text-green-700">Your recent experiences are averaging significantly higher than your first entries. The rewiring is working.</p>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* History */}
      {Object.keys(groupedLogs).length > 0 && (
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
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              EQ {log.erectionQuality}/5
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {STAYING_POWER_LABELS[log.stayingPower] || log.stayingPower}
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
                        <div className="flex gap-2 ml-3">
                          <button
                            onClick={() => handleEdit(log)}
                            className="text-gray-400 hover:text-gray-600 text-sm"
                          >
                            Edit
                          </button>
                          {deletingId === log.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(log.id)}
                                className="text-red-600 text-sm font-semibold"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="text-gray-400 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingId(log.id)}
                              className="text-gray-400 hover:text-red-500 text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {logs.length === 0 && !showForm && (
        <div className="card text-center py-8">
          <div className="text-4xl mb-3">💑</div>
          <p className="text-gray-600">No experiences logged yet.</p>
          <p className="text-sm text-gray-500 mt-1">Log your first intimate experience to start tracking your progress.</p>
        </div>
      )}
    </div>
  );
}
