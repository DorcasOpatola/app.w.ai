import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"

type Question = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export default function HistoryQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions: Question[] = [
    {
      question: "In which year was the Declaration of Independence signed?",
      options: ["1774", "1775", "1776", "1777"],
      correctAnswer: "1776",
      explanation: "The Declaration of Independence was signed on July 4, 1776, marking the formal separation of the 13 American colonies from Great Britain."
    },
    {
      question: "Who was the first President of the United States?",
      options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
      correctAnswer: "George Washington",
      explanation: "George Washington served as the first President from 1789 to 1797 and is often called the 'Father of His Country'."
    },
    {
      question: "Which war was fought between the North and the South United States?",
      options: ["Revolutionary War", "Civil War", "War of 1812", "Spanish-American War"],
      correctAnswer: "Civil War",
      explanation: "The Civil War (1861-1865) was fought between the Union (North) and the Confederacy (South) primarily over slavery and states' rights."
    }
  ]

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const isQuizComplete = currentQuestion >= questions.length

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">American History Quiz</CardTitle>
        <p className="text-gray-500">Score: {score}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {isQuizComplete ? (
          <div className="text-center">
            <p className="text-xl font-semibold">Quiz Complete!</p>
            <p className="text-lg">Your final score: {score} out of {questions.length}</p>
            <Button onClick={restartQuiz} className="mt-4">Restart Quiz</Button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 gap-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant={
                    showFeedback
                      ? option === questions[currentQuestion].correctAnswer
                        ? 'default'
                        : option === selectedAnswer
                        ? 'destructive'
                        : 'outline'
                      : 'outline'
                  }
                  disabled={showFeedback}
                  className="text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold">
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? '✅ Correct!' : '❌ Incorrect!'}
                </p>
                <p className="mt-2">{questions[currentQuestion].explanation}</p>
                <Button onClick={nextQuestion} className="mt-4">
                  Next Question
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
