import React, { useState, useEffect } from 'react';
import { playerService } from '../services/playerService';

const PlayerRankingPage = () => {
    const [overallRanking, setOverallRanking] = useState([]);
    const [rankingByPosition, setRankingByPosition] = useState({});
    const [rankingByClub, setRankingByClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for controlling collapse/expand of sections
    const [isOverallCollapsed, setIsOverallCollapsed] = useState(true);
    const [isPositionCollapsed, setIsPositionCollapsed] = useState(true);
    const [isClubCollapsed, setIsClubCollapsed] = useState(true);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                setLoading(true);
                const overall = await playerService.getOverallRanking();
                setOverallRanking(overall);

                const byPosition = await playerService.getRankingByPosition();
                setRankingByPosition(byPosition);

                const byClub = await playerService.getRankingByClub();
                setRankingByClub(byClub);

            } catch (err) {
                setError('Failed to fetch rankings.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Loading rankings...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    const renderPlayerList = (players) => (
        <ul className="space-y-2">
            {players.map((player, index) => (
                <li key={player.id} className="bg-gray-50 p-3 rounded-md shadow-sm flex justify-between items-center">
                    <span>{index + 1}. {player.name} ({player.team} - {player.position})</span>
                    <span className="font-semibold">Likes: {player.likes_count}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Player Rankings</h1>

            {/* Overall Ranking Section */}
            <div className="mb-10 border border-gray-200 rounded-lg shadow-sm">
                <button 
                    className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold text-xl rounded-t-lg flex justify-between items-center"
                    onClick={() => setIsOverallCollapsed(!isOverallCollapsed)}
                >
                    Overall Ranking
                    <span>{isOverallCollapsed ? '+' : '-'}</span>
                </button>
                {!isOverallCollapsed && (
                    <div className="p-4">
                        {renderPlayerList(overallRanking)}
                    </div>
                )}
            </div>

            {/* Ranking by Position Section */}
            <div className="mb-10 border border-gray-200 rounded-lg shadow-sm">
                <button 
                    className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold text-xl rounded-t-lg flex justify-between items-center"
                    onClick={() => setIsPositionCollapsed(!isPositionCollapsed)}
                >
                    Ranking by Position
                    <span>{isPositionCollapsed ? '+' : '-'}</span>
                </button>
                {!isPositionCollapsed && (
                    <div className="p-4">
                        {Object.entries(rankingByPosition).map(([position, players]) => (
                            <div key={position} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="text-xl font-medium mb-3">{position}</h3>
                                {renderPlayerList(players)}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Ranking by Club Section */}
            <div className="mb-10 border border-gray-200 rounded-lg shadow-sm">
                <button 
                    className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold text-xl rounded-t-lg flex justify-between items-center"
                    onClick={() => setIsClubCollapsed(!isClubCollapsed)}
                >
                    Ranking by Club
                    <span>{isClubCollapsed ? '+' : '-'}</span>
                </button>
                {!isClubCollapsed && (
                    <div className="p-4">
                        {Object.entries(rankingByClub).map(([club, players]) => (
                            <div key={club} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="text-xl font-medium mb-3">{club}</h3>
                                {renderPlayerList(players)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerRankingPage;