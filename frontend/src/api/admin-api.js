import api from '../api';

export const AdminAPI = {
  // Room management
  getAllRooms: async () => {
    const response = await api.get('/admin/rooms');
    console.log('Rooms data:', response.data);
    return response.data;
  },

  updateRoom: async (roomId, data) => {
    const response = await api.put(`/admin/rooms/${roomId}`, data);
    return response.data;
  },

  deleteRoom: async (roomId) => {
    const response = await api.delete(`/admin/rooms/${roomId}`);
    return response.data;
  },

  // Booking management
  getAllBookings: async () => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/admin/bookings/${bookingId}`);
    return response.data;
  },

  // User management
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Statistics
  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
}; 