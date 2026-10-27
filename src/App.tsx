import React, { useState, useEffect, useCallback, useRef } from 'react'
import { QUESTIONS_DATA } from './data/questions'
import { UserAnswerRecord } from './types/game'
import { sound } from './utils/audio'
import { Navbar } from './components/Navbar'
import { Timer } from './components/Timer'
import { QuestionCard } from './components/QuestionCard'
import { StartScreen } from './components/StartScreen'
import { EndScreen } from './components/EndScreen'
import { KnightProgress } from './components/KnightProgress'

// import korniyLove from '../public/assets/korniy-love.mp3'

const MAX_HEARTS = 5
const QUESTION_DURATION = 120

export default function App() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>(
        'start'
    )
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [records, setRecords] = useState<UserAnswerRecord[]>([])
    const [score, setScore] = useState<number>(0)
    const [hearts, setHearts] = useState<number>(MAX_HEARTS)
    const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted())

    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
        null
    )
    const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false)

    const [timeLeft, setTimeLeft] = useState<number>(QUESTION_DURATION)
    const [isTimerPaused, setIsTimerPaused] = useState<boolean>(true)

    const currentQuestion =
        QUESTIONS_DATA[currentQuestionIndex] || QUESTIONS_DATA[0]

    const backgroundMusic = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        backgroundMusic.current = new Audio('/')//(korniyLove)
        backgroundMusic.current.loop = true

        return () => {
            backgroundMusic.current?.pause()
        }
    }, [])

    useEffect(() => {
        if (backgroundMusic.current) {
            backgroundMusic.current.volume = isMuted ? 0 : 0.25
        }
    }, [isMuted])

    const handleToggleMute = () => {
        const next = sound.toggleMute()
        setIsMuted(next)
    }

    const handleStartGame = () => {
        backgroundMusic.current?.play()

        setCurrentQuestionIndex(0)
        setRecords([])
        setScore(0)
        setHearts(MAX_HEARTS)
        setSelectedOptionId(null)
        setIsQuestionAnswered(false)
        setTimeLeft(QUESTION_DURATION)
        setIsTimerPaused(false)
        setGameState('playing')
    }

    const handleTimeExpired = useCallback(() => {
        if (isQuestionAnswered) return
        setIsQuestionAnswered(true)
        setIsTimerPaused(true)
        sound.play('wrong')

        const nextHearts = hearts - 1
        setHearts(nextHearts)

        const record: UserAnswerRecord = {
            questionId: currentQuestion.id,
            question: currentQuestion.question,
            category: currentQuestion.category,
            topic: currentQuestion.topic,
            round: currentQuestion.round,
            selectedText: 'Час вийшов (0 с)',
            correctText: currentQuestion.correctAnswer,
            isCorrect: false,
            pointsEarned: 0,
            explanation: currentQuestion.explanation,
            timeSpent: QUESTION_DURATION
        }

        setRecords((prev) => [...prev, record])
    }, [currentQuestion, hearts, isQuestionAnswered])

    useEffect(() => {
        if (gameState !== 'playing' || isTimerPaused) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeExpired()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [gameState, isTimerPaused, handleTimeExpired])

    const handleSelectOption = (optionId: string) => {
        if (isQuestionAnswered || gameState !== 'playing') return

        setIsQuestionAnswered(true)
        setIsTimerPaused(true)
        setSelectedOptionId(optionId)

        const chosenOption = currentQuestion.options.find(
            (o) => o.id === optionId
        )
        const isCorrect = chosenOption?.text === currentQuestion.correctAnswer
        const timeSpent = QUESTION_DURATION - timeLeft

        let pointsEarned = 0
        if (isCorrect) {
            sound.play('correct')
            pointsEarned = currentQuestion.points
            setScore((prev) => prev + pointsEarned)
        } else {
            sound.play('wrong')
            const nextHearts = hearts - 1
            setHearts(nextHearts)
        }

        const record: UserAnswerRecord = {
            questionId: currentQuestion.id,
            question: currentQuestion.question,
            category: currentQuestion.category,
            topic: currentQuestion.topic,
            round: currentQuestion.round,
            selectedText: chosenOption?.text || '',
            correctText: currentQuestion.correctAnswer,
            isCorrect,
            pointsEarned,
            explanation: currentQuestion.explanation,
            timeSpent
        }

        setRecords((prev) => [...prev, record])
    }

    const handleNextQuestion = () => {
        if (hearts <= 0) {
            setGameState('end')
            return
        }

        const nextIdx = currentQuestionIndex + 1
        if (nextIdx >= QUESTIONS_DATA.length) {
            setGameState('end')
            return
        }

        setCurrentQuestionIndex(nextIdx)
        setSelectedOptionId(null)
        setIsQuestionAnswered(false)
        setTimeLeft(QUESTION_DURATION)
        setIsTimerPaused(false)
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
            {gameState === 'start' && (
                <StartScreen
                    onStartGame={handleStartGame}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                />
            )}

            {gameState === 'playing' && (
                <div className="flex flex-1 flex-col">
                    <Navbar
                        score={score}
                        hearts={hearts}
                        maxHearts={MAX_HEARTS}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={QUESTIONS_DATA.length}
                        roundTitle={currentQuestion.roundTitle}
                        isMuted={isMuted}
                        onToggleMute={handleToggleMute}
                        onRestart={handleStartGame}
                    />

                    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4 sm:p-6">
                        <KnightProgress
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={QUESTIONS_DATA.length}
                            records={records}
                        />

                        <Timer
                            timeLeft={timeLeft}
                            totalTime={QUESTION_DURATION}
                            isPaused={isTimerPaused}
                        />

                        <QuestionCard
                            question={currentQuestion}
                            selectedOptionId={selectedOptionId}
                            onSelectOption={handleSelectOption}
                            isAnswered={isQuestionAnswered}
                            onNextQuestion={handleNextQuestion}
                            isLastQuestion={
                                currentQuestionIndex ===
                                QUESTIONS_DATA.length - 1
                            }
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={QUESTIONS_DATA.length}
                        />
                    </main>
                </div>
            )}

            {gameState === 'end' && (
                <div className="flex flex-1 flex-col">
                    <Navbar
                        score={score}
                        hearts={hearts}
                        maxHearts={MAX_HEARTS}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={QUESTIONS_DATA.length}
                        roundTitle="Підсумки гри"
                        isMuted={isMuted}
                        onToggleMute={handleToggleMute}
                        onRestart={handleStartGame}
                    />

                    <EndScreen
                        score={score}
                        hearts={hearts}
                        records={records}
                        onRestart={handleStartGame}
                    />
                </div>
            )}
        </div>
    )
}
