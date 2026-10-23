import React from 'react'
import { Crown, Heart, Clock, Play, Volume2, VolumeX } from 'lucide-react'
import { sound } from '../utils/audio'

interface StartScreenProps {
    onStartGame: () => void
    isMuted: boolean
    onToggleMute: () => void
}

export const StartScreen: React.FC<StartScreenProps> = ({
    onStartGame,
    isMuted,
    onToggleMute
}) => {
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-4 sm:p-6">
            <div className="mb-4 flex w-full justify-end">
                <button
                    onClick={() => {
                        onToggleMute()
                        sound.play('click')
                    }}
                    aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
                    className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300 transition-colors hover:text-amber-400"
                >
                    {isMuted ? (
                        <VolumeX className="h-4 w-4 text-rose-400" />
                    ) : (
                        <Volume2 className="h-4 w-4 text-emerald-400" />
                    )}
                </button>
            </div>

            <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl sm:p-10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    <Crown className="h-8 w-8" />
                </div>

                <h1 className="mb-2 text-3xl font-bold text-slate-100 sm:text-4xl">
                    Математичний трон
                </h1>

                <p className="mb-6 text-sm text-slate-400">
                    Онлайн-гра з алгебри та геометрії • 10-й клас (рівень
                    стандарту)
                </p>

                <div className="mb-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500">
                            <Heart className="h-5 w-5 fill-rose-500" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-200">
                                5 сердечок на гру
                            </span>
                            <span className="text-[11px] text-slate-400">
                                Помилка забирає 1 життя
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-200">
                                2 хвилини на кожне
                            </span>
                            <span className="text-[11px] text-slate-400">
                                Таймер 120 с на одне завдання
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        sound.play('click')
                        onStartGame()
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-amber-500 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400 sm:text-lg"
                >
                    <Play className="h-5 w-5 fill-slate-950" />
                    <span>Почати гру</span>
                </button>
            </div>
        </div>
    )
}
