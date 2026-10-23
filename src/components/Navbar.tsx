import React from 'react'
import { Crown, Heart, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { sound } from '../utils/audio'

interface NavbarProps {
    score: number
    hearts: number
    maxHearts: number
    currentQuestionIndex: number
    totalQuestions: number
    roundTitle: string
    isMuted: boolean
    onToggleMute: () => void
    onRestart: () => void
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
    onRestart
}) => {
    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-800 bg-slate-950/95 px-3 py-2.5 backdrop-blur-md sm:px-6">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                        <Crown className="h-4 w-4" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-wide text-slate-100 sm:text-base">
                            Математичний трон
                        </h1>
                        <p className="hidden truncate text-[11px] text-slate-400 sm:block">
                            {roundTitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5">
                    {Array.from({ length: maxHearts }).map((_, idx) => {
                        const isFilled = idx < hearts
                        return (
                            <Heart
                                key={idx}
                                className={`h-4 w-4 transition-all duration-300 sm:h-5 sm:w-5 ${
                                    isFilled
                                        ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]'
                                        : 'fill-slate-800 text-slate-700 opacity-40'
                                }`}
                            />
                        )
                    })}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                            Бали
                        </span>
                        <span className="font-mono text-sm font-bold text-amber-300 sm:text-base">
                            {score}{' '}
                            <span className="text-xs text-slate-500">/ 30</span>
                        </span>
                    </div>

                    <div className="hidden h-6 w-px bg-slate-800 sm:block" />

                    <button
                        onClick={() => {
                            onToggleMute()
                            sound.play('click')
                        }}
                        title={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
                        aria-label={
                            isMuted ? 'Увімкнути звук' : 'Вимкнути звук'
                        }
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-100"
                    >
                        {isMuted ? (
                            <VolumeX className="h-4 w-4 text-rose-400" />
                        ) : (
                            <Volume2 className="h-4 w-4 text-emerald-400" />
                        )}
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm('Розпочати гру спочатку?')) {
                                onRestart()
                            }
                        }}
                        title="Почати спочатку"
                        aria-label="Почати спочатку"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-900 hover:text-rose-400"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    )
}
