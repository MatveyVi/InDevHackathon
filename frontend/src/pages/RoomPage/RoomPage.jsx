import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Button} from '@heroui/react'
import { LockClosedIcon, LightBulbIcon } from '@heroicons/react/24/solid'

function RoomPage(image) {
    return (
        <div className="w-[390px] mx-auto min-h-screen  rounded-t-3xl shadow-lg overflow-hidden">
            {/* Header Image */}
            <div
                className="h-[220px] bg-cover bg-center rounded-b-2xl"
                style={{ backgroundImage: "url('https://yandex-images.clstorage.net/4Hrue7235/08e693DgpN/7ddkuIwh1tbZSZ_sg1FC6qmQHU8-AlzJG8uV3g8fWfWRIV-Vj_hEN-tpbWLNBSS5lBWe71EgnUtICW7cNFAfXamSaabBcMPWmkrbp8sKH__l0E0OAj98qyrxoLAqJWKKuQpiuo-2G2C5KHQwhW1Uq71A260xe9wdK2wWnU0uMl_-xhzm7iHtwNpeldb8XlHX07wFYxYTd4k35IKGGxh1mYUlf6edmgdpuAQ9G5VqXNqbV-WQG1T8FRB-FYJFJzpI5Ow289sI6cD8Ub3Gy1hJwNS8DWkKHnKEEeGLtSA2eImeBn2jnZ0edL0_NSevaEfmvW_ruiBFyAE0TT64ahELTtnnNN7tAcHvwlGe2cR-YsnGmzBCCjdKrxvNiKQONn-PvhR7lrS0B1StCis6i3x45JlA2rwqWO0jKm4LjWsTGWrF4DzE4jPT-MdSm9DXcF7xzIM4ZxQefq455LKJOgpojpobfrejgxlUljMcHYxTZvmtbuqRFlvmBg1eILpXHjZx-MkO9PYQ6t7MR5fSxHlH1eCMDlEIK2ejM-auniU1YJ6aGG-1po8SZ6oVKAKSWFzYlF_jiSNcwAI8ayCfYwITVPngLdj7L8b590W498RpaureuhBQEAlAvzPYloswC3WKlyhCmLy5D32fPjI2hHpl0rRO-7wpcsk3F0cTg0UiKkPw3QfQ4Qro8MJdq9DMVU_u05EwTyIzQqEM3pWCLBtlurEBWaawshpCnQQeI494avqSduWuOWLiAgNpF6BGNytOy-AI3M0O6fv3eq7b5GVq7t6xDWofJVyCIMyLiRoZYJCJI0minKElXJkVFwW_U1LbhWjZpw5C5DgqVzS4fgAVe9P0EufNMMbexF2JxtVWdN3KmBtEOAhigC3ok5UBI2uUggVjupy5E3O1GS4jukNm2KVqzJU5VMgGE2QjnXYxPU_w1Af56TDy1MVJmdbvS3_szoAxZT8idKYt7Iq1ICA')" }}
            >
                <div className="flex justify-between p-4 text-white">
                    <div className="text-lg font-bold">Комната 303</div>
                    <div className="bg-white text-black text-xs px-2 py-1 rounded-full">Люкс</div>
                </div>
            </div>

            {/* Sensor Cards */}
            <div className="p-4 flex justify-between">
                <Card className="w-[110px] h-[90px] text-center text-sm">
                    <CardBody>
                        <div className="font-semibold">Давление</div>
                        <div className="text-xs mt-1">728.9 <strong>мм рт. ст.</strong></div>
                    </CardBody>
                </Card>
                <Card className="w-[110px] h-[90px] text-center text-sm">
                    <CardBody>
                        <div className="font-semibold">Температура</div>
                        <div className="text-xs mt-1">+30.3°C</div>
                    </CardBody>
                </Card>
                <Card className="w-[110px] h-[90px] text-center text-sm">
                    <CardBody>
                        <div className="font-semibold">Влажность</div>
                        <div className="text-xs mt-1">89%</div>
                    </CardBody>
                </Card>
            </div>

            {/* Controls */}
            <div className="px-4 pb-6 pt-2 flex justify-between">
                <div className="flex flex-col items-center">
                    <Button className="bg-blue-900 text-white font-semibold flex items-center gap-1 px-4 py-2 rounded-xl">
                        <LockClosedIcon className="w-5 h-5" />
                        Открыть
                    </Button>
                    <span className="mt-2 text-sm text-white">Двери</span>
                </div>

                <div className="flex flex-col items-center">
                    <Button className="bg-green-600 text-white font-semibold flex items-center gap-1 px-4 py-2 rounded-xl">
                        <LightBulbIcon className="w-5 h-5" />
                        Выключить
                    </Button>
                    <span className="mt-2 text-sm text-white">Свет</span>
                </div>
            </div>
        </div>
    )
}

export default RoomPage;