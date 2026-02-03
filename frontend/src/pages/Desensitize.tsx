import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDesensImage } from '../hooks/useApi';

// Mindfulness prompts that rotate during exercise
const MINDFULNESS_PROMPTS = [
  "Notice her humanity, not just her appearance",
  "Feel the urge without acting on it",
  "This discomfort is growth happening",
  "You are rewiring your brain right now",
  "Attraction is natural; acting on it is a choice",
  "Breathe deeply. You are in control.",
  "This moment will pass. Your strength will remain.",
  "Every second you resist, you grow stronger",
  "Your values define you, not your urges",
  "This is you becoming who you want to be",
];

// Difficulty levels based on day progression
const getDifficultyLevel = (dayNum: number): { level: string; description: string; duration: number } => {
  if (dayNum <= 14) {
    return { level: 'Beginner', description: 'Building foundation', duration: 15 };
  } else if (dayNum <= 30) {
    return { level: 'Developing', description: 'Strengthening resistance', duration: 20 };
  } else if (dayNum <= 60) {
    return { level: 'Intermediate', description: 'Deepening resilience', duration: 25 };
  } else if (dayNum <= 120) {
    return { level: 'Advanced', description: 'Mastering control', duration: 30 };
  } else {
    return { level: 'Expert', description: 'Maintaining mastery', duration: 30 };
  }
};

// Feedback options after exercise
const FEEDBACK_OPTIONS = [
  { id: 'calm', label: 'Calm / No urges', emoji: '😌', score: 0 },
  { id: 'slight', label: 'Slight urge, managed well', emoji: '🙂', score: 1 },
  { id: 'strong', label: 'Strong urge, stayed strong', emoji: '💪', score: 2 },
  { id: 'difficult', label: 'Very difficult but completed', emoji: '🏆', score: 3 },
];

// Storage key for tracking progress
const PROGRESS_KEY = 'desens_progress';

interface ProgressData {
  sessions: { day: number; score: number; date: string }[];
  baselineScore?: number;
}

export function Desensitize() {
  const { user } = useAuth();
  const dayNum = Math.min((user?.totalDaysWon || 0) + 1, 365);
  const { data: image, isLoading, error } = useDesensImage(dayNum);

  // Exercise states
  const [phase, setPhase] = useState<'intro' | 'exercise' | 'feedback' | 'complete' | 'urge-surf'>('intro');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showEducation, setShowEducation] = useState(false);
  const [progress, setProgress] = useState<ProgressData>({ sessions: [] });

  const difficulty = getDifficultyLevel(dayNum);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        // Invalid data, start fresh
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (phase !== 'exercise' || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setPhase('feedback');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeRemaining]);

  // Rotate mindfulness prompts
  useEffect(() => {
    if (phase !== 'exercise') return;

    const interval = setInterval(() => {
      setCurrentPromptIndex((i) => (i + 1) % MINDFULNESS_PROMPTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [phase]);

  const startExercise = useCallback(() => {
    setTimeRemaining(difficulty.duration);
    setCurrentPromptIndex(0);
    setPhase('exercise');
  }, [difficulty.duration]);

  const handleFeedback = (score: number) => {
    const newSession = { day: dayNum, score, date: new Date().toISOString() };
    const newProgress: ProgressData = {
      sessions: [...progress.sessions, newSession],
      baselineScore: progress.baselineScore ?? score,
    };

    setProgress(newProgress);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    setPhase('complete');
  };

  const calculateImprovement = (): number | null => {
    if (!progress.baselineScore || progress.sessions.length < 3) return null;

    const recentSessions = progress.sessions.slice(-5);
    const avgRecent = recentSessions.reduce((sum, s) => sum + s.score, 0) / recentSessions.length;
    const improvement = ((progress.baselineScore - avgRecent) / progress.baselineScore) * 100;

    return Math.round(Math.max(0, improvement));
  };

  const resetExercise = () => {
    setPhase('intro');
    setTimeRemaining(0);
    setCurrentPromptIndex(0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Desensitization Exercise
          </h2>
          <p className="text-gray-600">
            No exercise available for day {dayNum} yet. Check back later or ask your admin to add images.
          </p>
        </div>
      </div>
    );
  }

  // Urge Surfing Emergency Mode
  if (phase === 'urge-surf') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            Urge Surfing Exercise
          </h2>

          <div className="space-y-6">
            <p className="text-blue-700 text-center">
              Urges are like waves—they rise, peak, and fall. Let's ride this one out together.
            </p>

            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-lg font-medium text-gray-800 mb-4">Breathe with me:</p>
              <div className="flex justify-center items-center gap-4 text-2xl">
                <div className="text-center">
                  <div className="text-4xl mb-2">4s</div>
                  <div className="text-sm text-gray-600">Inhale</div>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <div className="text-4xl mb-2">7s</div>
                  <div className="text-sm text-gray-600">Hold</div>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <div className="text-4xl mb-2">8s</div>
                  <div className="text-sm text-gray-600">Exhale</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700 italic text-center">
                "The urge will pass whether you act on it or not. But if you don't act, you'll be proud of yourself when it does."
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-blue-700 font-medium">Remember:</p>
              <ul className="text-sm text-blue-600 space-y-2">
                <li>• This feeling is temporary—usually peaks in 15-20 minutes</li>
                <li>• You've survived every urge you've ever had</li>
                <li>• Each urge you ride out makes the next one weaker</li>
                <li>• Your future self will thank you for staying strong</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPhase('exercise')}
                className="flex-1 btn btn-primary"
              >
                I'm Ready to Continue
              </button>
              <button
                onClick={resetExercise}
                className="flex-1 btn btn-secondary"
              >
                End Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Feedback Phase
  if (phase === 'feedback') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Exercise Complete
          </h2>
          <p className="text-gray-600 text-center mb-6">
            How did that feel?
          </p>

          <div className="space-y-3">
            {FEEDBACK_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFeedback(option.score)}
                className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-colors text-left flex items-center gap-4"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-medium text-gray-800">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Complete Phase
  if (phase === 'complete') {
    const improvement = calculateImprovement();

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card bg-green-50 border-green-200 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            You Did It!
          </h2>
          <p className="text-green-700 mb-4">
            You faced the trigger and chose your values. That's real strength.
          </p>

          {improvement !== null && improvement > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-lg font-semibold text-primary-600">
                Urges are {improvement}% lower than Day 1
              </p>
              <p className="text-sm text-gray-600">
                Based on your {progress.sessions.length} completed sessions
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Sessions completed:</span> {progress.sessions.length}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Current level:</span> {difficulty.level}
            </p>
          </div>

          <button
            onClick={resetExercise}
            className="btn btn-primary"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // Exercise Phase
  if (phase === 'exercise') {
    const progressPercent = ((difficulty.duration - timeRemaining) / difficulty.duration) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Timer and Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Time Remaining</span>
            <span className="text-2xl font-bold text-primary-600">{timeRemaining}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mindfulness Prompt */}
        <div className="card bg-primary-50 border-primary-200">
          <p className="text-center text-primary-800 font-medium text-lg animate-pulse">
            {MINDFULNESS_PROMPTS[currentPromptIndex]}
          </p>
        </div>

        {/* Image with Overlay */}
        <div className="card p-0 overflow-hidden">
          <div className="relative">
            <img
              src={image.imageUrl}
              alt="Desensitization exercise"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
              <p className="text-white text-2xl font-bold text-center drop-shadow-lg">
                {image.overlayText}
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Urge Button */}
        <button
          onClick={() => setPhase('urge-surf')}
          className="w-full btn bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Struggling? Try Urge Surfing
          </span>
        </button>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setPhase('feedback')}
            className="flex-1 btn btn-primary py-3"
          >
            I Stayed Strong (Skip Timer)
          </button>
          <button
            onClick={resetExercise}
            className="flex-1 btn btn-secondary py-3"
          >
            I Need a Break
          </button>
        </div>
      </div>
    );
  }

  // Intro Phase (Default)
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Day {dayNum} Desensitization
          </h2>
          <button
            onClick={() => setShowEducation(!showEducation)}
            className="text-primary-600 hover:text-primary-700"
            title="Learn more"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Educational Tooltip */}
        {showEducation && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">The Neuroscience Behind This</h3>
            <p className="text-sm text-blue-700 mb-3">
              This is <strong>exposure therapy</strong>—a proven psychological technique. You're training your brain
              that <strong>attraction ≠ action</strong>.
            </p>
            <p className="text-sm text-blue-700 mb-3">
              When you see a trigger and choose NOT to act, you weaken the neural pathway connecting
              that stimulus to compulsive behavior. Over time, the automatic urge response diminishes.
            </p>
            <p className="text-sm text-blue-700">
              Each session literally rewires your brain. The discomfort you feel is neuroplasticity in action.
            </p>
          </div>
        )}

        {/* Difficulty Level Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            difficulty.level === 'Beginner' ? 'bg-green-100 text-green-700' :
            difficulty.level === 'Developing' ? 'bg-blue-100 text-blue-700' :
            difficulty.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            difficulty.level === 'Advanced' ? 'bg-orange-100 text-orange-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {difficulty.level}
          </div>
          <span className="text-sm text-gray-600">{difficulty.description}</span>
          <span className="text-sm text-gray-500 ml-auto">{difficulty.duration}s exercise</span>
        </div>

        {/* Progress Stats */}
        {progress.sessions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-xl font-bold text-gray-900">{progress.sessions.length}</p>
              </div>
              {calculateImprovement() !== null && calculateImprovement()! > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Urge Reduction</p>
                  <p className="text-xl font-bold text-green-600">{calculateImprovement()}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>How it works:</strong> View the image for {difficulty.duration} seconds while focusing on
            the overlay text and mindfulness prompts. This builds your ability to experience triggers
            without reacting compulsively.
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            When you're ready, click below to begin today's exercise.
          </p>
          <button
            onClick={startExercise}
            className="btn btn-primary py-3 px-8 text-lg"
          >
            I'm Ready to Begin
          </button>
        </div>
      </div>

      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-2">Tips for Success</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Take slow, deep breaths throughout the exercise</li>
          <li>• Read each mindfulness prompt out loud if possible</li>
          <li>• Notice your physical sensations without judgment</li>
          <li>• Use the "Urge Surfing" button if you're struggling</li>
          <li>• Be honest in your feedback—it helps track your progress</li>
        </ul>
      </div>
    </div>
  );
}
