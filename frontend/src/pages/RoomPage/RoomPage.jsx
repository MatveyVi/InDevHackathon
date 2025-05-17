import React, { useState } from 'react'
import { Card, CardBody, Button } from '@heroui/react'
import {
    LockClosedIcon,
    LockOpenIcon,
    LightBulbIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/solid'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { ControlAPI } from '../../api/control-api'

function RoomPage() {
    const [curtainOpen, setCurtainOpen] = useState(false);
    const [bathActive, setBathActive] = useState(false);


    const [doorOpen, setDoorOpen] = useState(false)
    const [lightOn, setLightOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleDoorClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;

        try {
            setLoading(true);
            // Update UI state immediately
            const newDoorState = !doorOpen;
            setDoorOpen(newDoorState);

            // Fire and forget the API call
            await ControlAPI.toggleDoor(newDoorState);
        } catch (error) {
            console.error('Failed to toggle door:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLightClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;

        try {
            setLoading(true);
            // Update UI state immediately
            const newLightState = !lightOn;
            setLightOn(newLightState);

            // Fire and forget the API call
            await ControlAPI.toggleLight(newLightState);
        } catch (error) {
            console.error('Failed to toggle light:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="w-[390px] mx-auto min-h-screen bg-sky-950 relative">
                {/* Back Button */}
                <div className="absolute top-6 left-4 z-50">
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-white/80 backdrop-blur-sm text-sky-950 p-2 rounded-full h-1  hover:bg-sky-950/60 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Button>
                </div>

                {/* Header Image */}
                <div
                    className="h-[220px] bg-cover bg-center rounded-b-2xl"
                    style={{
                        backgroundImage:
                            "url('https://yandex-images.clstorage.net/4Hrue7235/08e693DgpN/7ddkuIwh1tbZSZ_sg1FC6qmQHU8-AlzJG8uV3g8fWfWRIV-Vj_hEN-tpbWLNBSS5lBWe71EgnUtICW7cNFAfXamSaabBcMPWmkrbp8sKH__l0E0OAj98qyrxoLAqJWKKuQpiuo-2G2C5KHQwhW1Uq71A260xe9wdK2wWnU0uMl_-xhzm7iHtwNpeldb8XlHX07wFYxYTd4k35IKGGxh1mYUlf6edmgdpuAQ9G5VqXNqbV-WQG1T8FRB-FYJFJzpI5Ow289sI6cD8Ub3Gy1hJwNS8DWkKHnKEEeGLtSA2eImeBn2jnZ0edL0_NSevaEfmvW_ruiBFyAE0TT64ahELTtnnNN7tAcHvwlGe2cR-YsnGmzBCCjdKrxvNiKQONn-PvhR7lrS0B1StCis6i3x45JlA2rwqWO0jKm4LjWsTGWrF4DzE4jPT-MdSm9DXcF7xzIM4ZxQefq455LKJOgpojpobfrejgxlUljMcHYxTZvmtbuqRFlvmBg1eILpXHjZx-MkO9PYQ6t7MR5fSxHlH1eCMDlEIK2ejM-auniU1YJ6aGG-1po8SZ6oVKAKSWFzYlF_jiSNcwAI8ayCfYwITVPngLdj7L8b590W498RpaureuhBQEAlAvzPYloswC3WKlyhCmLy5D32fPjI2hHpl0rRO-7wpcsk3F0cTg0UiKkPw3QfQ4Qro8MJdq9DMVU_u05EwTyIzQqEM3pWCLBtlurEBWaawshpCnQQeI494avqSduWuOWLiAgNpF6BGNytOy-AI3M0O6fv3eq7b5GVq7t6xDWofJVyCIMyLiRoZYJCJI0minKElXJkVFwW_U1LbhWjZpw5C5DgqVzS4fgAVe9P0EufNMMbexF2JxtVWdN3KmBtEOAhigC3ok5UBI2uUggVjupy5E3O1GS4jukNm2KVqzJU5VMgGE2QjnXYxPU_w1Af56TDy1MVJmdbvS3_szoAxZT8idKYt7Iq1ICA')"
                    }}
                >
                    <div className="flex justify-end p-4 text-white">
                        <div className="bg-white text-black text-xs px-2 py-1 rounded-full">Люкс</div>
                    </div>
                </div>

                {/* Sensor Cards */}
                <div className="p-4 flex justify-between">
                    {/* Wi-Fi Card */}
                    <Card className="w-[110px] h-[90px] text-center text-sm flex items-center justify-center">
                        <CardBody className="flex flex-col items-center ">
                            <div className="font-semibold mb-1">Wi-Fi</div>
                            <svg
                                className="w-6 h-6 animate-pulse text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 8.25c5.25-4.5 14.25-4.5 19.5 0M5.25 11.25c3.75-3 10.5-3 14.25 0M8.25 14.25c2.25-1.5 6.75-1.5 9 0M12 18.75h.008v.008H12v-.008z"
                                />
                            </svg>
                        </CardBody>
                    </Card>

                    {/* Temperature */}
                    <Card className="w-[110px] h-[90px] text-center text-sm">
                        <CardBody>
                            <div className="font-semibold justify-center flex">Температура</div>
                            <div className="text-xs mt-1 justify-center flex" >+30.3°C</div>
                        </CardBody>
                    </Card>

                    {/* Humidity */}
                    <Card className="w-[110px] h-[90px] text-center text-sm">
                        <CardBody>
                            <div className="font-semibold justify-center flex">Влажность</div>
                            <div className="text-xs mt-1  justify-center flex">89%</div>
                        </CardBody>
                    </Card>
                </div>

                {/* Controls */}
                <div className="px-4 pb-6 pt-2 grid grid-cols-2 gap-4 ">

                    {/* Door Control */}
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            onClick={handleDoorClick}
                            disabled={loading}
                            className={`${
                                doorOpen ? 'bg-red-600' : 'bg-blue-900'
                            } text-white justify-center font-semibold flex items-center gap-1 px-4 py-2 w-full rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out hover:opacity-90 active:transform active:scale-95`}
                        >
                            {doorOpen ? <LockOpenIcon className="w-5 h-5" /> : <LockClosedIcon className="w-5 h-5" />}
                            <span>{doorOpen ? 'Закрыть' : 'Открыть'}</span>
                        </button>
                        <span className="mt-2 text-sm text-white">Двери</span>
                    </div>

                    {/* Light Control */}
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            onClick={handleLightClick}
                            disabled={loading}
                            className={`${
                                lightOn ? 'bg-yellow-500' : 'bg-blue-900'
                            } text-white  justify-center  font-semibold flex items-center gap-1 px-4 py-2 w-full rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out hover:opacity-90 active:transform active:scale-95`}
                        >
                            <LightBulbIcon className="w-5 h-5" />
                            <span>{lightOn ? 'Выключить' : 'Включить'}</span>
                        </button>
                        <span className="mt-2 text-sm text-white">Свет</span>
                    </div>

                    {/* Curtain Control (только визуальный эффект) */}
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            onClick={() => setCurtainOpen(!curtainOpen)}
                            className={`${
                                curtainOpen ? 'bg-green-600' : 'bg-blue-900'
                            } text-white  justify-center font-semibold flex items-center gap-1 px-4 py-2 w-full rounded-xl transition-colors duration-200 ease-in-out hover:opacity-90 active:transform active:scale-95`}
                        >
                            <span className="w-5 h-5">{curtainOpen ? '🪟' : '🪟'}</span>
                            <span>{curtainOpen ? 'Закрыть' : 'Открыть'}</span>
                        </button>
                        <span className="mt-2 text-sm text-white">Шторы</span>
                    </div>

                    {/* Bath Control (только визуальный эффект) */}
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            onClick={() => setBathActive(!bathActive)}
                            className={`${
                                bathActive ? 'bg-purple-600' : 'bg-blue-900'
                            } text-white  justify-center  font-semibold flex items-center gap-1 px-4 py-2 w-full rounded-xl transition-colors duration-200 ease-in-out hover:opacity-90 active:transform active:scale-95`}
                        >
                            <span className="w-5 h-5">{bathActive ? '🛁' : '🚿'}</span>
                            <span>{bathActive ? 'Выключить' : 'Включить'}</span>
                        </button>
                        <span className="mt-2 text-sm text-white">Ванна</span>
                    </div>

                </div>



                {/* Error Message */}
                {error && (
                    <div className="px-4 mt-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    </div>
                )}

                {/* Dropdown меню */}
                <div className="px-4 mt-4 mb-10">
                    <Card className="bg-white shadow-md rounded-xl p-4">
                        <Menu as="div" className="relative w-full">
                            <Menu.Button className="flex justify-between w-full items-center text-left text-sky-950 font-semibold">
                                Дополнительные услуги
                                <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-600" />
                            </Menu.Button>

                            <Menu.Items className="mt-2 mb-12 bg-white rounded-md shadow-lg p-2 space-y-1 text-sm text-gray-700 w-full max-h-40 overflow-y-auto">
                                {[
                                    'Вызов персонала',
                                    'Заказ еды',
                                    'Запрос уборки',
                                    'Сообщить о неисправности',
                                    'Доп. полотенца',
                                    'Просьба не беспокоить',
                                    'Попросить смену белья',
                                    'Заказать такси',
                                    'Связаться с рецепцией'
                                ].map((item, idx) => (
                                    <Menu.Item key={idx}>
                                        {({ active }) => (
                                            <div className={`${active ? 'text-blue-600' : ''} cursor-pointer px-2 py-1`}>
                                                {item}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default RoomPage
