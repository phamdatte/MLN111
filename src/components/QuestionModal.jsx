import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const QuestionModal = ({ question, difficulty, onAnswer, onClose, currentGroup }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(true);

    const difficultyInfo = {
        easy: { label: 'Dễ', color: 'bg-green-500', moves: 1 },
        medium: { label: 'Vừa', color: 'bg-teal-500', moves: 2 },
        hard: { label: 'Khó', color: 'bg-red-500', moves: 3 },
    };

    const handleSelectAnswer = (option) => {
        if (!isTimerActive) return;
        setSelectedAnswer(option);
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        setIsTimerActive(false);
        const isCorrect = selectedAnswer === question.correctAnswer;

        setFeedback(isCorrect ? 'correct' : 'wrong');

        setTimeout(() => {
            onAnswer(isCorrect);
            setFeedback(null);
            setSelectedAnswer(null);
        }, 2000);
    };

    const handleTimeout = () => {
        setIsTimerActive(false);
        setFeedback('timeout');

        setTimeout(() => {
            onAnswer(false);
            setFeedback(null);
            setSelectedAnswer(null);
        }, 2000);
    };

    const getOptionStyle = (option) => {
        const optionLetter = option.charAt(0); // Get A, B, C, or D

        if (feedback) {
            if (optionLetter === question.correctAnswer) {
                return 'bg-green-100 border-green-500 border-2 text-green-800';
            }
            if (optionLetter === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                return 'bg-red-100 border-red-500 border-2 text-red-800';
            }
            return 'bg-gray-50 border-gray-300 text-gray-500';
        }

        if (selectedAnswer === optionLetter) {
            return 'bg-teal-100 border-teal-500 border-2 text-teal-900 font-semibold';
        }

        return 'bg-white border-gray-300 hover:bg-gray-50 hover:border-teal-400 text-gray-800';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-slideIn backdrop-blur-sm">
            <div className={`bg-white rounded-2xl max-w-3xl w-full mx-4 shadow-2xl overflow-hidden ${feedback === 'correct' ? 'animate-correct' :
                    feedback === 'wrong' ? 'animate-wrong' : ''
                }`}>
                {/* Header with difficulty badge */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <span className={`${difficultyInfo[difficulty].color} text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg`}>
                                {difficultyInfo[difficulty].label}
                            </span>
                            <span className="text-white font-bold text-lg">
                                +{difficultyInfo[difficulty].moves} ô
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-teal-100">Đội đang chơi:</span>
                            <div className="text-2xl font-bold">
                                Nhóm {currentGroup}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Timer */}
                    <div className="mb-6 flex justify-center">
                        <Timer duration={30} onTimeout={handleTimeout} isActive={isTimerActive} />
                    </div>

                    {/* Question */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
                            {question.question}
                        </h3>

                        {/* Multiple choice options */}
                        <div className="space-y-3">
                            {question.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(option.charAt(0))}
                                    disabled={!isTimerActive}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${getOptionStyle(option)} disabled:cursor-not-allowed`}
                                >
                                    <span className="font-semibold text-lg">{option}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className={`mb-4 p-4 rounded-xl text-center font-bold text-lg ${feedback === 'correct' ? 'bg-green-100 text-green-800 border-2 border-green-500' :
                                feedback === 'timeout' ? 'bg-orange-100 text-orange-800 border-2 border-orange-500' :
                                    'bg-red-100 text-red-800 border-2 border-red-500'
                            }`}>
                            {feedback === 'correct' && '🎉 Chính xác! Tiến lên!'}
                            {feedback === 'wrong' && `❌ Sai rồi! Đáp án đúng: ${question.correctAnswer}`}
                            {feedback === 'timeout' && `⏰ Hết giờ! Đáp án đúng: ${question.correctAnswer}`}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedAnswer || !isTimerActive}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg text-lg"
                    >
                        Xác nhận đáp án
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;
