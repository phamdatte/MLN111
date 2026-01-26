import React from 'react';

const Leaderboard = ({ playerPositions, totalTeams, teamNames, teamColors }) => {
    const leaderboardData = Array.from({ length: totalTeams }, (_, index) => ({
        teamIndex: index,
        name: teamNames[index],
        color: teamColors[index],
        position: playerPositions[index],
        score: playerPositions[index] * 50,
    }));

    const sortedData = [...leaderboardData].sort((a, b) => b.position - a.position);

    const getRankIcon = (rank) => {
        if (rank === 0) return '🥇';
        if (rank === 1) return '🥈';
        if (rank === 2) return '🥉';
        return rank + 1;
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    🏆 Bảng Xếp Hạng
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{totalTeams} Đội</span>
            </div>

            <div className="space-y-3">
                {sortedData.map((team, index) => (
                    <div
                        key={team.teamIndex}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${index === 0
                                ? `bg-gradient-to-r ${team.color} shadow-lg`
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold ${index === 0 ? 'bg-white/20 text-white' : 'bg-white text-gray-600 shadow-sm'
                                }`}>
                                {getRankIcon(index)}
                            </div>
                            <div>
                                <span className={`font-bold ${index === 0 ? 'text-white text-lg' : 'text-gray-700'}`}>
                                    {team.name}
                                </span>
                                <div className={`text-xs ${index === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                                    Ô {team.position}/24
                                </div>
                            </div>
                        </div>
                        <div className={`text-right ${index === 0 ? 'text-white' : 'text-gray-700'}`}>
                            <div className="text-lg font-black">{team.score}</div>
                            <div className="text-xs opacity-70">điểm</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
