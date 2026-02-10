import { useState } from 'react';
import { useJournalEntries, useCreateJournalEntry, useUpdateJournalEntry, useDeleteJournalEntry } from '../hooks/useApi';
import { JournalEntry } from '../api/client';

const MOODS = [
  { value: 'strong', label: 'Strong', emoji: '💪' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'struggling', label: 'Struggling', emoji: '😔' },
  { value: 'motivated', label: 'Motivated', emoji: '🔥' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'proud', label: 'Proud', emoji: '🏆' },
  { value: 'tempted', label: 'Tempted', emoji: '⚠️' },
];

const TRIGGERS = [
  { value: 'bored', label: 'Bored', emoji: '😑' },
  { value: 'stressed', label: 'Stressed', emoji: '😤' },
  { value: 'lonely', label: 'Lonely', emoji: '🫥' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'late-night', label: 'Late Night', emoji: '🌙' },
  { value: 'social-media', label: 'Social Media', emoji: '📱' },
  { value: 'after-argument', label: 'After Argument', emoji: '💢' },
  { value: 'halt', label: 'HALT', emoji: '🛑' },
];

function PatternInsights({ entries }: { entries: JournalEntry[] }) {
  const triggerCounts: Record<string, number> = {};
  const moodCounts: Record<string, number> = {};
  const hourCounts: Record<number, number> = {};

  for (const entry of entries) {
    if (entry.trigger) {
      triggerCounts[entry.trigger] = (triggerCounts[entry.trigger] || 0) + 1;
    }
    if (entry.mood) {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    }
    const hour = new Date(entry.createdAt).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  const topTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([value, count]) => {
      const t = TRIGGERS.find(t => t.value === value);
      return t ? { ...t, count } : null;
    })
    .filter(Boolean) as { value: string; label: string; emoji: string; count: number }[];

  const topMoods = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([value, count]) => {
      const m = MOODS.find(m => m.value === value);
      return m ? { ...m, count } : null;
    })
    .filter(Boolean) as { value: string; label: string; emoji: string; count: number }[];

  const peakHour = Object.entries(hourCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const formatHour = (h: number) => {
    if (h === 0) return '12 AM';
    if (h === 12) return '12 PM';
    return h > 12 ? `${h - 12} PM` : `${h} AM`;
  };

  if (topTriggers.length === 0 && topMoods.length === 0) return null;

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Patterns</h2>
      <div className="space-y-4">
        {topTriggers.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Top Triggers</p>
            <div className="flex flex-wrap gap-2">
              {topTriggers.map((t) => (
                <span
                  key={t.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700"
                >
                  {t.emoji} {t.label} ({t.count})
                </span>
              ))}
            </div>
          </div>
        )}
        {topMoods.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Most Common Moods</p>
            <div className="flex flex-wrap gap-2">
              {topMoods.map((m) => (
                <span
                  key={m.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
                >
                  {m.emoji} {m.label} ({m.count})
                </span>
              ))}
            </div>
          </div>
        )}
        {peakHour && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Most Active Journaling Time</p>
            <p className="text-sm font-medium text-gray-700">
              {formatHour(Number(peakHour[0]))} ({peakHour[1]} {Number(peakHour[1]) === 1 ? 'entry' : 'entries'})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Journal() {
  const { data, isLoading } = useJournalEntries();
  const createEntry = useCreateJournalEntry();
  const updateEntry = useUpdateJournalEntry();
  const deleteEntry = useDeleteJournalEntry();

  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [trigger, setTrigger] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState('');
  const [editTrigger, setEditTrigger] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createEntry.mutateAsync({ content: content.trim(), mood: mood || undefined, trigger: trigger || undefined });
    setContent('');
    setMood('');
    setTrigger('');
  };

  const handleEdit = (entry: { id: string; content: string; mood: string | null; trigger: string | null }) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditMood(entry.mood || '');
    setEditTrigger(entry.trigger || '');
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editContent.trim()) return;
    await updateEntry.mutateAsync({ id: editingId, content: editContent.trim(), mood: editMood || undefined, trigger: editTrigger || undefined });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteEntry.mutateAsync(id);
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getMoodEmoji = (moodValue: string | null) => {
    if (!moodValue) return null;
    return MOODS.find(m => m.value === moodValue)?.emoji || null;
  };

  const getTriggerEmoji = (triggerValue: string | null) => {
    if (!triggerValue) return null;
    return TRIGGERS.find(t => t.value === triggerValue)?.emoji || null;
  };

  // Group entries by date
  const groupedEntries: { date: string; entries: JournalEntry[] }[] = [];
  if (data?.entries) {
    const groups: Record<string, JournalEntry[]> = {};
    for (const entry of data.entries) {
      const dateKey = new Date(entry.createdAt).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
    }
    for (const [, entries] of Object.entries(groups)) {
      groupedEntries.push({ date: entries[0].createdAt, entries });
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Journal</h1>
        <p className="text-gray-600">Write down your thoughts, triggers, and victories.</p>
        <p className="text-xs text-gray-500 mt-1">Your journal entries are private and cannot be viewed by anyone else.</p>
      </div>

      {/* New Entry Form */}
      <form onSubmit={handleSubmit} className="card">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? How are you feeling today?"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={4}
          maxLength={10000}
        />

        {/* Mood Selector */}
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-2">How are you feeling?</p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(mood === m.value ? '' : m.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mood === m.value
                    ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Selector */}
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-2">Any triggers today?</p>
          <div className="flex flex-wrap gap-2">
            {TRIGGERS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTrigger(trigger === t.value ? '' : t.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  trigger === t.value
                    ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || createEntry.isPending}
            className="btn btn-primary"
          >
            {createEntry.isPending ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>

      {/* Pattern Insights */}
      {data?.entries && data.entries.length >= 3 && (
        <PatternInsights entries={data.entries} />
      )}

      {/* Entries List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      ) : groupedEntries.length === 0 ? (
        <div className="card text-center text-gray-500 py-8">
          <p className="text-lg mb-1">No journal entries yet</p>
          <p className="text-sm">Start writing to track your journey.</p>
        </div>
      ) : (
        groupedEntries.map((group) => (
          <div key={group.date}>
            <h3 className="text-sm font-semibold text-gray-500 mb-2 px-1">
              {formatDate(group.entries[0].createdAt)}
            </h3>
            <div className="space-y-3">
              {group.entries.map((entry) => (
                <div key={entry.id} className="card">
                  {editingId === entry.id ? (
                    // Edit mode
                    <div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={4}
                        maxLength={10000}
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {MOODS.map((m) => (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() => setEditMood(editMood === m.value ? '' : m.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              editMood === m.value
                                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {m.emoji} {m.label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TRIGGERS.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setEditTrigger(editTrigger === t.value ? '' : t.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              editTrigger === t.value
                                ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {t.emoji} {t.label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2 justify-end">
                        <button onClick={() => setEditingId(null)} className="btn btn-secondary text-sm">
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          disabled={updateEntry.isPending}
                          className="btn btn-primary text-sm"
                        >
                          {updateEntry.isPending ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getMoodEmoji(entry.mood) && (
                            <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          )}
                          {getTriggerEmoji(entry.trigger) && (
                            <span className="text-lg">{getTriggerEmoji(entry.trigger)}</span>
                          )}
                          <span className="text-xs text-gray-400">{formatTime(entry.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(entry.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  )}

                  {/* Delete Confirmation */}
                  {showDeleteConfirm === entry.id && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700 mb-2">Delete this entry?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          disabled={deleteEntry.isPending}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
