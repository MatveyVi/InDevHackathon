import api from "../api";

export const getAvailableRooms = async (from, to) => {
    const res = await api.post('/hotel/all-rooms', {
        from, 
        to
    });
  
    return res.data; // тут будет массив комнат
  };
  