import api from './api';

export const playerService = {
    getAllPlayers: async () => {
        const response = await api.get('/players/');
        return response.data;
    },

    likePlayer: async (playerId) => {
        const response = await api.post(`/players/${playerId}/like/`);
        return response.data;
    },

    getOverallRanking: async () => {
        const response = await api.get('/players/overall_ranking/');
        return response.data;
    },

    getRankingByPosition: async () => {
        const response = await api.get('/players/ranking_by_position/');
        return response.data;
    },

    getRankingByClub: async () => {
        const response = await api.get('/players/ranking_by_club/');
        return response.data;
    },
};