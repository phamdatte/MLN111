import React from 'react';

const PlayerToken = ({ groupNumber, position, isActive }) => {
    // 3 distinct, vibrant colors for the 3 teams
    const colors = [
        'bg-gradient-to-br from-rose-500 to-red-600',      // Team 1 - Red
        'bg-gradient-to-br from-blue-500 to-indigo-600',   // Team 2 - Blue
        'bg-gradient-to-br from-emerald-500 to-teal-600',  // Team 3 - Green
    ];

    const tokenColor = colors[groupNumber - 1] || 'bg-gray-500';

    return (
        <div
            className={`w-10 h-10 rounded-full border-4 border-white shadow-xl transition-all duration-500 transform flex items-center justify-center text-white font-black text-base ${tokenColor} ${isActive ? 'ring-4 ring-amber-400 scale-125 animate-pulse' : ''
                }`}
            title={`Nhóm ${groupNumber}`}
        >
            <span>{groupNumber}</span>
        </div>
    );
};

export default PlayerToken;
