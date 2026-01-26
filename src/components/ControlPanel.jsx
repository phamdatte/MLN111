import React from 'react';
import Leaderboard from './Leaderboard';

const ControlPanel = ({
    currentTurn,
    onSelectDifficulty,
    onResetGame,
    gamePhase,
    playerPositions,
    totalTeams,
    teamNames,
    teamColors,
    turnOrder,
    currentTurnIndex
}) => {
    const currentScore = currentTurn ? playerPositions[currentTurn - 1] * 50 : 0;

    return (
        <div className="space-y-5 h-full">
            {/* Turn Order Display */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Thứ tự lượt chơi</p>
                <div className="flex justify-center items-center gap-2">
                    {turnOrder && turnOrder.map((teamNum, index) => {
                        const isActive = index === currentTurnIndex;
                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className={`w-12 h-12 rounded-xl font-black text-lg flex items-center justify-center transition-all duration-300 ${isActive
                                            ? `bg-gradient-to-br ${teamColors[teamNum - 1]} text-white shadow-lg scale-110 ring-4 ring-amber-300`
                                            : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    {teamNum}
                                </div>
                                {index < turnOrder.length - 1 && (
                                    <span className="text-gray-300">→</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Current Turn Panel */}
            {currentTurn && (
                <div className={`bg-gradient-to-br ${teamColors[currentTurn - 1]} rounded-2xl p-5 shadow-xl`}>
                    <p className="text-xs text-white/70 uppercase tracking-wider mb-3 font-semibold">🎯 Lượt chơi hiện tại</p>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-3xl shadow-lg border border-white/30">
                            {currentTurn}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white">
                                {teamNames[currentTurn - 1]}
                            </h3>
                            <p className="text-lg text-white/90 font-bold flex items-center gap-2">
                                ⭐ {currentScore} điểm
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Difficulty Selection */}
            {gamePhase === 'selectDifficulty' && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                    <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        📊 Chọn mức độ câu hỏi
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => onSelectDifficulty('easy')}
                            className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="text-2xl mb-1">🟢</div>
                            <div className="text-sm">Dễ</div>
                            <div className="text-xs opacity-80">+1 ô</div>
                        </button>
                        <button
                            onClick={() => onSelectDifficulty('medium')}
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="text-2xl mb-1">🔵</div>
                            <div className="text-sm">Vừa</div>
                            <div className="text-xs opacity-80">+2 ô</div>
                        </button>
                        <button
                            onClick={() => onSelectDifficulty('hard')}
                            className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="text-2xl mb-1">🔴</div>
                            <div className="text-sm">Khó</div>
                            <div className="text-xs opacity-80">+3 ô</div>
                        </button>
                    </div>
                </div>
            )}

            {/* Leaderboard */}
            <Leaderboard
                playerPositions={playerPositions}
                totalTeams={totalTeams}
                teamNames={teamNames}
                teamColors={teamColors}
            />

            {/* Reset Button */}
            <button
                onClick={onResetGame}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
            >
                🔄 Chơi lại từ đầu
            </button>
        </div>
    );
};

export default ControlPanel;
