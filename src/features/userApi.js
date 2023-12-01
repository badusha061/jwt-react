import axios from 'axios';
export const BASE_URL = 'http://localhost:8000/api';

export const userApi = {
    register: async (userData) => {
        try {     
            const response = await axios.post(`${BASE_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (userData) => {
        const response = await axios.post(`${BASE_URL}/token/`,userData)
        return response.data
    }
};
