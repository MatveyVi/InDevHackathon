import React, { useEffect, useState } from 'react';
import RoomsCard from '../../Components/Card/RoomsCard.jsx';
import { getAvailableRooms } from '../../api/hotel-api.js';
import { Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Booking() {
    const [rooms, setRooms] = useState([]);
    const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const hotels = ['Гранд Отель', 'Парк Сити', 'Океан Резиденс'];

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getAvailableRooms('2025-05-16T10:00:00', '2025-05-16T12:00:00');
                setRooms(data);
            } catch (error) {
                console.error('Ошибка при получении комнат:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleBookClick = (room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    const handleConfirmBooking = () => {
        console.log('Бронирование подтверждено:', {
            room: selectedRoom,
            from: startDate,
            to: endDate,
        });

        setIsBookingModalOpen(false);
        setSelectedRoom(null);
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className="w-full min-h-screen flex justify-center bg-sky-50">
            <div className="w-[390px] px-4 pb-10 flex flex-col items-center">
                {/* Header + Button */}
                <div className="w-full flex flex-col items-center mt-4 mb-5 space-y-2">
                    <p className="font-bold text-2xl text-sky-950 text-center">Booking</p>
                    <button
                        onClick={() => setIsHotelModalOpen(true)}
                        className="bg-white text-sky-950 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center gap-1"
                    >
                        Выбрать отель
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Rooms List */}
                <div className="w-full space-y-4 flex flex-col items-center">
                    {rooms.map((room) => (
                        <RoomsCard key={room.id} {...room} onBook={() => handleBookClick(room)} />
                    ))}
                </div>

                {/* Hotel Selection Modal */}
                <Dialog open={isHotelModalOpen} onClose={() => setIsHotelModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-sky-950/40" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white w-full max-w-sm rounded-2xl p-6 text-blue-600">
                            <Dialog.Title className="text-lg font-bold mb-4 text-center">Выбор сети отелей</Dialog.Title>
                            <label className="block text-sm mb-1 font-medium">Отель</label>
                            <select
                                value={selectedHotel}
                                onChange={(e) => setSelectedHotel(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-2 mb-4 bg-white text-sky-900"
                            >
                                <option value="" disabled>
                                    Выберите отель
                                </option>
                                {hotels.map((hotel, i) => (
                                    <option key={i} value={hotel}>
                                        {hotel}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => setIsHotelModalOpen(false)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
                            >
                                Подтвердить
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>

                {/* Booking Modal */}
                <Dialog open={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-sky-950/40" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white w-full max-w-sm rounded-2xl p-6 text-sky-900">
                            <Dialog.Title className="text-lg font-bold mb-4 text-center text-sky-900">
                                Бронирование комнаты
                            </Dialog.Title>

                            {selectedRoom && (
                                <div className="mb-4 text-sm">
                                    Комната: <strong>{selectedRoom.name || selectedRoom.id}</strong>
                                </div>
                            )}

                            <label className="block text-sm mb-1 font-medium text-sky-900">Даты бронирования</label>
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                isClearable
                                placeholderText="Выберите диапазон дат"
                                className="w-full rounded-lg border border-gray-300 p-2 mb-4 bg-white text-sky-900"
                                calendarClassName="bg-white"
                            />

                            <button
                                onClick={handleConfirmBooking}
                                disabled={!startDate || !endDate}
                                className="w-full bg-sky-950 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                            >
                                Подтвердить бронирование
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default Booking;
