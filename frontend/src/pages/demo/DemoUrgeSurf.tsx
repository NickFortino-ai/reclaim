import { LockedOverlay } from '../../components/LockedOverlay';

export function DemoUrgeSurf() {
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

        <LockedOverlay message="Sign up to use the breathing exercise">
          <button
            disabled
            className="btn btn-primary py-3 px-8 text-lg"
          >
            Start Breathing Exercise
          </button>
        </LockedOverlay>
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
