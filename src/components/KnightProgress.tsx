import React from 'react'
import { UserAnswerRecord } from '../types/game'

interface KnightProgressProps {
    currentQuestionIndex: number
    totalQuestions: number
    records: UserAnswerRecord[]
    isFinished?: boolean
}

const STEPS = [
    { id: 1, x: 42, y: 138, round: 1 },
    { id: 2, x: 70, y: 130, round: 1 },
    { id: 3, x: 98, y: 122, round: 1 },
    { id: 4, x: 126, y: 114, round: 1 },
    { id: 5, x: 154, y: 106, round: 1 },
    { id: 6, x: 184, y: 98, round: 2 },
    { id: 7, x: 212, y: 90, round: 2 },
    { id: 8, x: 240, y: 82, round: 2 },
    { id: 9, x: 268, y: 74, round: 2 },
    { id: 10, x: 296, y: 66, round: 2 },
    { id: 11, x: 326, y: 58, round: 3 },
    { id: 12, x: 354, y: 50, round: 3 },
    { id: 13, x: 382, y: 42, round: 3 },
    { id: 14, x: 410, y: 34, round: 3 },
    { id: 15, x: 438, y: 26, round: 3 }
]

export const KnightProgress: React.FC<KnightProgressProps> = ({
    currentQuestionIndex,
    totalQuestions = 15,
    records,
    isFinished = false
}) => {
    const currentStep =
        STEPS[Math.min(currentQuestionIndex, STEPS.length - 1)] || STEPS[0]
    const knightX = isFinished ? 492 : currentStep.x
    const knightY = isFinished ? 32 : currentStep.y

    return (
        <div className="relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-3 shadow-xl sm:p-4">
            <div className="mb-1 flex items-center justify-between px-1 text-xs font-semibold">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase sm:text-xs">
                        Підйом лицаря сходами до Трону:
                    </span>
                </div>
                <div className="text-right">
                    <span className="font-mono text-xs font-bold text-amber-300">
                        {isFinished
                            ? '👑 Престол досягнуто!'
                            : `Сходинка ${currentQuestionIndex + 1} з ${totalQuestions}`}
                    </span>
                </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0d121f] to-slate-950">
                <svg
                    viewBox="0 0 540 165"
                    className="h-auto max-h-[170px] w-full select-none"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <radialGradient
                            id="torchGlow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#f59e0b"
                                stopOpacity="0.4"
                            />
                            <stop
                                offset="100%"
                                stopColor="#f59e0b"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <radialGradient
                            id="throneGlow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#fbbf24"
                                stopOpacity="0.6"
                            />
                            <stop
                                offset="100%"
                                stopColor="#f59e0b"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <linearGradient
                            id="stoneTop"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>

                        <linearGradient
                            id="stoneFront"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>

                        <linearGradient
                            id="stepGold"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#d97706" />
                            <stop offset="100%" stopColor="#b45309" />
                        </linearGradient>

                        <linearGradient
                            id="steelArmor"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#f1f5f9" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>

                        <linearGradient
                            id="goldThrone"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="40%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#a16207" />
                        </linearGradient>

                        <linearGradient
                            id="royalVelvet"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#dc2626" />
                            <stop offset="100%" stopColor="#7f1d1d" />
                        </linearGradient>
                    </defs>

                    <rect x="0" y="0" width="540" height="165" fill="#090d16" />

                    <g opacity="0.12" stroke="#475569" strokeWidth="1">
                        <line x1="0" y1="20" x2="540" y2="20" />
                        <line x1="0" y1="50" x2="540" y2="50" />
                        <line x1="0" y1="80" x2="540" y2="80" />
                        <line x1="0" y1="110" x2="540" y2="110" />
                        <line x1="0" y1="140" x2="540" y2="140" />
                    </g>

                    <g transform="translate(140, 65)">
                        <circle cx="0" cy="0" r="14" fill="url(#torchGlow)" />
                        <path d="M-2,6 L2,6 L1,14 L-1,14 Z" fill="#78350f" />
                        <path d="M-2,6 Q0,0 2,6 Q0,10 -2,6 Z" fill="#f59e0b" />
                    </g>
                    <g transform="translate(280, 40)">
                        <circle cx="0" cy="0" r="14" fill="url(#torchGlow)" />
                        <path d="M-2,6 L2,6 L1,14 L-1,14 Z" fill="#78350f" />
                        <path d="M-2,6 Q0,0 2,6 Q0,10 -2,6 Z" fill="#f59e0b" />
                    </g>

                    <circle cx="492" cy="30" r="45" fill="url(#throneGlow)" />

                    <path
                        d="M455,42 L535,42 L535,165 L455,165 Z"
                        fill="#111827"
                        stroke="#1e293b"
                        strokeWidth="1.5"
                    />
                    <polygon
                        points="455,42 468,34 535,34 535,42"
                        fill="#334155"
                        stroke="#475569"
                        strokeWidth="1"
                    />

                    {STEPS.map((step, idx) => {
                        const record = records.find(
                            (r) => r.questionId === step.id
                        )
                        const isPassed =
                            idx < currentQuestionIndex ||
                            (isFinished && idx === 14)
                        const isCurrent =
                            idx === currentQuestionIndex && !isFinished

                        let topColor = 'url(#stoneTop)'
                        let strokeColor = '#475569'
                        if (record) {
                            topColor = record.isCorrect ? '#065f46' : '#881337'
                            strokeColor = record.isCorrect
                                ? '#10b981'
                                : '#f43f5e'
                        } else if (isCurrent) {
                            topColor = 'url(#stepGold)'
                            strokeColor = '#fbbf24'
                        } else if (isPassed) {
                            topColor = '#1e293b'
                        }

                        return (
                            <g key={step.id}>
                                <rect
                                    x={step.x - 14}
                                    y={step.y}
                                    width="28"
                                    height="165"
                                    fill="url(#stoneFront)"
                                    stroke="#0f172a"
                                    strokeWidth="0.5"
                                />

                                <polygon
                                    points={`
                    ${step.x - 14},${step.y}
                    ${step.x - 8},${step.y - 6}
                    ${step.x + 20},${step.y - 6}
                    ${step.x + 14},${step.y}
                  `}
                                    fill={topColor}
                                    stroke={strokeColor}
                                    strokeWidth={isCurrent ? 1.5 : 1}
                                />

                                <text
                                    x={step.x}
                                    y={step.y - 1}
                                    fontSize="7"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    fill={
                                        isCurrent
                                            ? '#fef08a'
                                            : isPassed
                                              ? '#94a3b8'
                                              : '#64748b'
                                    }
                                    fontFamily="monospace"
                                >
                                    {step.id}
                                </text>
                            </g>
                        )
                    })}

                    <g transform="translate(170, 148)" opacity="0.8">
                        <text
                            x="0"
                            y="0"
                            fill="#10b981"
                            fontSize="7"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            І раунд
                        </text>
                    </g>
                    <g transform="translate(305, 125)" opacity="0.8">
                        <text
                            x="0"
                            y="0"
                            fill="#f59e0b"
                            fontSize="7"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            ІІ раунд
                        </text>
                    </g>
                    <g transform="translate(425, 95)" opacity="0.8">
                        <text
                            x="0"
                            y="0"
                            fill="#a855f7"
                            fontSize="7"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            ІІІ раунд
                        </text>
                    </g>

                    <g transform="translate(492, 10)">
                        <path
                            d="M-15,24 L-15,-2 Q-15,-8 0,-10 Q15,-8 15,-2 L15,24 Z"
                            fill="url(#goldThrone)"
                            stroke="#78350f"
                            strokeWidth="1.2"
                        />

                        <path
                            d="M-8,-10 L-5,-16 L0,-12 L5,-16 L8,-10 Z"
                            fill="url(#goldThrone)"
                            stroke="#78350f"
                            strokeWidth="1"
                        />
                        <circle cx="0" cy="-14" r="1.5" fill="#ef4444" />
                        <circle cx="-5" cy="-15" r="1" fill="#3b82f6" />
                        <circle cx="5" cy="-15" r="1" fill="#3b82f6" />

                        <path
                            d="M-10,22 L-10,0 Q-10,-5 0,-6 Q10,-5 10,0 L10,22 Z"
                            fill="url(#royalVelvet)"
                        />

                        <rect
                            x="-14"
                            y="18"
                            width="28"
                            height="6"
                            rx="2"
                            fill="url(#royalVelvet)"
                            stroke="#78350f"
                            strokeWidth="0.8"
                        />

                        <rect
                            x="-17"
                            y="14"
                            width="4"
                            height="10"
                            rx="1.5"
                            fill="url(#goldThrone)"
                            stroke="#78350f"
                            strokeWidth="0.8"
                        />
                        <circle cx="-15" cy="14" r="2" fill="#fef08a" />
                        <rect
                            x="13"
                            y="14"
                            width="4"
                            height="10"
                            rx="1.5"
                            fill="url(#goldThrone)"
                            stroke="#78350f"
                            strokeWidth="0.8"
                        />
                        <circle cx="15" cy="14" r="2" fill="#fef08a" />

                        <rect
                            x="-14"
                            y="24"
                            width="3"
                            height="6"
                            fill="#78350f"
                        />
                        <rect
                            x="11"
                            y="24"
                            width="3"
                            height="6"
                            fill="#78350f"
                        />
                    </g>

                    <g
                        style={{
                            transform: `translate(${knightX}px, ${knightY}px)`,
                            transition:
                                'transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1)'
                        }}
                    >
                        <ellipse
                            cx="0"
                            cy="0"
                            rx="8"
                            ry="2.5"
                            fill="#000"
                            opacity="0.6"
                        />

                        <path
                            d="M-7,-22 Q-14,-14 -12,-3 Q-8,0 -2,-2 Q-4,-12 -5,-22 Z"
                            fill="#b91c1c"
                            stroke="#7f1d1d"
                            strokeWidth="0.6"
                        />

                        <path
                            d="M-4,-9 L-6,-2 L-4,0 L-1,-1 L-2,-9 Z"
                            fill="#475569"
                        />

                        <path
                            d="M1,-9 L4,-3 L6,0 L2,0 L0,-9 Z"
                            fill="url(#steelArmor)"
                            stroke="#334155"
                            strokeWidth="0.5"
                        />

                        <path
                            d="M-6,-22 L6,-22 L5,-9 L-5,-9 Z"
                            fill="url(#steelArmor)"
                            stroke="#334155"
                            strokeWidth="0.6"
                        />

                        <circle cx="0" cy="-16" r="2" fill="#f59e0b" />
                        <line
                            x1="0"
                            y1="-19"
                            x2="0"
                            y2="-13"
                            stroke="#fef08a"
                            strokeWidth="0.7"
                        />
                        <line
                            x1="-2.5"
                            y1="-16"
                            x2="2.5"
                            y2="-16"
                            stroke="#fef08a"
                            strokeWidth="0.7"
                        />

                        <rect
                            x="-5.5"
                            y="-10"
                            width="11"
                            height="2"
                            fill="#78350f"
                        />
                        <rect
                            x="-1"
                            y="-10.5"
                            width="2"
                            height="3"
                            fill="#eab308"
                        />

                        <path
                            d="M-11,-20 Q-11,-10 -5,-5 Q-2,-10 -2,-20 Z"
                            fill="#1e3a8a"
                            stroke="#fbbf24"
                            strokeWidth="0.9"
                        />

                        <line
                            x1="-6.5"
                            y1="-18"
                            x2="-6.5"
                            y2="-8"
                            stroke="#fbbf24"
                            strokeWidth="0.9"
                        />
                        <line
                            x1="-10"
                            y1="-14"
                            x2="-3"
                            y2="-14"
                            stroke="#fbbf24"
                            strokeWidth="0.9"
                        />

                        <circle
                            cx="0"
                            cy="-26"
                            r="5.5"
                            fill="url(#steelArmor)"
                            stroke="#334155"
                            strokeWidth="0.6"
                        />

                        <path
                            d="M-1.5,-26 L4.5,-26 L3,-24 L-1,-24 Z"
                            fill="#0f172a"
                        />
                        <circle cx="2" cy="-25" r="0.5" fill="#fef08a" />

                        <path
                            d="M-1,-31 Q-3,-36 -7,-34 Q-3,-31 0,-29 Z"
                            fill="#dc2626"
                        />
                        <path
                            d="M0,-31 Q2,-37 6,-35 Q3,-31 1,-29 Z"
                            fill="#f59e0b"
                        />

                        {isFinished ? (
                            <g>
                                <path
                                    d="M4,-21 L8,-24 L10,-28"
                                    stroke="url(#steelArmor)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />

                                <line
                                    x1="10"
                                    y1="-28"
                                    x2="16"
                                    y2="-44"
                                    stroke="#e2e8f0"
                                    strokeWidth="1.5"
                                />
                                <line
                                    x1="8"
                                    y1="-31"
                                    x2="13"
                                    y2="-29"
                                    stroke="#eab308"
                                    strokeWidth="1.5"
                                />
                                <circle
                                    cx="9"
                                    cy="-26"
                                    r="1.5"
                                    fill="#b45309"
                                />

                                <circle
                                    cx="16"
                                    cy="-44"
                                    r="2.5"
                                    fill="#fff"
                                    className="animate-ping"
                                />
                            </g>
                        ) : (
                            <g>
                                <path
                                    d="M4,-21 L7,-14 L5,-9"
                                    stroke="url(#steelArmor)"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                />

                                <line
                                    x1="6"
                                    y1="-10"
                                    x2="14"
                                    y2="4"
                                    stroke="#cbd5e1"
                                    strokeWidth="1.3"
                                />
                                <line
                                    x1="3"
                                    y1="-8"
                                    x2="8"
                                    y2="-12"
                                    stroke="#eab308"
                                    strokeWidth="1.3"
                                />
                                <circle
                                    cx="5"
                                    cy="-11"
                                    r="1.2"
                                    fill="#78350f"
                                />
                            </g>
                        )}

                        {isFinished && (
                            <g transform="translate(0, -37)">
                                <path
                                    d="M-5,4 L-4,-2 L-1,1 L2,-2 L3,4 Z"
                                    fill="#fbbf24"
                                    stroke="#78350f"
                                    strokeWidth="0.6"
                                />
                                <circle cx="-1" cy="0" r="0.8" fill="#ef4444" />
                            </g>
                        )}
                    </g>
                </svg>
            </div>
        </div>
    )
}
