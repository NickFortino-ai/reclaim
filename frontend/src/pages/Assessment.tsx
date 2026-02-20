import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentScores, useSubmitAssessment, useUserData } from '../hooks/useApi';

const PPCS_QUESTIONS = [
  'I felt that porn is an important part of my life.',
  'I used porn to restore the joy in my life.',
  'I felt that porn caused problems in my sexual life.',
  'I felt that I had to watch more and more porn for satisfaction.',
  'I was unable to reduce the amount of porn I watched.',
  'I felt unsettled when I was unable to watch porn.',
  'I thought about how good it would be to watch porn.',
  'Watching porn played an important role in my life.',
  'I used porn to reduce my negative feelings (e.g., sadness, anger, boredom).',
  'I felt that porn negatively affected my intimate relationship(s).',
  'I felt that the amount of porn I watched was steadily increasing.',
  'I was unsuccessful in my attempts to reduce the amount of porn I watched.',
  'I became agitated when I was unable to watch porn.',
  'I was preoccupied with thoughts of watching porn.',
  'Porn was the most important thing in my life.',
  'I used porn to forget about unpleasant things.',
  'Watching porn had a negative impact on other areas of my life (e.g., work, school).',
  'I gradually watched more "hardcore" or extreme pornography because the previous material was less satisfying.',
];

const SCALE_LABELS = [
  'Never',
  'Rarely',
  'Occasionally',
  'Sometimes',
  'Often',
  'Very often',
  'All the time',
];

const MILESTONE_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  day30: 'Day 30',
  day90: 'Day 90',
  day180: 'Day 180',
  day365: 'Day 365',
};

function getInterpretation(score: number): { level: string; color: string; message: string } {
  if (score >= 76) {
    return { level: 'Problematic', color: 'text-red-600', message: 'This score suggests a problematic level of pornography consumption. The good news: you\'re taking action.' };
  }
  if (score >= 50) {
    return { level: 'Moderate', color: 'text-amber-600', message: 'This score suggests moderate pornography consumption patterns. You\'re in a good position to make lasting change.' };
  }
  return { level: 'Mild', color: 'text-green-600', message: 'This score suggests mild pornography consumption patterns. Keep building on this progress.' };
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
  const [responses, setResponses] = useState<number[]>(new Array(18).fill(0));
  const [questionPage, setQuestionPage] = useState(0);
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

  const questionsPerPage = 3;
  const totalPages = Math.ceil(PPCS_QUESTIONS.length / questionsPerPage);
  const pageQuestions = PPCS_QUESTIONS.slice(
    questionPage * questionsPerPage,
    (questionPage + 1) * questionsPerPage
  );
  const pageStartIdx = questionPage * questionsPerPage;

  const allCurrentPageAnswered = pageQuestions.every((_, i) => responses[pageStartIdx + i] > 0);
  const allAnswered = responses.every(r => r > 0);

  const handleSubmit = async () => {
    if (!currentMilestone || !allAnswered) return;
    const result = await submitAssessment.mutateAsync({
      responses,
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
            <p className="text-gray-600 text-sm">Your PPCS assessment history.</p>
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
            Based on the Problematic Pornography Consumption Scale (Bothe et al., The Journal of Sex Research, 2017)
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
            <p>18 questions, takes about 2 minutes</p>
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
                  This assessment uses the <strong>Problematic Pornography Consumption Scale (PPCS)</strong>, a peer-reviewed instrument developed by Bőthe and colleagues at Eötvös Loránd University and Nottingham Trent University.
                </p>
                <p>
                  The PPCS is based on Griffiths's six-component model of addiction and measures patterns like salience, tolerance, mood modification, conflict, withdrawal, and relapse. It's designed to distinguish between non-problematic and problematic pornography use.
                </p>
                <p>
                  The scale has been validated across multiple studies with excellent reliability, and provides an evidence-based way to track changes in your relationship with pornography over time.
                </p>
                <p className="text-xs text-gray-500 pt-1">
                  Source: Bőthe et al., <em>The Journal of Sex Research</em>, 2018
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
            onClick={() => { setScreen('questions'); setQuestionPage(0); }}
            className="btn btn-primary px-8 py-3"
          >
            {isBaseline ? 'Begin Assessment' : 'Start Assessment'}
          </button>
        </div>
      </div>
    );
  }

  // Questions screen
  if (screen === 'questions') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Question {pageStartIdx + 1}-{Math.min(pageStartIdx + questionsPerPage, 18)} of 18</span>
            <span>{Math.round(((questionPage + 1) / totalPages) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-full rounded-full transition-all"
              style={{ width: `${((questionPage + 1) / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {pageQuestions.map((question, i) => {
            const qIdx = pageStartIdx + i;
            return (
              <div key={qIdx} className="card">
                <p className="font-medium text-gray-900 mb-3">
                  {qIdx + 1}. {question}
                </p>
                <div className="grid grid-cols-7 gap-1">
                  {SCALE_LABELS.map((label, val) => (
                    <button
                      key={val}
                      onClick={() => {
                        const next = [...responses];
                        next[qIdx] = val + 1;
                        setResponses(next);
                      }}
                      className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors text-center ${
                        responses[qIdx] === val + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-sm font-bold">{val + 1}</span>
                      <span className="text-[10px] leading-tight mt-0.5 hidden sm:block">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1 sm:hidden">
                  <span>Never</span><span>All the time</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {questionPage > 0 && (
            <button
              onClick={() => setQuestionPage(p => p - 1)}
              className="btn btn-secondary flex-1"
            >
              Back
            </button>
          )}
          {questionPage < totalPages - 1 ? (
            <button
              onClick={() => setQuestionPage(p => p + 1)}
              disabled={!allCurrentPageAnswered}
              className="btn btn-primary flex-1 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitAssessment.isPending}
              className="btn btn-primary flex-1 disabled:opacity-50"
            >
              {submitAssessment.isPending ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Results screen
  if (screen === 'results' && resultScore !== null) {
    const interp = getInterpretation(resultScore);
    const previousScore = scores.find(s => s.milestone !== resultMilestone);
    const diff = previousScore ? resultScore - previousScore.totalScore : null;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center py-8">
          <div className="text-4xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Results</h1>
          <p className="text-sm text-gray-500 mb-6">{MILESTONE_LABELS[resultMilestone]} Assessment</p>

          <div className="mb-6">
            <p className="text-5xl font-bold text-gray-900 mb-1">{resultScore}</p>
            <p className="text-sm text-gray-500">out of 126</p>
            <p className={`text-lg font-semibold mt-2 ${interp.color}`}>{interp.level}</p>
          </div>

          <p className="text-gray-600 max-w-md mx-auto mb-6">{interp.message}</p>

          {diff !== null && diff !== 0 && (
            <div className={`p-4 rounded-lg mb-4 max-w-sm mx-auto ${diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className={`font-semibold ${diff < 0 ? 'text-green-800' : 'text-amber-800'}`}>
                {diff < 0 ? `${Math.abs(diff)} points lower` : `${diff} points higher`} than your previous assessment
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
                This is your starting point. You'll retake this assessment at Day 30, 90, 180, and 365 milestones to track your recovery.
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Based on the Problematic Pornography Consumption Scale (Bothe et al., The Journal of Sex Research, 2017)
        </p>

        <button onClick={() => navigate('/dashboard')} className="w-full btn btn-primary py-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return null;
}
