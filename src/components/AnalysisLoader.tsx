import { useState, useEffect } from 'react';

const loadingMessages = [
  'Initializing Gemini Vision neural tensor...',
  'Analyzing heavy metal hazard signatures...',
  'Cross-referencing CPCB Recycler Registry...',
  'Calculating urban mining yield potential...',
  'Generating RoHS compliance diagnostic...',
  'Mapping nearest authorized dismantlers...',
];

interface Props {
  isVisible: boolean;
}

export default function AnalysisLoader({ isVisible }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0);
      setProgress(0);
      return;
    }

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 8 + 2, 95));
    }, 300);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center p-8">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-container/15 rounded-full blur-3xl animate-pulse" />

      {/* Scanner animation */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#222a3d" strokeWidth="4" />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#4edea3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100 214"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[36px] animate-pulse">
            neurology
          </span>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center z-10">
        <h2 className="text-[18px] font-semibold text-on-surface mb-2">Analyzing E-Waste</h2>
        <p className="text-[14px] text-primary animate-pulse min-h-[40px] transition-all duration-300">
          {loadingMessages[messageIndex]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6 z-10">
        <div className="h-1.5 rounded-full bg-surface-container-high overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold text-on-surface-variant">
          <span>Gemini Vision</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
