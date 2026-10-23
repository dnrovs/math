import { Crown, Heart, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { UserAnswerRecord } from '../types/game'
import { sound } from '../utils/audio'
import { KnightProgress } from './KnightProgress'

interface EndScreenProps {
    score: number
    hearts: number
    records: UserAnswerRecord[]
    onRestart: () => void
}

export const EndScreen: React.FC<EndScreenProps> = ({
    score,
    hearts,
    records,
    onRestart
}) => {
    const correctCount = records.filter((r) => r.isCorrect).length
    const isWon = hearts > 0

    return (
        <div className="animate-fadeIn mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
            <KnightProgress
                currentQuestionIndex={records.length}
                totalQuestions={15}
                records={records}
                isFinished={isWon}
            />

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center shadow-xl sm:p-8">
                <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                        isWon
                            ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
                            : 'border border-rose-500/30 bg-rose-500/10 text-rose-400'
                    }`}
                >
                    {isWon ? (
                        <Crown className="h-8 w-8" />
                    ) : (
                        <Heart className="h-8 w-8" />
                    )}
                </div>

                <h2 className="mb-2 text-2xl font-bold text-slate-100 sm:text-3xl">
                    {isWon
                        ? 'Математичний трон підкорено!'
                        : 'Гру завершено: сердечка вичерпано'}
                </h2>

                <p className="mb-6 text-sm text-slate-400">
                    {isWon
                        ? 'Ви успішно пройшли всі 15 завдань з алгебри та геометрії.'
                        : 'Усі 5 сердечок було втрачено через помилки або закінчення часу.'}
                </p>

                <div className="mx-auto mb-6 grid max-w-md grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
                        <span className="block text-[11px] font-medium text-slate-400">
                            Бали
                        </span>
                        <span className="font-mono text-xl font-bold text-amber-300 sm:text-2xl">
                            {score}{' '}
                            <span className="text-xs font-normal text-slate-500">
                                / 30
                            </span>
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
                        <span className="block text-[11px] font-medium text-slate-400">
                            Правильних
                        </span>
                        <span className="font-mono text-xl font-bold text-emerald-400 sm:text-2xl">
                            {correctCount}{' '}
                            <span className="text-xs font-normal text-slate-500">
                                / 15
                            </span>
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
                        <span className="block text-[11px] font-medium text-slate-400">
                            Сердечка
                        </span>
                        <span className="font-mono text-xl font-bold text-rose-400 sm:text-2xl">
                            {hearts}{' '}
                            <span className="text-xs font-normal text-slate-500">
                                / 5
                            </span>
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        sound.play('click')
                        onRestart()
                    }}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 sm:text-base"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Грати знову</span>
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="px-1 text-lg font-bold text-slate-200">
                    Повний розбір усіх 15 завдань:
                </h3>

                {records.map((item, idx) => (
                    <div
                        key={item.questionId}
                        className={`rounded-2xl border bg-slate-900 p-5 ${
                            item.isCorrect
                                ? 'border-emerald-900/60'
                                : 'border-rose-900/60'
                        }`}
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-400">
                                Завдання {idx + 1}. {item.category}.{' '}
                                {item.topic}
                            </span>

                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                {item.isCorrect ? (
                                    <span className="flex items-center gap-1 text-emerald-400">
                                        <CheckCircle2 className="h-3.5 w-3.5" />{' '}
                                        +{item.pointsEarned} б.
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-rose-400">
                                        <XCircle className="h-3.5 w-3.5" /> 0 б.
                                    </span>
                                )}
                            </div>
                        </div>

                        <h4 className="mb-3 text-base font-semibold text-slate-100">
                            {item.question}
                        </h4>

                        <div className="mb-3 grid grid-cols-1 gap-2 font-mono text-xs sm:grid-cols-2 sm:text-sm">
                            <div
                                className={`rounded-xl border p-2.5 ${
                                    item.isCorrect
                                        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200'
                                        : 'border-rose-500/40 bg-rose-950/40 text-rose-200'
                                }`}
                            >
                                <span className="block font-sans text-[10px] font-bold text-slate-400">
                                    Ваша відповідь:
                                </span>
                                <span>{item.selectedText || 'Час вийшов'}</span>
                            </div>

                            {!item.isCorrect && (
                                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-emerald-200">
                                    <span className="block font-sans text-[10px] font-bold text-emerald-400">
                                        Правильна відповідь:
                                    </span>
                                    <span>{item.correctText}</span>
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-3 font-sans text-xs text-slate-300">
                            <span className="mb-0.5 block font-bold text-slate-400">
                                Пояснення:
                            </span>
                            <p>{item.explanation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
