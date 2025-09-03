import React, { useState, useEffect } from 'react';
import { playerService } from '../services/playerService';

const PlayerListPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const data = await playerService.getAllPlayers();
            setPlayers(data);
        } catch (err) {
            setError('Failed to fetch players.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleLikeToggle = async (playerId) => {
        try {
            // Call the likePlayer service which handles both liking and unliking
            const response = await playerService.likePlayer(playerId);
            // After a successful like/unlike, re-fetch players to update like counts
            fetchPlayers();
        } catch (err) {
            setError('Failed to toggle like status.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading players...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Players</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                    <div key={player.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-medium text-gray-900">{player.name}</h2>
                        <p className="text-sm text-gray-600">Position: {player.position}</p>
                        <p className="text-sm text-gray-600">Club: {player.team}</p>
                        <p className="text-sm text-gray-600">Likes: {player.likes_count}</p>
                        <button
                            onClick={() => handleLikeToggle(player.id)}
                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {/* This text will dynamically change based on whether the user has liked the player. 
                                For now, we'll assume the backend response will implicitly handle this by updating the list. 
                                A more robust solution would involve tracking user's likes on the frontend. */}
                            Like/Unlike
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerListPage;
