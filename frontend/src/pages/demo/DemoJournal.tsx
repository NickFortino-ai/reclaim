import { LockedOverlay } from '../../components/LockedOverlay';

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

export function DemoJournal() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Journal</h1>
        <p className="text-gray-600">Write down your thoughts, triggers, and victories.</p>
        <p className="text-xs text-gray-500 mt-1">Your journal entries are private and cannot be viewed by anyone else.</p>
      </div>

      {/* Demo Intimacy Check-In Card - Locked */}
      <LockedOverlay message="Sign up to track your intimacy progress">
        <div className="card bg-rose-50 border border-rose-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-rose-900">Intimacy Check-In</h2>
              <p className="text-sm text-rose-700">Rate how you're feeling in your real-world connections</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-rose-800">Confidence Around Women</label>
                <span className="text-sm font-bold text-rose-700">7/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={7}
                disabled
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-rose-800">Real-World Attraction</label>
                <span className="text-sm font-bold text-rose-700">6/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={6}
                disabled
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-rose-800">Emotional Connection</label>
                <span className="text-sm font-bold text-rose-700">5/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={5}
                disabled
                className="w-full accent-rose-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button disabled className="btn bg-rose-600 text-white">
              Save Check-In
            </button>
          </div>
        </div>
      </LockedOverlay>

      {/* Demo Entry Form - Locked */}
      <LockedOverlay message="Sign up to start journaling">
        <div className="card">
          <textarea
            disabled
            placeholder="What's on your mind? How are you feeling today?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none bg-gray-50"
            rows={4}
          />
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-2">How are you feeling?</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <span
                  key={m.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                >
                  {m.emoji} {m.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-2">Any triggers today?</p>
            <div className="flex flex-wrap gap-2">
              {TRIGGERS.map((t) => (
                <span
                  key={t.value}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                >
                  {t.emoji} {t.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button disabled className="btn btn-primary">
              Save Entry
            </button>
          </div>
        </div>
      </LockedOverlay>

      {/* Demo Sample Entries */}
      <h3 className="text-sm font-semibold text-gray-500 mb-2 px-1">Today</h3>
      <div className="space-y-3">
        <div className="card">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">💪</span>
              <span className="text-xs text-gray-400">9:15 AM</span>
            </div>
          </div>
          <p className="text-gray-800">Woke up feeling strong today. Morning routine is becoming automatic — cold shower, workout, no phone for the first hour. This is who I'm becoming.</p>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-500 mb-2 px-1">Yesterday</h3>
      <div className="space-y-3">
        <div className="card">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <span className="text-lg">🌙</span>
              <span className="text-xs text-gray-400">10:30 PM</span>
            </div>
          </div>
          <p className="text-gray-800">Had a strong urge tonight but used the breathing exercise and it passed. Wrote this instead of giving in. Small victory, but it matters.</p>
        </div>
        <div className="card">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <span className="text-xs text-gray-400">7:00 AM</span>
            </div>
          </div>
          <p className="text-gray-800">Day 6 done. Energy levels are noticeably higher. Crushed my workout and had a great day at work. The discipline is carrying over into everything.</p>
        </div>
      </div>
    </div>
  );
}
