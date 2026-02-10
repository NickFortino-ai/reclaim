import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLogUrgeSurf } from '../hooks/useApi';

export function UrgeSurf() {
  const { user } = useAuth();
  const logUrgeSurf = useLogUrgeSurf();
  const dayNum = Math.min(Math.max(user?.currentStreak || 1, 1), 365);

  const [phase, setPhase] = useState<'ready' | 'breathing' | 'complete'>('ready');
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCircleScale, setBreathingCircleScale] = useState(1);

  // Timer countdown
  useEffect(() => {
    if (phase !== 'breathing' || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setPhase('complete');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeRemaining]);

  // Breathing animation (4-7-8 pattern = 19s cycle)
  useEffect(() => {
    if (phase !== 'breathing') return;

    const runBreathingCycle = () => {
      setBreathingPhase('inhale');
      setBreathingCircleScale(1.5);

      setTimeout(() => {
        setBreathingPhase('hold');
      }, 4000);

      setTimeout(() => {
        setBreathingPhase('exhale');
        setBreathingCircleScale(1);
      }, 11000);
    };

    runBreathingCycle();
    const cycleInterval = setInterval(runBreathingCycle, 19000);

    return () => clearInterval(cycleInterval);
  }, [phase]);

  const startBreathing = useCallback(() => {
    setTimeRemaining(90);
    setBreathingPhase('inhale');
    setBreathingCircleScale(1);
    setPhase('breathing');

    logUrgeSurf.mutate({
      sessionDay: dayNum,
      completedBreathing: false,
      resumedExercise: false,
    });
  }, [dayNum, logUrgeSurf]);

  const handleComplete = useCallback(() => {
    logUrgeSurf.mutate({
      sessionDay: dayNum,
      completedBreathing: true,
      resumedExercise: false,
    });
    setPhase('complete');
  }, [dayNum, logUrgeSurf]);

  const reset = () => {
    setPhase('ready');
    setTimeRemaining(90);
  };

  // Ready phase
  if (phase === 'ready') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Urge Surfing</h1>
          <p className="text-gray-600 mb-6">
            Feeling an urge? That's normal. Urges peak in about 60 seconds and then pass.
            This 90-second breathing exercise will guide you through it.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">4-7-8 Breathing Pattern</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><strong>Inhale</strong> through your nose for 4 seconds</li>
              <li><strong>Hold</strong> your breath for 7 seconds</li>
              <li><strong>Exhale</strong> slowly through your mouth for 8 seconds</li>
            </ul>
            <p className="text-sm text-blue-600 mt-2">
              This activates your parasympathetic nervous system, reducing the urge's intensity.
            </p>
          </div>

          <button
            onClick={startBreathing}
            className="btn btn-primary py-3 px-8 text-lg"
          >
            Start Breathing Exercise
          </button>
        </div>

        <div className="card bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">Quick Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Remove yourself from the triggering environment if possible</li>
            <li>• Place your phone face-down or put it in another room</li>
            <li>• Splash cold water on your face to activate the dive reflex</li>
            <li>• Remember: every urge you ride out makes the next one weaker</li>
            <li>• You can use this tool as many times as you need — no limits</li>
          </ul>
        </div>
      </div>
    );
  }

  // Breathing phase
  if (phase === 'breathing') {
    const peakMessage = timeRemaining > 30
      ? "The urge will peak in about 60 seconds, then pass. Breathe with me."
      : timeRemaining > 0
      ? "The peak is passing. Keep breathing."
      : "You made it through. You're stronger than the urge.";

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            Urge Surfing Exercise
          </h2>

          <div className="space-y-6">
            {/* Timer */}
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-600">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Peak message */}
            <p className="text-blue-700 text-center font-medium">
              {peakMessage}
            </p>

            {/* Animated Breathing Circle */}
            <div className="flex justify-center py-8">
              <div
                className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center transition-transform ease-in-out"
                style={{
                  transform: `scale(${breathingCircleScale})`,
                  transitionDuration: breathingPhase === 'inhale' ? '4000ms' : breathingPhase === 'exhale' ? '8000ms' : '0ms',
                }}
              >
                <span className="text-blue-700 font-semibold text-lg capitalize">
                  {breathingPhase}
                </span>
              </div>
            </div>

            {/* Breathing instruction */}
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="flex justify-center items-center gap-4 text-lg">
                <div className={`text-center ${breathingPhase === 'inhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">4s</div>
                  <div className="text-sm">Inhale</div>
                </div>
                <div className="text-gray-300">&rarr;</div>
                <div className={`text-center ${breathingPhase === 'hold' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">7s</div>
                  <div className="text-sm">Hold</div>
                </div>
                <div className="text-gray-300">&rarr;</div>
                <div className={`text-center ${breathingPhase === 'exhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">8s</div>
                  <div className="text-sm">Exhale</div>
                </div>
              </div>
            </div>

            {/* Skip / early complete */}
            <div className="text-center">
              <button
                onClick={handleComplete}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                I'm feeling better — end early
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete phase
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-green-50 border-green-200 text-center">
        <div className="text-5xl mb-4">💪</div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          You Rode It Out
        </h2>
        <p className="text-green-700 mb-6">
          The urge passed. Every time you do this, the neural pathways that drive compulsive behavior get weaker.
          You're literally rewiring your brain right now.
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">What Just Happened</h3>
          <p className="text-sm text-gray-600">
            Your prefrontal cortex (decision-making) just overrode your limbic system (impulse).
            The 4-7-8 breathing pattern activated your parasympathetic nervous system,
            lowering cortisol and reducing the intensity of the urge. This gets easier with practice.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn btn-primary">
            Done
          </button>
          <button onClick={startBreathing} className="btn btn-secondary">
            Do Another Round
          </button>
        </div>
      </div>
    </div>
  );
}
