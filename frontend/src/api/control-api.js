import api from '../api';

export const ControlAPI = {
    // Room state
    getRoomState: async () => {
        const response = await api.get('/room-control/state');
        return response.data;
    },

    // Door control
    toggleDoor: async (state) => {
        const response = await api.post('/room-control/door', { state });
        return response.data;
    },

    // Light control
    toggleLight: async (state) => {
        const response = await api.post('/room-control/light', { state });
        return response.data;
    }
};