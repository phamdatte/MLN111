import React, { useState } from 'react';
import Board from '../components/Board';
import ControlPanel from '../components/ControlPanel';
import QuestionModal from '../components/QuestionModal';
import SpecialCellNotification from '../components/SpecialCellNotification';
import { getRandomQuestion } from '../data/questions';

const Game = () => {
    const totalTeams = 3;
    const totalCells = 25;
    const winningPosition = totalCells - 1;

    const teamNames = ['Nhóm 1', 'Nhóm 2', 'Nhóm 3'];
    const teamColors = ['from-rose-500 to-red-600', 'from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600'];
    const teamBgColors = ['bg-rose-500', 'bg-blue-500', 'bg-emerald-500'];

    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [turnOrderSetup, setTurnOrderSetup] = useState(false); // New: setup phase
    const [turnOrder, setTurnOrder] = useState([]); // Custom turn order
    const [playerPositions, setPlayerPositions] = useState(Array(totalTeams).fill(0));
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0); // Index in turnOrder array
    const [gamePhase, setGamePhase] = useState('selectDifficulty');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentDifficulty, setCurrentDifficulty] = useState(null);
    const [winner, setWinner] = useState(null);
    const [specialCellHit, setSpecialCellHit] = useState(null);
    const [usedQuestionIds, setUsedQuestionIds] = useState([]);

    // Get current team based on turn order
    const currentTurn = turnOrder.length > 0 ? turnOrder[currentTurnIndex] : 1;

    // Special cells
    const specialCells = {
        2: { type: 'bonus', effect: 2 },
        6: { type: 'bomb', effect: -1 },
        11: { type: 'bonus', effect: 2 },
        15: { type: 'bomb', effect: -1 },
        19: { type: 'bonus', effect: 1 },
        22: { type: 'bomb', effect: -2 },
    };

    const handleStartSetup = () => {
        setTurnOrderSetup(true);
    };

    const handleAddToOrder = (teamNum) => {
        if (turnOrder.includes(teamNum)) return;
        setTurnOrder([...turnOrder, teamNum]);
    };

    const handleRemoveFromOrder = (index) => {
        const newOrder = [...turnOrder];
        newOrder.splice(index, 1);
        setTurnOrder(newOrder);
    };

    const handleConfirmOrder = () => {
        if (turnOrder.length === 3) {
            setGameStarted(true);
            setTurnOrderSetup(false);
            setCurrentTurnIndex(0);
            setGamePhase('selectDifficulty');
        }
    };

    const handleNextTurn = () => {
        const nextIndex = (currentTurnIndex + 1) % turnOrder.length;
        setCurrentTurnIndex(nextIndex);
        setGamePhase('selectDifficulty');
    };

    const handleSelectDifficulty = (difficulty) => {
        setCurrentDifficulty(difficulty);
        const question = getRandomQuestion(difficulty, usedQuestionIds);
        setCurrentQuestion(question);
        setUsedQuestionIds(prev => [...prev, question.id]);
        setGamePhase('answering');
    };

    const handleAnswer = (isCorrect) => {
        const playerIndex = currentTurn - 1;
        let newPositions = [...playerPositions];

        if (isCorrect) {
            const moves = currentDifficulty === 'easy' ? 1 : currentDifficulty === 'medium' ? 2 : 3;
            newPositions[playerIndex] = Math.min(newPositions[playerIndex] + moves, winningPosition);

            const newPosition = newPositions[playerIndex];
            if (specialCells[newPosition]) {
                const cellInfo = specialCells[newPosition];
                setSpecialCellHit(cellInfo);

                setTimeout(() => {
                    const effect = cellInfo.effect;
                    const updatedPositions = [...newPositions];
                    updatedPositions[playerIndex] = Math.max(0, Math.min(newPosition + effect, winningPosition));
                    setPlayerPositions(updatedPositions);

                    if (updatedPositions[playerIndex] >= winningPosition) {
                        setWinner(currentTurn);
                    } else {
                        setTimeout(() => {
                            setSpecialCellHit(null);
                            handleNextTurn();
                        }, 1500);
                    }
                }, 100);
            } else {
                setPlayerPositions(newPositions);
                if (newPositions[playerIndex] >= winningPosition) {
                    setWinner(currentTurn);
                } else {
                    handleNextTurn();
                }
            }
        } else {
            setPlayerPositions(newPositions);
            handleNextTurn();
        }

        setCurrentQuestion(null);
        setCurrentDifficulty(null);
    };

    const handleResetGame = () => {
        setPlayerPositions(Array(totalTeams).fill(0));
        setCurrentTurnIndex(0);
        setGamePhase('selectDifficulty');
        setCurrentQuestion(null);
        setCurrentDifficulty(null);
        setWinner(null);
        setGameStarted(false);
        setTurnOrderSetup(false);
        setTurnOrder([]);
        setUsedQuestionIds([]);
    };

    // Start screen - Introduction
    if (!gameStarted && !turnOrderSetup) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -top-48 -left-48"></div>
                    <div className="absolute w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -bottom-48 -right-48"></div>
                    <div className="absolute w-64 h-64 bg-orange-200/40 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full p-10 text-center border border-amber-200/50">
                    <div className="mb-8">
                        <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
                            🎯 THE GREAT RACE - 1945
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-4">
                            HÀNH TRÌNH TỚI ĐỘC LẬP
                        </h1>
                    </div>

                    {/* 3 Teams Display */}
                    <div className="grid grid-cols-3 gap-6 mb-10">
                        {teamNames.map((name, index) => (
                            <div key={index} className={`bg-gradient-to-br ${teamColors[index]} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
                                <div className="text-4xl mb-3">👥</div>
                                <div className="text-white font-bold text-xl">{name}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl mb-10 border border-amber-200">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-3">
                            <span className="text-3xl">📜</span> Luật Chơi
                        </h3>
                        <div className="text-left grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow-sm">
                                <span className="text-2xl">🎮</span>
                                <p className="text-gray-700"><strong className="text-gray-900">3 đội</strong> thi đua đến Quảng trường Ba Đình</p>
                            </div>
                            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow-sm">
                                <span className="text-2xl">🔄</span>
                                <p className="text-gray-700"><strong className="text-gray-900">Tự chọn</strong> thứ tự lượt chơi</p>
                            </div>
                            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow-sm">
                                <span className="text-2xl">📊</span>
                                <div className="text-gray-700">
                                    <p className="mb-2">Độ khó:</p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">Dễ +1</span>
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">Vừa +2</span>
                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">Khó +3</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow-sm">
                                <span className="text-2xl">🎁</span>
                                <div className="text-gray-700">
                                    <p className="mb-2">Ô đặc biệt:</p>
                                    <div className="flex gap-2">
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-semibold">⭐ Bonus</span>
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-semibold">💣 Bom</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartSetup}
                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-black text-2xl py-6 px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                    >
                        🎲 THIẾT LẬP THỨ TỰ
                    </button>
                </div>
            </div>
        );
    }

    // Turn Order Setup Screen
    if (turnOrderSetup && !gameStarted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -top-48 -left-48"></div>
                    <div className="absolute w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -bottom-48 -right-48"></div>
                </div>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-3xl w-full p-10 text-center border border-blue-200/50">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                        🎯 Thiết Lập Thứ Tự Lượt Chơi
                    </h2>

                    {/* Available Teams */}
                    <div className="mb-8">
                        <p className="text-gray-600 mb-4 font-semibold">Chọn thứ tự các đội:</p>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3].map((teamNum) => {
                                const isSelected = turnOrder.includes(teamNum);
                                return (
                                    <button
                                        key={teamNum}
                                        onClick={() => handleAddToOrder(teamNum)}
                                        disabled={isSelected}
                                        className={`w-24 h-24 rounded-2xl font-black text-2xl transition-all duration-300 transform shadow-lg ${isSelected
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-90'
                                                : `bg-gradient-to-br ${teamColors[teamNum - 1]} text-white hover:scale-110 cursor-pointer`
                                            }`}
                                    >
                                        {teamNum}
                                        <div className="text-xs font-normal mt-1">{teamNames[teamNum - 1]}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Turn Order Display */}
                    <div className="mb-8">
                        <p className="text-gray-600 mb-4 font-semibold">Thứ tự lượt chơi:</p>
                        <div className="flex justify-center items-center gap-4 min-h-[100px]">
                            {turnOrder.length === 0 ? (
                                <div className="text-gray-400 italic">Nhấn vào các đội để chọn thứ tự...</div>
                            ) : (
                                turnOrder.map((teamNum, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="relative">
                                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                {index + 1}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromOrder(index)}
                                                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${teamColors[teamNum - 1]} text-white font-black text-xl shadow-lg hover:opacity-80 transition-all`}
                                            >
                                                {teamNum}
                                                <div className="text-xs font-normal">❌</div>
                                            </button>
                                        </div>
                                        {index < turnOrder.length - 1 && (
                                            <span className="text-3xl text-gray-400">→</span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setTurnOrder([])}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all"
                        >
                            🔄 Xóa tất cả
                        </button>
                        <button
                            onClick={handleConfirmOrder}
                            disabled={turnOrder.length !== 3}
                            className={`font-bold py-4 px-12 rounded-xl transition-all transform ${turnOrder.length === 3
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            ✅ Bắt đầu ({turnOrder.length}/3)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Victory screen
    if (winner) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-yellow-300/50 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                    <div className="absolute w-96 h-96 bg-orange-300/50 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
                </div>

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-12 text-center border border-amber-200">
                    <div className="mb-8">
                        <div className="text-9xl mb-6 animate-bounce">🏆</div>
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-6">
                            CHIẾN THẮNG!
                        </h1>
                        <div className={`inline-block bg-gradient-to-r ${teamColors[winner - 1]} px-10 py-4 rounded-2xl shadow-xl mb-4`}>
                            <h2 className="text-4xl font-black text-white">
                                {teamNames[winner - 1]}
                            </h2>
                        </div>
                        <p className="text-xl text-gray-600 mt-4">
                            🎉 Đã hoàn thành hành trình đến Quảng trường Ba Đình!
                        </p>
                    </div>
                    <button
                        onClick={handleResetGame}
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-xl py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        🔄 Chơi Lại
                    </button>
                </div>
            </div>
        );
    }

    // Main game screen - Light theme
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-4">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-2rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 h-full">
                    {/* Board */}
                    <div className="h-full">
                        <Board
                            playerPositions={playerPositions}
                            currentTurn={currentTurn}
                            totalTeams={totalTeams}
                            turnOrder={turnOrder}
                        />
                    </div>

                    {/* Control Panel */}
                    <div className="h-full overflow-y-auto">
                        <ControlPanel
                            currentTurn={currentTurn}
                            onSelectDifficulty={handleSelectDifficulty}
                            onResetGame={handleResetGame}
                            gamePhase={gamePhase}
                            playerPositions={playerPositions}
                            totalTeams={totalTeams}
                            teamNames={teamNames}
                            teamColors={teamColors}
                            turnOrder={turnOrder}
                            currentTurnIndex={currentTurnIndex}
                        />
                    </div>
                </div>
            </div>

            {/* Question Modal */}
            {currentQuestion && gamePhase === 'answering' && (
                <QuestionModal
                    question={currentQuestion}
                    difficulty={currentDifficulty}
                    onAnswer={handleAnswer}
                    currentGroup={currentTurn}
                    teamName={teamNames[currentTurn - 1]}
                    teamColor={teamColors[currentTurn - 1]}
                />
            )}

            {/* Special Cell Notification */}
            {specialCellHit && (
                <SpecialCellNotification
                    type={specialCellHit.type}
                    effect={specialCellHit.effect}
                    onClose={() => setSpecialCellHit(null)}
                />
            )}
        </div>
    );
};

export default Game;
