import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types/game';
import { sound } from '../utils/audio';

interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isAnswered: boolean;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  isAnswered,
  onNextQuestion,
  isLastQuestion,
  questionNumber,
  totalQuestions,
}) => {
  const letters = ['А', 'Б', 'В', 'Г'];
  const selectedOption = question.options.find(o => o.id === selectedOptionId);
  const isCorrect = selectedOption?.text === question.correctAnswer;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl">
      
      {/* Round & Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 block mb-0.5">
            {question.roundTitle}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {questionNumber}. {question.category}. {question.topic}
          </span>
        </div>

        <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
          Завдання {questionNumber} / {totalQuestions}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-100 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* 4 Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        {question.options.map((option, idx) => {
          const letter = letters[idx];
          const isThisSelected = selectedOptionId === option.id;
          const isThisCorrect = option.text === question.correctAnswer;

          let btnClass = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 hover:border-slate-600 text-slate-200 cursor-pointer';
          let letterClass = 'bg-slate-800 text-slate-300 border-slate-700';

          if (isAnswered) {
            if (isThisCorrect) {
              btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
              letterClass = 'bg-emerald-500 text-slate-950 border-emerald-400 font-black';
            } else if (isThisSelected) {
              btnClass = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-500';
              letterClass = 'bg-rose-600 text-white border-rose-400 font-black';
            } else {
              btnClass = 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-default';
              letterClass = 'bg-slate-900 text-slate-700 border-slate-800';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!isAnswered) {
                  sound.play('select');
                  onSelectOption(option.id);
                }
              }}
              disabled={isAnswered}
              className={`flex items-center gap-3 p-4 rounded-2xl border text-left font-medium transition-all duration-150 ${btnClass}`}
            >
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${letterClass}`}>
                {letter}
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-mono text-base sm:text-lg">{option.text}</span>
              </div>

              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswered && isThisSelected && !isThisCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Explanation */}
      {isAnswered && (
        <div className="pt-4 border-t border-slate-800 animate-fadeIn">
          {/* Result banner */}
          <div className={`p-3.5 rounded-2xl border mb-4 flex items-center gap-2.5 ${
            isCorrect
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div className="text-sm">
              <span className="font-bold block">
                {isCorrect ? `Правильно! (+${question.points} б.)` : 'Неправильно! Втрачено 1 сердечко'}
              </span>
              {!isCorrect && (
                <span className="text-xs text-rose-300">
                  Правильна відповідь: <strong className="font-mono">{question.correctAnswer}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Exact explanation from user's file */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-sm text-slate-300 mb-5">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-1">
              Пояснення:
            </span>
            <p className="font-sans leading-relaxed text-slate-200">
              {question.explanation}
            </p>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                sound.play('click');
                onNextQuestion();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-colors cursor-pointer"
            >
              <span>{isLastQuestion ? 'Завершити гру' : 'Наступне завдання'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
