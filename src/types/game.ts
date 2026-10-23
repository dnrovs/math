export interface OptionItem {
    id: string
    text: string
}

export interface Question {
    id: number
    round: 1 | 2 | 3
    roundTitle: string
    category: string
    topic: string
    question: string
    correctAnswer: string
    options: OptionItem[]
    explanation: string
    points: number
}

export interface UserAnswerRecord {
    questionId: number
    question: string
    category: string
    topic: string
    round: number
    selectedText: string
    correctText: string
    isCorrect: boolean
    pointsEarned: number
    explanation: string
    timeSpent: number
}
