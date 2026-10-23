import { Crown, Heart, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { UserAnswerRecord } from '../types/game';
import { sound } from '../utils/audio';
import { KnightProgress } from './KnightProgress';

interface EndScreenProps {
  score: number;
  hearts: number;
  records: UserAnswerRecord[];
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  score,
  hearts,
  records,
  onRestart,
}) => {
  const correctCount = records.filter(r => r.isCorrect).length;
  const isWon = hearts > 0;

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 animate-fadeIn flex flex-col gap-6">
      
      {/* Path to Throne Visualization at End */}
      <KnightProgress
        currentQuestionIndex={records.length}
        totalQuestions={15}
        records={records}
        isFinished={isWon}
      />

      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
        <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
          isWon ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
        }`}>
          {isWon ? <Crown className="w-8 h-8" /> : <Heart className="w-8 h-8" />}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          {isWon ? 'Математичний трон підкорено!' : 'Гру завершено: сердечка вичерпано'}
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          {isWon
            ? 'Ви успішно пройшли всі 15 завдань з алгебри та геометрії.'
            : 'Усі 5 сердечок було втрачено через помилки або закінчення часу.'}
        </p>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6 text-center">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Бали</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-amber-300">
              {score} <span className="text-xs text-slate-500 font-normal">/ 30</span>
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Правильних</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
              {correctCount} <span className="text-xs text-slate-500 font-normal">/ 15</span>
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Сердечка</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-rose-400">
              {hearts} <span className="text-xs text-slate-500 font-normal">/ 5</span>
            </span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={() => {
            sound.play('click');
            onRestart();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Грати знову</span>
        </button>
      </div>

      {/* Answers & Explanations Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-200 px-1">
          Повний розбір усіх 15 завдань:
        </h3>

        {records.map((item, idx) => (
          <div
            key={item.questionId}
            className={`p-5 rounded-2xl border bg-slate-900 ${
              item.isCorrect ? 'border-emerald-900/60' : 'border-rose-900/60'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400">
                Завдання {idx + 1}. {item.category}. {item.topic}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                {item.isCorrect ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> +{item.pointsEarned} б.
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> 0 б.
                  </span>
                )}
              </div>
            </div>

            <h4 className="font-semibold text-slate-100 text-base mb-3">
              {item.question}
            </h4>

            {/* Answer details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs sm:text-sm font-mono">
              <div className={`p-2.5 rounded-xl border ${
                item.isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <span className="block text-[10px] text-slate-400 font-sans font-bold">Ваша відповідь:</span>
                <span>{item.selectedText || 'Час вийшов'}</span>
              </div>

              {!item.isCorrect && (
                <div className="p-2.5 rounded-xl border bg-emerald-950/40 border-emerald-500/40 text-emerald-200">
                  <span className="block text-[10px] text-emerald-400 font-sans font-bold">Правильна відповідь:</span>
                  <span>{item.correctText}</span>
                </div>
              )}
            </div>

            {/* Exact explanation from user's file */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans">
              <span className="font-bold text-slate-400 block mb-0.5">Пояснення:</span>
              <p>{item.explanation}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
