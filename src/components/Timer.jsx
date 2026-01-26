import React, { useEffect, useState } from 'react';

const Timer = ({ duration = 30, onTimeout, isActive }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(duration);
            return;
        }

        if (timeLeft <= 0) {
            onTimeout();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onTimeout, duration]);

    const percentage = (timeLeft / duration) * 100;
    const circumference = 2 * Math.PI * 70; // radius = 70
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
                {/* Background circle */}
                <svg className="transform -rotate-90 w-40 h-40">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={timeLeft <= 10 ? '#EF4444' : '#F97316'}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                {/* Timer number in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
                        {timeLeft}
                    </span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">giây</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;
