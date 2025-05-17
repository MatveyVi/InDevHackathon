import React, { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiThermometer, FiDroplet } from 'react-icons/fi';
import { FaBed } from "react-icons/fa";
import { AdminAPI } from '../../api/admin-api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';

// Components for different views
const RoomStatusCard = ({ room }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Люкс':
        return 'text-purple-600';
      case 'Стандарт':
        return 'text-blue-600';
      case 'Эконом':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold color text-black">{room.name}</h3>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            room.isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {room.isOccupied ? 'Занято' : 'Свободно'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            room.isDoorOpen ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
          }`}>
            Дверь: {room.isDoorOpen ? 'Открыта' : 'Закрыта'}
          </span>
        </div>
      </div>
      {room.image && (
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiThermometer className="mr-2" />
            <span>{room.temperature}°C</span>
          </div>
          <div className="flex items-center">
            <FiDroplet className="mr-2" />
            <span>{room.humidity}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className={`font-medium ${getTypeColor(room.type)}`}>{room.type}</span>
          <span className="font-semibold text-black">{room.price}BYN/ночь</span>
        </div>
      </div>
    </div>
  );
};

const Overview = ({ stats, rooms, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const roomsByType = {
    'Люкс': rooms.filter(r => r.type === 'Люкс').length,
    'Стандарт': rooms.filter(r => r.type === 'Стандарт').length,
    'Эконом': rooms.filter(r => r.type === 'Эконом').length,
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Всего комнат</h3>
          <p className="text-3xl font-bold text-black">{rooms.length}</p>
          <div className="mt-2 text-sm text-black">
            <div>Люкс: {roomsByType['Люкс']}</div>
            <div>Стандарт: {roomsByType['Стандарт']}</div>
            <div>Эконом: {roomsByType['Эконом']}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Занятые комнаты</h3>
          <p className="text-3xl font-bold text-black">{rooms.filter(r => r.isOccupied).length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Свободные комнаты</h3>
          <p className="text-3xl font-bold text-black">{rooms.filter(r => !r.isOccupied).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomStatusCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

const ManageGuests = ({ guests, onRemoveGuest, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  if (!Array.isArray(guests)) {
    return <ErrorMessage message="Нет доступных гостей" />;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest._id} className="text-black">
                <td className="px-6 py-4">{guest.name}</td>
                <td className="px-6 py-4">{guest.phone}</td>
                <td className="px-6 py-4">{guest.role === 'user' ? 'Гость' : 'Администратор'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onRemoveGuest(guest._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageRooms = ({ rooms, bookings, onEditRoom, onDeleteRoom, onCancelBooking, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleDelete = async (roomId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту комнату?')) {
      await onDeleteRoom(roomId);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Вы уверены, что хотите отменить бронирование?')) {
      await onCancelBooking(bookingId);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Комнаты</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дверь</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Температура</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Влажность</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="text-black">
                  <td className="px-6 py-4">{room.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      room.type === 'Люкс' ? 'bg-purple-100 text-purple-800' :
                      room.type === 'Стандарт' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {room.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      room.isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {room.isOccupied ? 'Занято' : 'Свободно'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      room.isDoorOpen ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {room.isDoorOpen ? 'Открыта' : 'Закрыта'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{room.temperature}°C</td>
                  <td className="px-6 py-4">{room.humidity}%</td>
                  <td className="px-6 py-4">{room.price}₽/ночь</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => onEditRoom(room)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-black">Текущие бронирования</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Гость</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Комната</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заезд</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Выезд</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-black">
                  <td className="px-6 py-4">{booking.user.name}</td>
                  <td className="px-6 py-4">{booking.room.name}</td>
                  <td className="px-6 py-4">{format(new Date(booking.from), 'PP')}</td>
                  <td className="px-6 py-4">{format(new Date(booking.to), 'PP')}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Отменить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
    <p>{message}</p>
  </div>
);

export function Admin() {
  const [activeView, setActiveView] = useState('overview');
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeView]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      switch (activeView) {
        case 'overview':
          const roomsData = await AdminAPI.getAllRooms();
          setRooms(roomsData);
          break;
        case 'guests':
          const guestsData = await AdminAPI.getAllUsers();
          setGuests(guestsData || []);
          break;
        case 'rooms':
          const [roomsResult, bookingsResult] = await Promise.all([
            AdminAPI.getAllRooms(),
            AdminAPI.getAllBookings(),
          ]);
          setRooms(roomsResult);
          setBookings(bookingsResult);
          break;
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || 'An error occurred while fetching data');
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveGuest = async (guestId) => {
    try {
      await AdminAPI.deleteUser(guestId);
      toast.success('Guest removed successfully');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove guest');
    }
  };

  const handleEditRoom = async (room) => {
    try {
      // TODO: Implement room editing modal
      toast.info('Room editing coming soon');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to edit room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await AdminAPI.deleteRoom(roomId);
      toast.success('Room deleted successfully');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete room');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await AdminAPI.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Панель управления</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveView('overview')}
            className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 ${
              activeView === 'overview' ? 'bg-gray-100' : ''
            }`}
          >
            <FiHome className="mr-3" /> Обзор
          </button>
          <button
            onClick={() => setActiveView('guests')}
            className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 ${
              activeView === 'guests' ? 'bg-gray-100' : ''
            }`}
          >
            <FiUsers className="mr-3" /> Управление юзерами
          </button>
          <button
            onClick={() => setActiveView('rooms')}
            className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 ${
              activeView === 'rooms' ? 'bg-gray-100' : ''
            }`}
          >
            <FaBed className="mr-3" /> Управление комнатами
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeView === 'overview' && (
          <Overview 
            stats={rooms.length} 
            rooms={rooms} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
        {activeView === 'guests' && (
          <ManageGuests 
            guests={guests} 
            onRemoveGuest={handleRemoveGuest} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
        {activeView === 'rooms' && (
          <ManageRooms
            rooms={rooms}
            bookings={bookings}
            onEditRoom={handleEditRoom}
            onDeleteRoom={handleDeleteRoom}
            onCancelBooking={handleCancelBooking}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;