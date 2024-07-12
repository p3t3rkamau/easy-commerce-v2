'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './index.scss'

type Question = {
  id: number
  text: string
  options: string[]
}

const FeedbackPopup: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<{ [key: number]: string }>({})
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Fetch questions from JSON or API
    const fetchedQuestions: Question[] = [
      {
        id: 1,
        text: 'How would you rate the new website?',
        options: ['A. Excellent', 'B. Good', 'C. Average', 'D. Poor'],
      },
      {
        id: 2,
        text: 'Should we use AI to help in sales?',
        options: ['A. Yes', 'B. No', 'C. Maybe', 'D. Not sure'],
      },
      {
        id: 3,
        text: 'How can we improve user experience?',
        options: ['A. Better UI', 'B. Faster load times', 'C. More features', 'D. Other'],
      },
      {
        id: 4,
        text: 'Please provide your feedback:',
        options: ['text'],
      },
    ]

    setQuestions(fetchedQuestions)
  }, [])

  const handleOptionChange = (questionId: number, option: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: option,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const feedbackResponses = Object.keys(responses).map(questionId => ({
      questionId: Number(questionId),
      responseType: responses[questionId] === 'text' ? 'text' : 'multipleChoice',
      response: responses[questionId],
    }))

    try {
      await axios.post('http://localhost:3000/api/feedbackform', feedbackResponses)
      alert('Feedback submitted successfully!')
      setShowPopup(false)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback.')
    }
  }

  return (
    <div>
      <button className="feedback-button" onClick={() => setShowPopup(true)}>
        Feedback
      </button>
      {showPopup && (
        <div className="feedback-popup">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              {questions.map(question => (
                <div key={question.id} className="question">
                  <p>{question.text}</p>
                  {question.options[0] !== 'text' ? (
                    question.options.map(option => (
                      <label key={option}>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={responses[question.id] === option}
                          onChange={() => handleOptionChange(question.id, option)}
                        />
                        {option}
                      </label>
                    ))
                  ) : (
                    <textarea
                      name={`question-${question.id}`}
                      value={responses[question.id] || ''}
                      onChange={e => handleOptionChange(question.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <button className="submitbtn" type="submit">
                Submit
              </button>
            </form>
            <button className="close-button" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackPopup
