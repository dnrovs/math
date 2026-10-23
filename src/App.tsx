/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS_DATA } from './data/questions';
import { UserAnswerRecord } from './types/game';
import { sound } from './utils/audio';
import { Navbar } from './components/Navbar';
import { Timer } from './components/Timer';
import { QuestionCard } from './components/QuestionCard';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { KnightProgress } from './components/KnightProgress';

const MAX_HEARTS = 5;
const QUESTION_DURATION = 120; // 2 minutes (120 seconds) per task

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [records, setRecords] = useState<UserAnswerRecord[]>([]);
  const [score, setScore] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(MAX_HEARTS);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Current Question
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_DURATION);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(true);

  const currentQuestion = QUESTIONS_DATA[currentQuestionIndex] || QUESTIONS_DATA[0];

  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleStartGame = () => {
    setCurrentQuestionIndex(0);
    setRecords([]);
    setScore(0);
    setHearts(MAX_HEARTS);
    setSelectedOptionId(null);
    setIsQuestionAnswered(false);
    setTimeLeft(QUESTION_DURATION);
    setIsTimerPaused(false);
    setGameState('playing');
  };

  // Timeout handler: lose 1 heart and show explanation
  const handleTimeExpired = useCallback(() => {
    if (isQuestionAnswered) return;
    setIsQuestionAnswered(true);
    setIsTimerPaused(true);
    sound.play('wrong');

    const nextHearts = hearts - 1;
    setHearts(nextHearts);

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
      timeSpent: QUESTION_DURATION,
    };

    setRecords(prev => [...prev, record]);
  }, [currentQuestion, hearts, isQuestionAnswered]);

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing' || isTimerPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isTimerPaused, handleTimeExpired]);

  // Handle selecting an option
  const handleSelectOption = (optionId: string) => {
    if (isQuestionAnswered || gameState !== 'playing') return;

    setIsQuestionAnswered(true);
    setIsTimerPaused(true);
    setSelectedOptionId(optionId);

    const chosenOption = currentQuestion.options.find(o => o.id === optionId);
    const isCorrect = chosenOption?.text === currentQuestion.correctAnswer;
    const timeSpent = QUESTION_DURATION - timeLeft;

    let pointsEarned = 0;
    if (isCorrect) {
      sound.play('correct');
      pointsEarned = currentQuestion.points;
      setScore(prev => prev + pointsEarned);
    } else {
      sound.play('wrong');
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
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
      timeSpent,
    };

    setRecords(prev => [...prev, record]);
  };

  // Next question or finish
  const handleNextQuestion = () => {
    // If out of hearts, go directly to end screen
    if (hearts <= 0) {
      setGameState('end');
      return;
    }

    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx >= QUESTIONS_DATA.length) {
      setGameState('end');
      return;
    }

    setCurrentQuestionIndex(nextIdx);
    setSelectedOptionId(null);
    setIsQuestionAnswered(false);
    setTimeLeft(QUESTION_DURATION);
    setIsTimerPaused(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Start Screen */}
      {gameState === 'start' && (
        <StartScreen
          onStartGame={handleStartGame}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 2. Playing Screen */}
      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col">
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

          <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-4">
            {/* Visual demonstration of the knight moving towards the throne */}
            <KnightProgress
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS_DATA.length}
              records={records}
            />

            {/* Timer (2 minutes) */}
            <Timer
              timeLeft={timeLeft}
              totalTime={QUESTION_DURATION}
              isPaused={isTimerPaused}
            />

            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={handleSelectOption}
              isAnswered={isQuestionAnswered}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentQuestionIndex === QUESTIONS_DATA.length - 1}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUESTIONS_DATA.length}
            />
          </main>
        </div>
      )}

      {/* 3. End Screen */}
      {gameState === 'end' && (
        <div className="flex-1 flex flex-col">
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
  );
}
