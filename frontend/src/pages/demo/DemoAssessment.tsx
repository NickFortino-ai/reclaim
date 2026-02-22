import { LockedOverlay } from '../../components/LockedOverlay';

const MILESTONE_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  day30: 'Day 30',
  day90: 'Day 90',
  day180: 'Day 180',
  day365: 'Day 365',
};

function getInterpretation(score: number): { level: string; color: string } {
  if (score >= 7) return { level: 'Significant', color: 'text-red-600' };
  if (score >= 4) return { level: 'Problematic', color: 'text-amber-600' };
  if (score >= 2) return { level: 'Low-Moderate', color: 'text-yellow-600' };
  return { level: 'Minimal', color: 'text-green-600' };
}

const mockScores = [
  { id: '1', milestone: 'baseline', totalScore: 8, takenAt: '2025-11-15T10:00:00Z' },
  { id: '2', milestone: 'day90', totalScore: 4, takenAt: '2026-02-12T10:00:00Z' },
];

export function DemoAssessment() {
  const diff = mockScores[1].totalScore - mockScores[0].totalScore;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Recovery Assessment</h1>
        <p className="text-gray-600 text-sm">Track your recovery with the Brief Pornography Screen.</p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-xs text-gray-500">Completely private. Only you can see your assessment results.</p>
      </div>

      {/* Results comparison */}
      <div className="card text-center py-6">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>

        <div className="flex justify-center gap-8 mb-6">
          {mockScores.map((s) => {
            const interp = getInterpretation(s.totalScore);
            return (
              <div key={s.id} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{s.totalScore}</p>
                <p className={`text-sm font-semibold ${interp.color}`}>{interp.level}</p>
                <p className="text-xs text-gray-500 mt-1">{MILESTONE_LABELS[s.milestone]}</p>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg max-w-sm mx-auto">
          <p className="font-semibold text-green-800">
            {Math.abs(diff)} points lower than your baseline
          </p>
          <p className="text-sm text-green-700 mt-1">
            Real, measurable progress. Your recovery is working.
          </p>
        </div>
      </div>

      {/* Score history */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Score History</h2>
        <div className="space-y-3">
          {mockScores.map((s, i) => {
            const interp = getInterpretation(s.totalScore);
            const prev = i > 0 ? mockScores[i - 1].totalScore : null;
            const scoreDiff = prev !== null ? s.totalScore - prev : null;
            return (
              <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{MILESTONE_LABELS[s.milestone]}</p>
                  <p className="text-xs text-gray-500">{new Date(s.takenAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{s.totalScore}</p>
                  <p className={`text-xs font-semibold ${interp.color}`}>{interp.level}</p>
                  {scoreDiff !== null && scoreDiff !== 0 && (
                    <p className={`text-xs font-semibold ${scoreDiff < 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {scoreDiff < 0 ? '' : '+'}{scoreDiff}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Locked assessment flow */}
      <LockedOverlay message="Sign up to take the assessment">
        <button disabled className="w-full btn btn-primary py-3">
          Take Assessment
        </button>
      </LockedOverlay>

      <p className="text-xs text-gray-400 text-center">
        Based on the Brief Pornography Screen (Kraus, Gola, Grubbs et al., Journal of Behavioral Addictions, 2020)
      </p>
    </div>
  );
}
