import React, { useState } from 'react'
import { Card, CardBody, Button } from '@heroui/react'
import {
    LockClosedIcon,
    LockOpenIcon,
    LightBulbIcon,
} from '@heroicons/react/24/solid'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function RoomPage() {
    const [doorOpen, setDoorOpen] = useState(false)
    const [lightOn, setLightOn] = useState(false)

    const toggleDoor = () => setDoorOpen(prev => !prev)
    const toggleLight = () => setLightOn(prev => !prev)

    return (
        <div className="w-[390px] mx-auto min-h-screen bg-sky-950 flex flex-col overflow-y-auto py-4">

            {/* Header Image */}
            <div
                className="mb-8 h-[220px] bg-cover bg-center rounded-b-2xl"
                style={{
                    backgroundImage:
                        "url('https://avatars.mds.yandex.net/get-altay/13797017/2a0000019247706ad4671b0ca7b68f69fb91/XXXL')",
                }}
            >
                <div className="flex justify-between p-4 text-white shadow-md">
                    <div className="text-lg font-bold">Комната 303</div>
                    <div className="bg-white text-sky-950 text-xs px-2 font-bold py-1 rounded-full">Люкс</div>
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
                        <div className="font-semibold">Температура</div>
                        <div className="text-xs mt-1">+30.3°C</div>
                    </CardBody>
                </Card>

                {/* Humidity */}
                <Card className="w-[110px] h-[90px] text-center text-sm">
                    <CardBody>
                        <div className="font-semibold">Влажность</div>
                        <div className="text-xs mt-1">89%</div>
                    </CardBody>
                </Card>
            </div>

            {/* Controls */}
            <div className="px-4 pb-2 pt-2 flex justify-between">
                {/* Door Control */}
                <div className="flex flex-col items-center">
                    <Button
                        onClick={toggleDoor}
                        className={`${
                            doorOpen ? 'bg-red-600' : 'bg-blue-900'
                        } text-white font-semibold flex items-center gap-1 px-4 py-2 rounded-xl`}
                    >
                        {doorOpen ? (
                            <LockOpenIcon className="w-5 h-5" />
                        ) : (
                            <LockClosedIcon className="w-5 h-5" />
                        )}
                        {doorOpen ? 'Закрыть' : 'Открыть'}
                    </Button>
                    <span className="mt-2 text-sm text-white">Двери</span>
                </div>

                {/* Light Control */}
                <div className="flex flex-col items-center">
                    <Button
                        onClick={toggleLight}
                        className={`${
                            lightOn ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'
                        } font-semibold flex items-center gap-1 px-4 py-2 rounded-xl`}
                    >
                        <LightBulbIcon className="w-5 h-5" />
                        {lightOn ? 'Включено' : 'Выключено'}
                    </Button>
                    <span className="mt-2 text-sm text-white">Свет</span>
                </div>
            </div>

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
    )
}

export default RoomPage
