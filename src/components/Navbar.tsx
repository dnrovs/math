import React from 'react';
import { Crown, Heart, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  score: number;
  hearts: number; // 0 to 5
  maxHearts: number; // 5
  currentQuestionIndex: number; // 0 to 14
  totalQuestions: number; // 15
  roundTitle: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  score,
  hearts,
  maxHearts,
  currentQuestionIndex,
  totalQuestions,
  roundTitle,
  isMuted,
  onToggleMute,
  onRestart,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/95 border-b border-slate-800 backdrop-blur-md px-3 sm:px-6 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-100 tracking-wide">
              Математичний трон
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate">
              {roundTitle}
            </p>
          </div>
        </div>

        {/* 5 Hearts */}
        <div className="flex items-center gap-1 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800">
          {Array.from({ length: maxHearts }).map((_, idx) => {
            const isFilled = idx < hearts;
            return (
              <Heart
                key={idx}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isFilled
                    ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]'
                    : 'text-slate-700 fill-slate-800 opacity-40'
                }`}
              />
            );
          })}
        </div>

        {/* Score & Counter & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Бали</span>
            <span className="font-mono font-bold text-amber-300 text-sm sm:text-base">
              {score} <span className="text-xs text-slate-500">/ 30</span>
            </span>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.play('click');
            }}
            title={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
            aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              if (window.confirm('Розпочати гру спочатку?')) {
                onRestart();
              }
            }}
            title="Почати спочатку"
            aria-label="Почати спочатку"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
