import React from 'react'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { Question } from '../types/game'
import { sound } from '../utils/audio'

interface QuestionCardProps {
    question: Question
    selectedOptionId: string | null
    onSelectOption: (optionId: string) => void
    isAnswered: boolean
    onNextQuestion: () => void
    isLastQuestion: boolean
    questionNumber: number
    totalQuestions: number
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedOptionId,
    onSelectOption,
    isAnswered,
    onNextQuestion,
    isLastQuestion,
    questionNumber,
    totalQuestions
}) => {
    const letters = ['А', 'Б', 'В', 'Г']
    const selectedOption = question.options.find(
        (o) => o.id === selectedOptionId
    )
    const isCorrect = selectedOption?.text === question.correctAnswer

    return (
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                    <span className="mb-0.5 block text-xs font-bold text-amber-400">
                        {question.roundTitle}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                        {questionNumber}. {question.category}. {question.topic}
                    </span>
                </div>

                <div className="rounded-lg bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-300">
                    Завдання {questionNumber} / {totalQuestions}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg leading-snug font-bold text-slate-100 sm:text-2xl">
                    {question.question}
                </h2>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {question.options.map((option, idx) => {
                    const letter = letters[idx]
                    const isThisSelected = selectedOptionId === option.id
                    const isThisCorrect = option.text === question.correctAnswer

                    let btnClass =
                        'bg-slate-950 hover:bg-slate-800/80 border-slate-800 hover:border-slate-600 text-slate-200 cursor-pointer'
                    let letterClass =
                        'bg-slate-800 text-slate-300 border-slate-700'

                    if (isAnswered) {
                        if (isThisCorrect) {
                            btnClass =
                                'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500'
                            letterClass =
                                'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                        } else if (isThisSelected) {
                            btnClass =
                                'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-500'
                            letterClass =
                                'bg-rose-600 text-white border-rose-400 font-black'
                        } else {
                            btnClass =
                                'bg-slate-950/40 border-slate-900 text-slate-600 cursor-default'
                            letterClass =
                                'bg-slate-900 text-slate-700 border-slate-800'
                        }
                    }

                    return (
                        <button
                            key={option.id}
                            onClick={() => {
                                if (!isAnswered) {
                                    sound.play('select')
                                    onSelectOption(option.id)
                                }
                            }}
                            disabled={isAnswered}
                            className={`flex items-center gap-3 rounded-2xl border p-4 text-left font-medium transition-all duration-150 ${btnClass}`}
                        >
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${letterClass}`}
                            >
                                {letter}
                            </div>

                            <div className="min-w-0 flex-1">
                                <span className="font-mono text-base sm:text-lg">
                                    {option.text}
                                </span>
                            </div>

                            {isAnswered && isThisCorrect && (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                            )}
                            {isAnswered && isThisSelected && !isThisCorrect && (
                                <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                            )}
                        </button>
                    )
                })}
            </div>

            {isAnswered && (
                <div className="animate-fadeIn border-t border-slate-800 pt-4">
                    <div
                        className={`mb-4 flex items-center gap-2.5 rounded-2xl border p-3.5 ${
                            isCorrect
                                ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-200'
                                : 'border-rose-500/50 bg-rose-950/50 text-rose-200'
                        }`}
                    >
                        {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                        ) : (
                            <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                        )}
                        <div className="text-sm">
                            <span className="block font-bold">
                                {isCorrect
                                    ? `Правильно! (+${question.points} б.)`
                                    : 'Неправильно! Втрачено 1 сердечко'}
                            </span>
                            {!isCorrect && (
                                <span className="text-xs text-rose-300">
                                    Правильна відповідь:{' '}
                                    <strong className="font-mono">
                                        {question.correctAnswer}
                                    </strong>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
                        <span className="mb-1 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Пояснення:
                        </span>
                        <p className="font-sans leading-relaxed text-slate-200">
                            {question.explanation}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                sound.play('click')
                                onNextQuestion()
                            }}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 sm:text-base"
                        >
                            <span>
                                {isLastQuestion
                                    ? 'Завершити гру'
                                    : 'Наступне завдання'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
