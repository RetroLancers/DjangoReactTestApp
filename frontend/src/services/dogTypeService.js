import api from './api';

export const dogTypeService = {
    getAll: async () => {
        const response = await api.get('/dog-types/');
        return response.data;
    },
};
