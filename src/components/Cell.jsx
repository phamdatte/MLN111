import React from 'react';
import PlayerToken from './PlayerToken';

const Cell = ({ cellNumber, isStart, isEnd, isSpecial, specialType, players, position }) => {
    const getCellIcon = () => {
        if (isStart) return '🏁';
        if (isEnd) return '⭐';
        if (isSpecial && specialType === 'lucky') return '⭐';
        if (isSpecial && specialType === 'obstacle') return '⚠️';
        return null;
    };

    const getCellStyle = () => {
        if (isStart) {
            return 'bg-gradient-to-br from-red-500 to-red-700 border-4 border-red-800 shadow-xl';
        }
        if (isEnd) {
            return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-orange-600 shadow-xl';
        }
        if (isSpecial) {
            return specialType === 'lucky'
                ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-3 border-blue-700 shadow-lg'
                : 'bg-gradient-to-br from-orange-400 to-orange-600 border-3 border-orange-700 shadow-lg';
        }
        return 'bg-white border-4 border-gray-300 shadow-md';
    };

    const getLabel = () => {
        if (isStart) return 'Pác Bó';
        if (isEnd) return 'Ba Đình';
        return null;
    };

    const icon = getCellIcon();
    const label = getLabel();

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={position}
        >
            <div className="flex flex-col items-center">
                {/* Cell circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getCellStyle()} transition-all duration-300 hover:scale-110`}>
                    {icon && <span className="text-2xl">{icon}</span>}
                </div>

                {/* Label */}
                {label && (
                    <div className="mt-1 text-xs font-bold text-red-700 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                        {label}
                    </div>
                )}

                {/* Player tokens */}
                {players && players.length > 0 && (
                    <div className="absolute -bottom-8 flex gap-1 flex-wrap justify-center max-w-[100px]">
                        {players.map((player) => (
                            <PlayerToken
                                key={player.groupNumber}
                                groupNumber={player.groupNumber}
                                position={cellNumber}
                                isActive={player.isActive}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cell;
