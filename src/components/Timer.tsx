import React, { useEffect } from 'react'
import { Clock } from 'lucide-react'
import { sound } from '../utils/audio'

interface TimerProps {
    timeLeft: number
    totalTime: number
    isPaused: boolean
}

export const Timer: React.FC<TimerProps> = ({
    timeLeft,
    totalTime,
    isPaused
}) => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    const percentage = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100))
    const isUrgent = timeLeft <= 20

    useEffect(() => {
        if (isPaused) return
        if (timeLeft <= 5 && timeLeft > 0) {
            sound.play('tick_urgent')
        }
    }, [timeLeft, isPaused])

    return (
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Час на відповідь (2 хв):</span>
                </div>
                <span
                    className={`font-mono text-sm font-bold ${isUrgent ? 'animate-pulse text-rose-400' : 'text-slate-200'}`}
                >
                    {formattedTime} / 02:00
                </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full border border-slate-800/80 bg-slate-950">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                        isUrgent
                            ? 'bg-rose-500'
                            : timeLeft <= 45
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
