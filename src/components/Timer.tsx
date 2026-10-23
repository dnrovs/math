import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { sound } from '../utils/audio';

interface TimerProps {
  timeLeft: number;
  totalTime: number; // 120s
  isPaused: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, isPaused }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const percentage = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 20;

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 5 && timeLeft > 0) {
      sound.play('tick_urgent');
    }
  }, [timeLeft, isPaused]);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 shadow-sm">
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Час на відповідь (2 хв):</span>
        </div>
        <span className={`font-mono text-sm font-bold ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
          {formattedTime} / 02:00
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isUrgent ? 'bg-rose-500' : timeLeft <= 45 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
