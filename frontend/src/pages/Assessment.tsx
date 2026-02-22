import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentScores, useSubmitAssessment, useUserData } from '../hooks/useApi';

const BPS_QUESTIONS = [
  'You find yourself using pornography more than you want to.',
  'You have attempted to cut back or stop using pornography, but were unsuccessful.',
  'You find it difficult to resist strong urges to use pornography.',
  'You find yourself using pornography to cope with strong emotions (e.g., sadness, anger, loneliness).',
  'You continue to use pornography even though you feel guilty about it.',
];

const SCALE_OPTIONS = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Occasionally' },
  { value: 2, label: 'Very Often' },
];

const MILESTONE_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  day30: 'Day 30',
  day90: 'Day 90',
  day180: 'Day 180',
  day365: 'Day 365',
};

function getInterpretation(score: number): { level: string; color: string; message: string } {
  if (score >= 7) {
    return { level: 'Significant', color: 'text-red-600', message: 'Significant problematic use. Your brain has been deeply conditioned, but that also means you have the most to gain. Stick with the program.' };
  }
  if (score >= 4) {
    return { level: 'Problematic', color: 'text-amber-600', message: "Problematic use detected. This is exactly why you're here. Reclaim is designed to help you change these patterns." };
  }
  if (score >= 2) {
    return { level: 'Low-Moderate', color: 'text-yellow-600', message: 'Low to moderate concern. Some patterns worth watching as you progress.' };
  }
  return { level: 'Minimal', color: 'text-green-600', message: 'Minimal concern. Your relationship with pornography shows few signs of being problematic.' };
}

function getMilestoneForUser(totalDaysWon: number, completedMilestones: Set<string>): string | null {
  if (!completedMilestones.has('baseline')) return 'baseline';
  const thresholds = [
    { days: 365, milestone: 'day365' },
    { days: 180, milestone: 'day180' },
    { days: 90, milestone: 'day90' },
    { days: 30, milestone: 'day30' },
  ];
  for (const { days, milestone } of thresholds) {
    if (totalDaysWon >= days && !completedMilestones.has(milestone)) return milestone;
  }
  return null;
}

export function Assessment() {
  const { data: userData } = useUserData();
  const { data: scoresData, isLoading } = useAssessmentScores();
  const submitAssessment = useSubmitAssessment();
  const navigate = useNavigate();

  const [screen, setScreen] = useState<'welcome' | 'questions' | 'results'>('welcome');
  const [responses, setResponses] = useState<(number | null)[]>(new Array(5).fill(null));
  const [resultScore, setResultScore] = useState<number | null>(null);
  const [resultMilestone, setResultMilestone] = useState<string>('baseline');
  const [showAbout, setShowAbout] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const scores = scoresData?.scores || [];
  const completedMilestones = new Set(scores.map(s => s.milestone));
  const currentMilestone = userData ? getMilestoneForUser(userData.user.totalDaysWon, completedMilestones) : null;
  const isBaseline = currentMilestone === 'baseline';

  const allAnswered = responses.every(r => r !== null);

  const handleSubmit = async () => {
    if (!currentMilestone || !allAnswered) return;
    const result = await submitAssessment.mutateAsync({
      responses: responses as number[],
      milestone: currentMilestone,
    });
    setResultScore(result.totalScore);
    setResultMilestone(result.milestone);
    setScreen('results');
  };

  // Welcome screen
  if (screen === 'welcome') {
    const previousScore = scores.length > 0 ? scores[scores.length - 1] : null;

    if (!currentMilestone) {
      // No assessment due — show history
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Recovery Assessment</h1>
            <p className="text-gray-600 text-sm">Your assessment history.</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs text-gray-500">Completely private. Only you can see your assessment results.</p>
          </div>

          {scores.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Scores</h2>
              <div className="space-y-3">
                {scores.map((s, i) => {
                  const interp = getInterpretation(s.totalScore);
                  const prev = i > 0 ? scores[i - 1].totalScore : null;
                  const diff = prev !== null ? s.totalScore - prev : null;
                  return (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{MILESTONE_LABELS[s.milestone] || s.milestone}</p>
                        <p className="text-xs text-gray-500">{new Date(s.takenAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{s.totalScore}</p>
                        <p className={`text-xs font-semibold ${interp.color}`}>{interp.level}</p>
                        {diff !== null && diff !== 0 && (
                          <p className={`text-xs font-semibold ${diff < 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {diff < 0 ? '' : '+'}{diff}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center">
            Based on the Brief Pornography Screen (Kraus, Gola, Grubbs et al., Journal of Behavioral Addictions, 2020)
          </p>

          <button onClick={() => navigate('/dashboard')} className="w-full btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center py-8">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {isBaseline ? 'Recovery Assessment' : `${MILESTONE_LABELS[currentMilestone]} Assessment`}
          </h1>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            {isBaseline
              ? 'Before you begin your journey, let\'s establish your starting point. This quick assessment helps you measure your recovery progress over time.'
              : `You've reached ${MILESTONE_LABELS[currentMilestone]}! Let's measure how far you've come.`
            }
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>5 questions, takes about 30 seconds</p>
            <p>Answer based on the last 6 months{isBaseline ? '' : ' since your last assessment'}</p>
          </div>

          <div className="flex items-center gap-2 justify-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 max-w-sm mx-auto mb-4">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs text-gray-500">Your responses are completely private.</p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 mx-auto transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${showAbout ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              What is this assessment?
            </button>
            {showAbout && (
              <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100 text-left text-sm text-gray-700 space-y-2">
                <p>
                  This assessment uses the <strong>Brief Pornography Screen (BPS)</strong>, a clinically validated 5-item screening tool developed by Kraus, Gola, Grubbs and colleagues.
                </p>
                <p>
                  The BPS is designed to quickly identify problematic pornography use patterns including loss of control, unsuccessful attempts to quit, difficulty resisting urges, emotional coping, and continued use despite guilt.
                </p>
                <p>
                  A score of 4 or higher indicates problematic pornography use. By retaking the screen at milestones, you can objectively measure your recovery progress over time.
                </p>
                <p className="text-xs text-gray-500 pt-1">
                  Source: Kraus, Gola, Grubbs et al., <em>Journal of Behavioral Addictions</em>, 2020
                </p>
              </div>
            )}
          </div>

          {previousScore && (
            <div className="p-3 bg-primary-50 rounded-lg mb-4 max-w-sm mx-auto">
              <p className="text-sm text-primary-700">
                Previous score: <span className="font-bold">{previousScore.totalScore}</span> ({MILESTONE_LABELS[previousScore.milestone]})
              </p>
            </div>
          )}

          <button
            onClick={() => setScreen('questions')}
            className="btn btn-primary px-8 py-3"
          >
            {isBaseline ? 'Begin Assessment' : 'Start Assessment'}
          </button>
        </div>
      </div>
    );
  }

  // Questions screen — all 5 on a single page
  if (screen === 'questions') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-6 italic">
            In the last 6 months, have any of these situations happened to you in regards to your use of pornography?
          </p>

          <div className="space-y-6">
            {BPS_QUESTIONS.map((question, qIdx) => (
              <div key={qIdx}>
                <p className="font-medium text-gray-900 mb-3">
                  {qIdx + 1}. {question}
                </p>
                <div className="flex gap-2">
                  {SCALE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const next = [...responses];
                        next[qIdx] = option.value;
                        setResponses(next);
                      }}
                      className={`flex-1 py-3 px-2 rounded-lg font-medium text-sm transition-colors ${
                        responses[qIdx] === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setScreen('welcome'); setResponses(new Array(5).fill(null)); }}
            className="btn btn-secondary flex-1"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitAssessment.isPending}
            className="btn btn-primary flex-1 disabled:opacity-50"
          >
            {submitAssessment.isPending ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (screen === 'results' && resultScore !== null) {
    const interp = getInterpretation(resultScore);
    const baselineScore = scores.find(s => s.milestone === 'baseline');
    const previousScore = scores.find(s => s.milestone !== resultMilestone);
    const diff = previousScore ? resultScore - previousScore.totalScore : null;
    const isDay365 = resultMilestone === 'day365';

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center py-8">
          <div className="text-4xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Results</h1>
          <p className="text-sm text-gray-500 mb-6">{MILESTONE_LABELS[resultMilestone]} Assessment</p>

          <div className="mb-6">
            <p className="text-5xl font-bold text-gray-900 mb-1">{resultScore}</p>
            <p className="text-sm text-gray-500">out of 10</p>
            <p className={`text-lg font-semibold mt-2 ${interp.color}`}>{interp.level}</p>
          </div>

          <p className="text-gray-600 max-w-md mx-auto mb-6">{interp.message}</p>

          {isDay365 && baselineScore && (
            <div className="p-4 rounded-lg mb-4 max-w-sm mx-auto bg-green-50 border border-green-200">
              <p className="font-semibold text-green-800">
                You started at {baselineScore.totalScore}. You're now at {resultScore}. That's not willpower — that's a rewired brain.
              </p>
            </div>
          )}

          {!isDay365 && diff !== null && diff !== 0 && (
            <div className={`p-4 rounded-lg mb-4 max-w-sm mx-auto ${diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className={`font-semibold ${diff < 0 ? 'text-green-800' : 'text-amber-800'}`}>
                {diff < 0 ? `${Math.abs(diff)} points lower` : `${diff} points higher`} than your baseline
              </p>
              <p className={`text-sm mt-1 ${diff < 0 ? 'text-green-700' : 'text-amber-700'}`}>
                {diff < 0
                  ? 'Real, measurable progress. Your recovery is working.'
                  : 'Scores can fluctuate. What matters is the long-term trend and showing up every day.'
                }
              </p>
            </div>
          )}

          {isBaseline && (
            <div className="p-4 bg-primary-50 rounded-lg max-w-sm mx-auto mb-4">
              <p className="text-sm text-primary-700">
                This is your starting point. Watch this number drop as your brain rewires.
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Based on the Brief Pornography Screen (Kraus, Gola, Grubbs et al., Journal of Behavioral Addictions, 2020)
        </p>

        <button onClick={() => navigate('/dashboard')} className="w-full btn btn-primary py-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return null;
}
