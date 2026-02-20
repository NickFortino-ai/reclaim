import { useCallback, useRef, useState } from 'react';

interface TimingSliderProps {
  duration: number;
  textAppearAt: number;
  textDisappearAt: number;
  onDurationChange: (value: number) => void;
  onTextAppearAtChange: (value: number) => void;
  onTextDisappearAtChange: (value: number) => void;
}

export function TimingSlider({
  duration,
  textAppearAt,
  textDisappearAt,
  onDurationChange,
  onTextAppearAtChange,
  onTextDisappearAtChange,
}: TimingSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'appear' | 'disappear' | null>(null);

  const handleDurationChange = (newDuration: number) => {
    onDurationChange(newDuration);
    // Clamp handles if they exceed new duration
    if (textDisappearAt > newDuration) {
      onTextDisappearAtChange(newDuration);
    }
    if (textAppearAt >= newDuration) {
      onTextAppearAtChange(Math.max(0, newDuration - 1));
    }
    if (textDisappearAt <= textAppearAt && newDuration > textAppearAt) {
      onTextDisappearAtChange(Math.min(textAppearAt + 1, newDuration));
    }
  };

  const getPositionFromEvent = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * duration);
    },
    [duration]
  );

  const handlePointerDown = useCallback(
    (handle: 'appear' | 'disappear') => (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(handle);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const value = getPositionFromEvent(e.clientX);

      if (dragging === 'appear') {
        const clamped = Math.max(0, Math.min(value, textDisappearAt - 1));
        onTextAppearAtChange(clamped);
      } else {
        const clamped = Math.max(textAppearAt + 1, Math.min(value, duration));
        onTextDisappearAtChange(clamped);
      }
    },
    [dragging, getPositionFromEvent, textAppearAt, textDisappearAt, duration, onTextAppearAtChange, onTextDisappearAtChange]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const appearPercent = (textAppearAt / duration) * 100;
  const disappearPercent = (textDisappearAt / duration) * 100;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Timing Controls
      </label>

      {/* Duration slider */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Exercise Duration</span>
          <span className="text-sm font-medium text-gray-900">{duration}s</span>
        </div>
        <input
          type="range"
          min={5}
          max={60}
          value={duration}
          onChange={(e) => handleDurationChange(parseInt(e.target.value))}
          className="w-full accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>5s</span>
          <span>60s</span>
        </div>
      </div>

      {/* Timeline track */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Overlay Text Window</span>
          <span className="text-sm font-medium text-gray-900">
            {textAppearAt}s - {textDisappearAt}s
          </span>
        </div>
        <div
          ref={trackRef}
          className="relative h-8 bg-gray-200 rounded-full select-none touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Colored segment between handles */}
          <div
            className="absolute top-0 bottom-0 bg-primary-200 rounded-full"
            style={{
              left: `${appearPercent}%`,
              width: `${disappearPercent - appearPercent}%`,
            }}
          />

          {/* Appear handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-primary-600 bg-white shadow cursor-grab ${
              dragging === 'appear' ? 'ring-2 ring-primary-300 cursor-grabbing' : ''
            }`}
            style={{ left: `${appearPercent}%` }}
            onPointerDown={handlePointerDown('appear')}
          />

          {/* Disappear handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-primary-600 bg-white shadow cursor-grab ${
              dragging === 'disappear' ? 'ring-2 ring-primary-300 cursor-grabbing' : ''
            }`}
            style={{ left: `${disappearPercent}%` }}
            onPointerDown={handlePointerDown('disappear')}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0s</span>
          <span>{duration}s</span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-gray-500">
        Image shows for {duration}s. Overlay text appears at {textAppearAt}s and disappears at {textDisappearAt}s ({textDisappearAt - textAppearAt}s visible).
      </p>
    </div>
  );
}
