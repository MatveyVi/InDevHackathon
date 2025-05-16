import React, { useEffect, useState } from 'react';
import RoomsCard from '../../Components/Card/RoomsCard.jsx';
import { getAvailableRooms } from '../../api/hotel-api.js';

function Booking({ name,  type }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getAvailableRooms('2025-05-16T10:00:00', '2025-05-16T12:00:00');
                setRooms(data); // сохраняем комнаты в состояние
                console.log(rooms);
            } catch (error) {
                console.error('Ошибка при получении комнат:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="h-full">
            <div className="items-center justify-center flex mt-2 mb-5 border-spacing-1 h-full font-bold text-2xl">
                <p className="mt-1">Booking</p>
            </div>
            {rooms.map(room => (
                <RoomsCard key={room.id} {...room} />
            ))}
        </div>
    );
}

export default Booking;
