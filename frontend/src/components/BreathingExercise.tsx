import { useState, useEffect } from 'react';

const BREATHING_CYCLES = [
  { inhale: 3, hold: 3, exhale: 3 },
  { inhale: 4, hold: 4, exhale: 4 },
  { inhale: 5, hold: 5, exhale: 5 },
  { inhale: 5, hold: 5, exhale: 6 },
  { inhale: 5, hold: 5, exhale: 7 },
];

function getCycle(index: number) {
  return index < BREATHING_CYCLES.length
    ? BREATHING_CYCLES[index]
    : BREATHING_CYCLES[BREATHING_CYCLES.length - 1];
}

interface BreathingExerciseProps {
  durationSeconds: number;
  onComplete: () => void;
  compact?: boolean;
}

export function BreathingExercise({ durationSeconds, onComplete, compact = false }: BreathingExerciseProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCircleScale, setBreathingCircleScale] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(getCycle(0));

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onComplete]);

  // Progressive breathing animation (3-3-3 → 4-4-4 → 5-5-5 → 5-5-6 → 5-5-7 repeating)
  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cycleIndex = 0;

    const runCycle = () => {
      if (cancelled) return;
      const cycle = getCycle(cycleIndex);

      setCurrentCycle(cycle);
      setBreathingPhase('inhale');
      setBreathingCircleScale(1.5);

      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        setBreathingPhase('hold');
      }, cycle.inhale * 1000));

      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        setBreathingPhase('exhale');
        setBreathingCircleScale(1);
      }, (cycle.inhale + cycle.hold) * 1000));

      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        cycleIndex++;
        runCycle();
      }, (cycle.inhale + cycle.hold + cycle.exhale) * 1000));
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const peakMessage = timeRemaining > 30
    ? "The urge will peak in about 60 seconds, then pass. Breathe with me."
    : timeRemaining > 0
    ? "The peak is passing. Keep breathing."
    : "You made it through. You're stronger than the urge.";

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      {/* Timer */}
      <div className="text-center">
        <span className={`font-bold text-blue-600 ${compact ? 'text-3xl' : 'text-4xl'}`}>
          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </span>
      </div>

      {/* Peak message */}
      <p className={`text-blue-700 text-center font-medium ${compact ? 'text-sm' : ''}`}>
        {peakMessage}
      </p>

      {/* Animated Breathing Circle */}
      <div className={`flex justify-center ${compact ? 'py-4' : 'py-8'}`}>
        <div
          className={`rounded-full bg-blue-200 flex items-center justify-center transition-transform ease-in-out ${
            compact ? 'w-24 h-24' : 'w-32 h-32'
          }`}
          style={{
            transform: `scale(${breathingCircleScale})`,
            transitionDuration: breathingPhase === 'inhale'
              ? `${currentCycle.inhale * 1000}ms`
              : breathingPhase === 'exhale'
              ? `${currentCycle.exhale * 1000}ms`
              : '0ms',
          }}
        >
          <span className={`text-blue-700 font-semibold capitalize ${compact ? 'text-base' : 'text-lg'}`}>
            {breathingPhase}
          </span>
        </div>
      </div>

      {/* Breathing instruction */}
      <div className="bg-white rounded-lg p-4 text-center">
        <div className="flex justify-center items-center gap-4 text-lg">
          <div className={`text-center ${breathingPhase === 'inhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className="text-2xl mb-1">{currentCycle.inhale}s</div>
            <div className="text-sm">Inhale</div>
          </div>
          <div className="text-gray-300">&rarr;</div>
          <div className={`text-center ${breathingPhase === 'hold' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className="text-2xl mb-1">{currentCycle.hold}s</div>
            <div className="text-sm">Hold</div>
          </div>
          <div className="text-gray-300">&rarr;</div>
          <div className={`text-center ${breathingPhase === 'exhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className="text-2xl mb-1">{currentCycle.exhale}s</div>
            <div className="text-sm">Exhale</div>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <div className="text-center">
        <button
          onClick={onComplete}
          className="text-sm text-blue-500 hover:text-blue-700 py-2 px-4"
        >
          I'm feeling better — end early
        </button>
      </div>
    </div>
  );
}
