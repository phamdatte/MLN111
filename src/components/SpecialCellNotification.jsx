import React from 'react';

const SpecialCellNotification = ({ type, effect, onClose }) => {
    const isBomb = type === 'bomb';
    const isBonus = type === 'bonus';

    const getIcon = () => {
        if (isBomb) return '💣';
        if (isBonus && effect === 2) return '🎁';
        return '⭐';
    };

    const getTitle = () => {
        if (isBomb) return 'BOM!';
        return 'BONUS!';
    };

    const getMessage = () => {
        if (isBomb) {
            return `Bạn đã vào ô bom! Lùi lại ${Math.abs(effect)} ô`;
        }
        return `Bạn đã vào ô bonus! Tiến thêm ${effect} ô`;
    };

    const getBgColor = () => {
        if (isBomb) return 'from-red-500 to-red-700';
        return 'from-green-500 to-green-700';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-slideIn backdrop-blur-sm">
            <div className={`bg-gradient-to-br ${getBgColor()} rounded-2xl max-w-md w-full mx-4 shadow-2xl overflow-hidden animate-bounce-slow`}>
                <div className="p-8 text-center text-white">
                    {/* Icon */}
                    <div className="text-8xl mb-4 animate-pulse">
                        {getIcon()}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-4">
                        {getTitle()}
                    </h2>

                    {/* Message */}
                    <p className="text-xl mb-6">
                        {getMessage()}
                    </p>

                    {/* Effect indicator */}
                    <div className="text-6xl font-bold mb-6">
                        {effect > 0 ? '+' : ''}{effect}
                    </div>

                    {/* Auto-close message */}
                    <p className="text-sm opacity-80">
                        Tự động đóng sau 2 giây...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpecialCellNotification;
