import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteOnboarding } from '../hooks/useApi';

const SCREENS = [
  {
    label: 'THE TRUTH',
    heading: "Here's what porn actually did to you.",
    lines: [
      'It hijacked your dopamine system.',
      'It trained your brain to prefer pixels over people.',
      'It numbed your ability to connect, to feel, to perform.',
      "And it did it so gradually you didn't even notice.",
    ],
  },
  {
    label: 'WHAT YOU LOST',
    heading: "This is what it stole.",
    lines: [
      'Your drive. Your edge. Your confidence with women.',
      'The ability to get hard and stay hard with a real person.',
      'Emotional depth. Presence. The capacity for real intimacy.',
      "Years of your life you'll never get back.",
    ],
  },
  {
    label: "WHAT YOU'RE RECLAIMING",
    heading: "This is what you're getting back.",
    lines: [
      'Sharper focus. Relentless motivation. Natural confidence.',
      'Real attraction to real women.',
      'The ability to connect, perform, and be fully present.',
      'The man you were before porn rewired your brain.',
    ],
  },
  {
    label: 'THE COMMITMENT',
    heading: '365 days. A complete transformation.',
    lines: [
      "Your brain didn't get here overnight. It won't heal overnight.",
      'But in 365 days of consistent effort, neuroscience shows your brain can fully rewire.',
      'New neural pathways. Restored sensitivity. A completely different man.',
      "This isn't willpower. It's biology. And it starts now.",
    ],
  },
];

interface OnboardingScreensProps {
  onComplete: () => void;
  isSubmitting?: boolean;
}

export function OnboardingScreens({ onComplete, isSubmitting }: OnboardingScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const isLast = currentScreen === SCREENS.length - 1;
  const screen = SCREENS[currentScreen];

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(prev => prev - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goBack();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-6 select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-lg w-full text-center">
        {/* Label */}
        <div className="mb-8">
          <span className="text-blue-400 text-sm font-semibold tracking-[0.3em] uppercase">
            {screen.label}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight transition-opacity duration-500">
          {screen.heading}
        </h1>

        {/* Lines */}
        <div className="space-y-5 mb-16">
          {screen.lines.map((line, i) => (
            <p key={i} className="text-lg text-slate-300 leading-relaxed transition-opacity duration-500">
              {line}
            </p>
          ))}
        </div>

        {/* CTA / Navigation */}
        <div className="flex flex-col items-center gap-8">
          {isLast ? (
            <button
              onClick={onComplete}
              disabled={isSubmitting}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-lg rounded-lg transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
            >
              {isSubmitting ? 'Starting...' : "I'm Ready to Begin"}
            </button>
          ) : (
            <button
              onClick={goNext}
              className="w-14 h-14 rounded-full border-2 border-slate-600 hover:border-blue-400 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          <div className="flex gap-2">
            {SCREENS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentScreen ? 'bg-blue-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Back button */}
          {currentScreen > 0 && (
            <button
              onClick={goBack}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const completeOnboarding = useCompleteOnboarding();

  const handleComplete = () => {
    completeOnboarding.mutate(undefined, {
      onSuccess: () => {
        navigate('/dashboard', { replace: true });
      },
    });
  };

  return (
    <OnboardingScreens
      onComplete={handleComplete}
      isSubmitting={completeOnboarding.isPending}
    />
  );
}
