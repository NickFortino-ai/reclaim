import { useState, useEffect, useCallback } from 'react';
import { BreathingExercise } from './BreathingExercise';
import { useAuth } from '../context/AuthContext';
import { useCreateJournalEntry, useLogUrgeSurf } from '../hooks/useApi';
import { TRIGGERS } from '../utils/constants';
import * as api from '../api/client';

interface StrugglingFlowProps {
  onClose: () => void;
}

type Step = 'breathing' | 'journal' | 'reflection' | 'victory';

export function StrugglingFlow({ onClose }: StrugglingFlowProps) {
  const { token, user } = useAuth();
  const createEntry = useCreateJournalEntry();
  const logUrgeSurf = useLogUrgeSurf();

  const [step, setStep] = useState<Step>('breathing');
  const [trigger, setTrigger] = useState('');
  const [note, setNote] = useState('');
  const [reflection, setReflection] = useState<api.JournalReflection | null>(null);
  const [reflectionLoading, setReflectionLoading] = useState(false);

  const dayNum = Math.min(Math.max(user?.currentStreak || 1, 1), 365);

  const handleBreathingComplete = useCallback(() => {
    setStep('journal');
  }, []);

  const handleJournalSubmit = async () => {
    const content = note.trim() || (trigger ? `Triggered by: ${trigger}` : 'Struggling moment');
    await createEntry.mutateAsync({
      content,
      mood: 'struggling',
      trigger: trigger || undefined,
    });
    setStep('reflection');
  };

  const handleSkipJournal = () => {
    setStep('reflection');
  };

  // Fetch reflection when entering reflection step
  useEffect(() => {
    if (step !== 'reflection' || !token) return;

    setReflectionLoading(true);
    api.journal.getReflection(token)
      .then(setReflection)
      .catch(() => setReflection({ type: 'quote', quote: 'You are stronger than this moment.' }))
      .finally(() => setReflectionLoading(false));
  }, [step, token]);

  const handleVictory = () => {
    // Log urge surf completion
    logUrgeSurf.mutate({
      sessionDay: dayNum,
      completedBreathing: true,
      resumedExercise: false,
    });
    setStep('victory');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 sm:p-8 my-8">

        {/* Step 1: Breathing */}
        {step === 'breathing' && (
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2 text-center">
              Take a breath. You're here.
            </h2>
            <p className="text-gray-600 text-center text-sm mb-4">
              60 seconds. That's all. The urge will pass.
            </p>
            <BreathingExercise
              durationSeconds={60}
              onComplete={handleBreathingComplete}
              compact
            />
          </div>
        )}

        {/* Step 2: Quick Journal */}
        {step === 'journal' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              What triggered this?
            </h2>
            <p className="text-gray-600 text-center text-sm mb-4">
              Naming the trigger takes away some of its power.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
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

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything else on your mind? (optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              maxLength={5000}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleJournalSubmit}
                disabled={createEntry.isPending}
                className="flex-1 btn btn-primary"
              >
                {createEntry.isPending ? 'Saving...' : 'Save & Continue'}
              </button>
              <button
                onClick={handleSkipJournal}
                className="btn btn-secondary"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reflection */}
        {step === 'reflection' && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Remember who you are
            </h2>

            {reflectionLoading ? (
              <div className="py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : reflection?.type === 'journal' && reflection.entry ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-green-700 mb-2 italic">{reflection.context}</p>
                <blockquote className="text-gray-800 border-l-4 border-green-400 pl-3">
                  {reflection.entry.content.length > 300
                    ? reflection.entry.content.slice(0, 300) + '...'
                    : reflection.entry.content}
                </blockquote>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(reflection.entry.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 italic text-lg">
                  "{reflection?.quote || "You are stronger than this moment."}"
                </p>
              </div>
            )}

            <button
              onClick={handleVictory}
              className="btn btn-primary py-3 px-8"
            >
              I rode it out
            </button>
          </div>
        )}

        {/* Step 4: Victory */}
        {step === 'victory' && (
          <div className="text-center">
            <div className="text-5xl mb-4">💪</div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              You Rode It Out
            </h2>
            <p className="text-green-700 mb-6">
              The urge passed. Every time you do this, the neural pathways that drive compulsive behavior get weaker.
              You're literally rewiring your brain right now.
            </p>
            <button
              onClick={onClose}
              className="btn btn-primary py-3 px-8"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
