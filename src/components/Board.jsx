import React from 'react';
import PlayerToken from './PlayerToken';

const Board = ({ playerPositions, currentTurn, totalTeams = 3, turnOrder }) => {
    const totalCells = 25;

    // Special cells: bombs (obstacles) and bonuses - HIDDEN from view
    const specialCells = {
        2: { type: 'bonus', effect: 2, icon: '🎁' },
        6: { type: 'bomb', effect: -1, icon: '💣' },
        11: { type: 'bonus', effect: 2, icon: '🎁' },
        15: { type: 'bomb', effect: -1, icon: '💣' },
        19: { type: 'bonus', effect: 1, icon: '⭐' },
        22: { type: 'bomb', effect: -2, icon: '💣' },
    };

    // Landmark positions on the path
    const landmarks = {
        0: { name: 'Hang Pác Bó', color: 'bg-gradient-to-br from-red-500 to-red-700', emoji: '🏔️' },
        8: { name: 'Tân Trào', color: 'bg-gradient-to-br from-blue-500 to-blue-700', emoji: '🏛️' },
        16: { name: 'Hà Nội', color: 'bg-gradient-to-br from-orange-500 to-orange-700', emoji: '🏙️' },
        24: { name: 'Ba Đình', color: 'bg-gradient-to-br from-amber-500 to-yellow-600', emoji: '🏆' },
    };

    // Define the curved road path positions
    const pathPositions = [
        { left: '18%', top: '8%' },    // 0 - Hang Pác Bó
        { left: '25%', top: '12%' },   // 1
        { left: '33%', top: '14%' },   // 2
        { left: '42%', top: '13%' },   // 3
        { left: '52%', top: '10%' },   // 4
        { left: '62%', top: '12%' },   // 5
        { left: '70%', top: '17%' },   // 6
        { left: '75%', top: '24%' },   // 7
        { left: '72%', top: '32%' },   // 8 - Tân Trào
        { left: '65%', top: '38%' },   // 9
        { left: '55%', top: '40%' },   // 10
        { left: '45%', top: '38%' },   // 11
        { left: '35%', top: '35%' },   // 12
        { left: '28%', top: '40%' },   // 13
        { left: '25%', top: '48%' },   // 14
        { left: '28%', top: '56%' },   // 15
        { left: '35%', top: '62%' },   // 16 - Hà Nội
        { left: '43%', top: '65%' },   // 17
        { left: '50%', top: '62%' },   // 18
        { left: '55%', top: '68%' },   // 19
        { left: '52%', top: '76%' },   // 20
        { left: '45%', top: '82%' },   // 21
        { left: '38%', top: '86%' },   // 22
        { left: '30%', top: '88%' },   // 23
        { left: '22%', top: '92%' },   // 24 - Ba Đình
    ];

    const getPlayersAtPosition = (cellIndex) => {
        return playerPositions
            .map((pos, index) => ({
                groupNumber: index + 1,
                position: pos,
                isActive: index + 1 === currentTurn,
            }))
            .filter((player) => player.position === cellIndex);
    };

    const generateRoadPath = () => {
        if (pathPositions.length < 2) return '';
        let path = `M ${parseFloat(pathPositions[0].left)} ${parseFloat(pathPositions[0].top)}`;
        for (let i = 1; i < pathPositions.length; i++) {
            const curr = pathPositions[i];
            path += ` L ${parseFloat(curr.left)} ${parseFloat(curr.top)}`;
        }
        return path;
    };

    return (
        <div className="bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-2xl shadow-2xl h-full relative overflow-hidden border border-emerald-200">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl top-10 right-10"></div>
                <div className="absolute w-48 h-48 bg-blue-200/30 rounded-full blur-3xl bottom-20 left-10"></div>
                <div className="absolute w-32 h-32 bg-rose-200/30 rounded-full blur-3xl top-1/2 left-1/3"></div>
            </div>

            {/* Road Path SVG */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ zIndex: 1 }}
            >
                {/* Road outer glow */}
                <path
                    d={generateRoadPath()}
                    stroke="rgba(251, 191, 36, 0.3)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Road background */}
                <path
                    d={generateRoadPath()}
                    stroke="#78716C"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Road inner */}
                <path
                    d={generateRoadPath()}
                    stroke="#A8A29E"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Road center line (dashed yellow) */}
                <path
                    d={generateRoadPath()}
                    stroke="#FCD34D"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="2,1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Cells positioned along the path */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
                {Array.from({ length: totalCells }, (_, index) => {
                    const cellNumber = index;
                    const landmark = landmarks[cellNumber];
                    const players = getPlayersAtPosition(cellNumber);
                    const position = pathPositions[cellNumber];
                    const isStart = cellNumber === 0;
                    const isEnd = cellNumber === totalCells - 1;

                    return (
                        <div
                            key={cellNumber}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={position}
                        >
                            <div className="flex flex-col items-center">
                                {/* Main cell circle */}
                                <div
                                    className={`
                                        w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 border-4
                                        ${isStart ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-200' : ''}
                                        ${isEnd ? 'bg-gradient-to-br from-amber-400 to-yellow-500 border-yellow-200' : ''}
                                        ${landmark && !isStart && !isEnd ? `${landmark.color} border-white` : ''}
                                        ${!landmark && !isStart && !isEnd ? 'bg-white border-gray-200 shadow-lg' : ''}
                                    `}
                                >
                                    {isStart && <span className="text-2xl">⭐</span>}
                                    {isEnd && <span className="text-2xl">🏆</span>}
                                    {landmark && !isStart && !isEnd && <span className="text-xl">{landmark.emoji}</span>}
                                    {!landmark && !isStart && !isEnd && (
                                        <span className="text-gray-500 text-sm font-bold">{cellNumber}</span>
                                    )}
                                </div>

                                {/* Landmark label */}
                                {landmark && (
                                    <div className={`mt-2 px-4 py-1.5 rounded-xl shadow-lg text-white text-xs font-bold whitespace-nowrap ${landmark.color}`}>
                                        {landmark.name}
                                    </div>
                                )}

                                {/* Player tokens */}
                                {players.length > 0 && (
                                    <>
                                        {cellNumber === 0 ? (
                                            <div className="absolute top-24 -left-8 flex gap-3 z-30">
                                                {players.map((player) => (
                                                    <PlayerToken
                                                        key={player.groupNumber}
                                                        groupNumber={player.groupNumber}
                                                        position={cellNumber}
                                                        isActive={player.isActive}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="absolute -top-4 -right-4 flex gap-1 flex-wrap max-w-[80px]">
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
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 text-xs z-10 border border-gray-100">
                <p className="font-bold text-gray-700 mb-3">💡 Chú thích:</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-base">❓</span>
                        <span>Có ô bất ngờ trên đường!</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-base">🎁</span>
                        <span>Bonus hoặc 💣 Bom?</span>
                    </div>
                </div>
            </div>

            {/* Turn indicator on board */}
            {currentTurn && (
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Đang chơi</p>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${['from-rose-500 to-red-600', 'from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600'][currentTurn - 1]} flex items-center justify-center text-white font-bold`}>
                                {currentTurn}
                            </div>
                            <span className="font-bold text-gray-700">Nhóm {currentTurn}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;
