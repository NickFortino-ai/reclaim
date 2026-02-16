import { useState, useEffect, useCallback } from 'react';
import { useDesensImage, useLogUrgeSurf, useCompleteDesens, useUserData, useDesensStats } from '../hooks/useApi';

// Difficulty levels based on day progression
const getDifficultyLevel = (dayNum: number): { level: string; description: string; duration: number } => {
  if (dayNum <= 14) {
    return { level: 'Beginner', description: 'Recalibrating your response', duration: 15 };
  } else if (dayNum <= 30) {
    return { level: 'Developing', description: 'Building real-world sensitivity', duration: 20 };
  } else if (dayNum <= 60) {
    return { level: 'Intermediate', description: 'Deepening authentic attraction', duration: 20 };
  } else if (dayNum <= 120) {
    return { level: 'Advanced', description: 'Rewiring for real connection', duration: 20 };
  } else {
    return { level: 'Expert', description: 'Fully resensitized', duration: 20 };
  }
};

// Feedback options after exercise
const FEEDBACK_OPTIONS = [
  { id: 'calm', label: 'Calm / No urges', emoji: '😌', score: 0 },
  { id: 'slight', label: 'Slight urge, managed well', emoji: '🙂', score: 1 },
  { id: 'strong', label: 'Strong urge, stayed strong', emoji: '💪', score: 2 },
  { id: 'difficult', label: 'Very difficult but completed', emoji: '🏆', score: 3 },
];

// Storage keys
const INTRO_SEEN_KEY = 'desens_intro_seen';

// Educational content
const WHY_THIS_WORKS = {
  title: "Why This Exercise Works",
  content: [
    "The purpose of desensitization to pixelated images is to resensitize you to real women. By learning to see past the artificial stimulation of a screen, you recover your ability to be genuinely attracted to and aroused by a real person in front of you.",
    "Your brain can be retrained to see beautiful women as multidimensional people, not sex objects. This exercise helps you practice attraction without objectification—observing beauty while recognizing her full humanity.",
    "Over time, this rewires your brain to experience deeper, more meaningful intimacy and longer-lasting sexual connection with real partners.",
    "Real attraction includes personality, presence, and connection—not just physical appearance."
  ]
};

export function Desensitize() {
  const { data: userData, isLoading: userLoading } = useUserData();
  const { data: desensStats } = useDesensStats();
  const dayNum = userData?.dayNum || 1;
  const { data: image, isLoading: imageLoading, error } = useDesensImage(dayNum);
  const logUrgeSurf = useLogUrgeSurf();
  const completeDesens = useCompleteDesens();
  const desensPoints = userData?.user.desensitizationPoints ?? 0;
  const isLoading = userLoading || imageLoading;

  // Exercise states
  const [phase, setPhase] = useState<'first-intro' | 'intro' | 'exercise' | 'feedback' | 'complete' | 'urge-surf'>('intro');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showWhyThis, setShowWhyThis] = useState(false);
  const [, setHasSeenIntro] = useState(true); // Default true to avoid flash

  // Urge surfing states
  const [urgeSurfTimeRemaining, setUrgeSurfTimeRemaining] = useState(90);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCircleScale, setBreathingCircleScale] = useState(1);
  const [exerciseTimerPaused, setExerciseTimerPaused] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState(0);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const difficulty = getDifficultyLevel(dayNum);

  // Check if user has seen the intro
  useEffect(() => {
    const introSeen = localStorage.getItem(INTRO_SEEN_KEY);
    if (!introSeen) {
      setHasSeenIntro(false);
      setPhase('first-intro');
    }
  }, []);

  // Timer countdown for exercise
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

  // Overlay text timing: 3s delay, visible for 6s, then fades out
  useEffect(() => {
    if (phase !== 'exercise') {
      setOverlayVisible(false);
      return;
    }

    const showTimer = setTimeout(() => setOverlayVisible(true), 3000);
    const hideTimer = setTimeout(() => setOverlayVisible(false), 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [phase]);

  // Urge surf timer countdown
  useEffect(() => {
    if (phase !== 'urge-surf' || urgeSurfTimeRemaining <= 0) return;

    const timer = setInterval(() => {
      setUrgeSurfTimeRemaining((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, urgeSurfTimeRemaining]);

  // Breathing animation effect (4-7-8 pattern = 19 seconds per cycle)
  useEffect(() => {
    if (phase !== 'urge-surf') return;

    const runBreathingCycle = () => {
      // Inhale (4s) - expand
      setBreathingPhase('inhale');
      setBreathingCircleScale(1.5);

      setTimeout(() => {
        // Hold (7s) - stay expanded
        setBreathingPhase('hold');
      }, 4000);

      setTimeout(() => {
        // Exhale (8s) - contract
        setBreathingPhase('exhale');
        setBreathingCircleScale(1);
      }, 11000); // 4s + 7s
    };

    runBreathingCycle();
    const cycleInterval = setInterval(runBreathingCycle, 19000);

    return () => clearInterval(cycleInterval);
  }, [phase]);

  const startExercise = useCallback(() => {
    const duration = Math.floor(Math.random() * 11) + 10; // Random 10-20 seconds
    setExerciseDuration(duration);
    setTimeRemaining(duration);
    setOverlayVisible(false);
    setPhase('exercise');
  }, []);

  const enterUrgeSurf = useCallback(() => {
    setExerciseTimerPaused(timeRemaining);
    setUrgeSurfTimeRemaining(90);
    setBreathingPhase('inhale');
    setBreathingCircleScale(1);
    setPhase('urge-surf');

    // Log that they started urge surfing
    logUrgeSurf.mutate({
      sessionDay: image?.dayNum || dayNum,
      completedBreathing: false,
      resumedExercise: false,
    });
  }, [timeRemaining, image, dayNum, logUrgeSurf]);

  const continueExercise = useCallback(() => {
    setTimeRemaining(exerciseTimerPaused);
    setOverlayVisible(false);
    setPhase('exercise');

    // Log that they resumed
    logUrgeSurf.mutate({
      sessionDay: image?.dayNum || dayNum,
      completedBreathing: urgeSurfTimeRemaining === 0,
      resumedExercise: true,
    });
  }, [exerciseTimerPaused, urgeSurfTimeRemaining, image, dayNum, logUrgeSurf]);

  const endSessionAfterUrgeSurf = useCallback(() => {
    // Log event
    logUrgeSurf.mutate({
      sessionDay: image?.dayNum || dayNum,
      completedBreathing: urgeSurfTimeRemaining === 0,
      resumedExercise: false,
    });
    setPhase('feedback');
  }, [urgeSurfTimeRemaining, image, dayNum, logUrgeSurf]);

  const handleFeedback = async (score: number) => {
    // Award desensitization points and store feedback score on server
    if (image) {
      try {
        const result = await completeDesens.mutateAsync({ imageId: image.id, feedbackScore: score });
        setPointsEarned(result.pointsEarned);
        setShowPointsAnimation(true);
        setTimeout(() => setShowPointsAnimation(false), 3000);
      } catch {
        console.error('Failed to award desensitization points');
      }
    }

    setPhase('complete');
  };

  const resetExercise = () => {
    setPhase('intro');
    setTimeRemaining(0);
    setUrgeSurfTimeRemaining(90);
  };

  const dismissIntro = () => {
    localStorage.setItem(INTRO_SEEN_KEY, 'true');
    setHasSeenIntro(true);
    setPhase('intro');
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

  // First-time educational intro
  if (phase === 'first-intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {WHY_THIS_WORKS.title}
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {WHY_THIS_WORKS.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={dismissIntro}
              className="btn btn-primary py-3 px-8 text-lg"
            >
              I Understand, Let's Begin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Urge Surfing Emergency Mode (90-second breathing exercise)
  if (phase === 'urge-surf') {
    const breathingComplete = urgeSurfTimeRemaining === 0;
    const peakMessage = urgeSurfTimeRemaining > 30
      ? "The urge will peak in about 60 seconds, then pass. Breathe with me."
      : urgeSurfTimeRemaining > 0
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
                {Math.floor(urgeSurfTimeRemaining / 60)}:{(urgeSurfTimeRemaining % 60).toString().padStart(2, '0')}
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
                <div className="text-gray-300">→</div>
                <div className={`text-center ${breathingPhase === 'hold' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">7s</div>
                  <div className="text-sm">Hold</div>
                </div>
                <div className="text-gray-300">→</div>
                <div className={`text-center ${breathingPhase === 'exhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">8s</div>
                  <div className="text-sm">Exhale</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            {breathingComplete ? (
              <div className="space-y-3">
                <p className="text-center text-blue-800 font-medium">Ready to continue?</p>
                <div className="flex gap-3">
                  <button
                    onClick={continueExercise}
                    className="flex-1 btn btn-primary"
                  >
                    Continue Exercise
                  </button>
                  <button
                    onClick={endSessionAfterUrgeSurf}
                    className="flex-1 btn btn-secondary"
                  >
                    End Session
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500">
                  (Both options count as completing the exercise)
                </p>
              </div>
            ) : (
              <p className="text-center text-blue-600 text-sm">
                Complete the breathing exercise to unlock options
              </p>
            )}
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
    const totalSessions = desensStats?.totalSessions ?? 0;
    const improvement = desensStats?.improvement ?? null;

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

          {/* Points animation */}
          {showPointsAnimation && pointsEarned !== null && pointsEarned > 0 && (
            <div className="animate-bounce bg-primary-100 rounded-lg p-3 mb-4">
              <p className="text-lg font-bold text-primary-700">
                +{pointsEarned} point{pointsEarned !== 1 ? 's' : ''} earned!
              </p>
            </div>
          )}

          {pointsEarned === 0 && (
            <p className="text-sm text-gray-500 mb-4">
              Points are awarded once per day. Great job practicing again!
            </p>
          )}

          {/* Desensitization progress bar */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Desensitization Progress</span>
              <span className="text-sm font-bold text-primary-600">{desensPoints}/300</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  desensPoints >= 300 ? 'bg-green-500' : 'bg-primary-600'
                }`}
                style={{ width: `${Math.min((desensPoints / 300) * 100, 100)}%` }}
              />
            </div>
            {desensPoints >= 300 && (
              <p className="text-green-600 font-bold text-sm mt-2">
                Impervious to the Pixels! Your brain has relearned what real attraction feels like.
              </p>
            )}
          </div>

          {improvement !== null && improvement > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-lg font-semibold text-primary-600">
                Urges are {improvement}% lower than Day 1
              </p>
              <p className="text-sm text-gray-600">
                Based on your {totalSessions} completed sessions
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Sessions completed:</span> {totalSessions}
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
    const progressPercent = exerciseDuration > 0 ? ((exerciseDuration - timeRemaining) / exerciseDuration) * 100 : 0;

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

        {/* Image with Overlay */}
        <div className="card p-0 overflow-hidden">
          <div className="relative" style={{ minHeight: '60vh' }}>
            <img
              src={image.imageUrl}
              alt="Desensitization exercise"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div
              className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 transition-opacity duration-700"
              style={{ opacity: overlayVisible ? 1 : 0 }}
            >
              <p className="text-white text-2xl font-bold text-center drop-shadow-lg">
                {image.overlayText}
              </p>
            </div>
          </div>
        </div>

        {/* "Feeling Triggered?" Emergency Button */}
        <button
          onClick={enterUrgeSurf}
          className="w-full btn bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-300 py-4"
        >
          <span className="flex items-center justify-center gap-2 text-lg font-semibold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Feeling Triggered?
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Day {dayNum} Desensitization
        </h2>

        {/* Desensitization progress bar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Desensitization Progress</span>
            <span className="text-sm font-bold text-primary-600">{desensPoints}/300</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                desensPoints >= 300 ? 'bg-green-500' : 'bg-primary-600'
              }`}
              style={{ width: `${Math.min((desensPoints / 300) * 100, 100)}%` }}
            />
          </div>
          {desensPoints >= 300 && (
            <p className="text-green-600 font-bold text-sm mt-2">
              Impervious to the Pixels! Your brain has relearned what real attraction feels like.
            </p>
          )}
        </div>

        {/* Why am I doing this? - Collapsible */}
        <button
          onClick={() => setShowWhyThis(!showWhyThis)}
          className="w-full flex items-center justify-between p-3 mb-4 bg-primary-50 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors"
        >
          <span className="font-medium">Why am I doing this?</span>
          <svg
            className={`w-5 h-5 transition-transform ${showWhyThis ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showWhyThis && (
          <div className="bg-primary-50 rounded-lg p-4 mb-6 border border-primary-200">
            <h3 className="font-semibold text-primary-800 mb-3">{WHY_THIS_WORKS.title}</h3>
            <div className="space-y-2">
              {WHY_THIS_WORKS.content.map((paragraph, index) => (
                <p key={index} className="text-sm text-primary-700">
                  {paragraph}
                </p>
              ))}
            </div>
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
          <span className="text-sm text-gray-500 ml-auto">10-20s exercise</span>
        </div>

        {/* Progress Stats */}
        {(desensStats?.totalSessions ?? 0) > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-xl font-bold text-gray-900">{desensStats?.totalSessions}</p>
              </div>
              {desensStats?.improvement !== null && desensStats?.improvement !== undefined && desensStats.improvement > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Urge Reduction</p>
                  <p className="text-xl font-bold text-green-600">{desensStats.improvement}%</p>
                </div>
              )}
            </div>
          </div>
        )}

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
          <li>• Use the "Feeling Triggered?" button if you're struggling</li>
          <li>• Be honest in your feedback—it helps track your progress</li>
        </ul>
      </div>

      <div className="card bg-amber-50">
        <p className="text-sm text-amber-800">
          <strong>How it works:</strong> View the image for 10-20 seconds while focusing on
          the mindfulness prompts. The overlay text will appear briefly during the exercise.
          This builds your ability to see past artificial stimulation and resensitize to real attraction—real women, real connection, real arousal.
        </p>
      </div>
    </div>
  );
}
