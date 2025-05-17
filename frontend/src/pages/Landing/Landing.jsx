import React, { useState } from 'react';
import { Button, Dialog, DialogPanel } from '@headlessui/react';
import {
    CalendarDaysIcon,
    UserIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import {
    ChevronDownIcon,
    NewspaperIcon,
    ArrowRightCircleIcon
} from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hotels = ['Гранд Отель', 'Парк Сити', 'Океан Резиденс'];
    const navigate = useNavigate();

    const newsList = [
        {
            title: 'Новый бассейн открыт на крыше',
            date: '15 мая 2025',
            image: 'https://i.pinimg.com/736x/47/76/ee/4776eee3b82a443ad468a3642e4b2ff9.jpg'
        },
        {
            title: 'Приложение обновлено — новые функции',
            date: '10 мая 2025',
            image: 'https://gagadget.com/media/post_big/iOS_18.jpg'
        },
        {
            title: 'Скидки 20% на спа в июне',
            date: '8 мая 2025',
            image: 'https://class-tour.com/wp-content/uploads/9/e/d/9ed9a7354dac81b55ebbcce7f3b99ce7.jpeg'
        }
    ];

    return (
        <div className="min-h-screen bg-sky-950 text-white px-4 py-6 w-full max-w-md mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Умный Отель</h1>
                <Button className="bg-white text-sky-950 font-semibold px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => navigate('/auth')}>
                    <ArrowRightIcon className="w-4 h-4" />
                    Войти
                </Button>
            </div>

            {/* Promo Section */}
            <div className="bg-white/10 p-6 rounded-xl mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Добро пожаловать!</h2>
                <p className="text-sm mb-4">Управляй своим номером прямо с телефона — комфорт, безопасность, инновации.</p>
                <Button
                    onClick={() => navigate('/booking')}
                    className="bg-sky-50 text-sky-950 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
                >
                    Забронировать
                </Button>
            </div>

            {/* News Section */}
            <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                    <NewspaperIcon className="w-5 h-5 " /> Новости отеля
                </h3>
                <div className="space-y-4">
                    {newsList.map((news, idx) => (
                        <div key={idx} className="bg-sky-50 text-sky-950 rounded-lg p-3 flex items-center gap-3">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div className="flex-1 text-sky-950">
                                <div className="text-base font-semibold">{news.title}</div>
                                <div className="text-xs  mt-1">{news.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-white w-full max-w-sm rounded-2xl p-6 text-sky-950">
                        <Dialog.Title className="text-lg font-bold mb-4">Бронирование</Dialog.Title>

                        <div className="space-y-4">
                            {/* Select hotel */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Сеть отелей</label>
                                <select className="w-full rounded-lg border border-gray-300 p-2">
                                    {hotels.map((hotel, i) => (
                                        <option key={i}>{hotel}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Select date */}
                            <div className="flex items-center gap-2">
                                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                />
                            </div>

                            {/* Select guests */}
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-gray-500" />
                                <input
                                    type="number"
                                    min={1}
                                    placeholder="Количество гостей"
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                />
                            </div>

                            {/* Confirm */}
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex justify-center gap-2"
                            >
                                Подтвердить
                                <ArrowRightCircleIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default HomePage;
