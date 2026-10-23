import React from 'react';
import { Crown, Heart, Clock, Play, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface StartScreenProps {
  onStartGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 max-w-2xl mx-auto">
      
      {/* Sound toggle at top right */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => {
            onToggleMute();
            sound.play('click');
          }}
          aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
        
        {/* Crown Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <Crown className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          Математичний трон
        </h1>

        <p className="text-sm text-slate-400 mb-6">
          Онлайн-гра з алгебри та геометрії • 10-й клас (рівень стандарту)
        </p>

        {/* Info Box from file */}
        <div className="text-left bg-slate-950 p-5 rounded-2xl border border-slate-800/80 mb-6 space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-400 min-w-32">Предмет:</span>
            <span className="text-slate-200">алгебра та геометрія</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-400 min-w-32">Клас:</span>
            <span className="text-slate-200">10-й, рівень стандарту</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-400 min-w-32">Кількість завдань:</span>
            <span className="text-slate-200 font-mono font-bold">15</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-400 min-w-32">Мета:</span>
            <span className="text-slate-200">
              перевірити знання, логічне мислення, кмітливість і вміння швидко розв’язувати математичні завдання.
            </span>
          </div>
        </div>

        {/* Game Rules: 5 Hearts & 2 Mins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">5 сердечок на гру</span>
              <span className="text-[11px] text-slate-400">Помилка забирає 1 життя</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">2 хвилини на кожне</span>
              <span className="text-[11px] text-slate-400">Таймер 120 с на одне завдання</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            sound.play('click');
            onStartGame();
          }}
          className="w-full py-4 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>Почати гру</span>
        </button>

      </div>
    </div>
  );
};
