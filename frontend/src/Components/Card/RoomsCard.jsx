import React from 'react';
import {Button, Card, CardHeader, Divider,} from "@heroui/react";

function RoomsCard({name, type, price, image}) {

    return (
        <Card
            fullWidth
            radius='md'
            className="relative flex items-center justify-between mb-5 transition hover:shadow-md cursor-pointer font-bold w-[380px] ml-1 bg-cover bg-center h-64 text-white px-4"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Затемнение фона */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md z-0" />

            <CardHeader className="z-10 flex justify-between items-center w-full h-full p-4">
                {/* Левая часть — текст */}
                <div className="flex flex-col space-y-2 w-1/2">
                    <p className="text-xl whitespace-nowrap truncate" style={{ textShadow: '1px 1px 2px black' }}>
                        {name}
                    </p>
                    <p className="text-lg whitespace-nowrap truncate" style={{ textShadow: '1px 1px 2px black' }}>
                        Тип: {type}
                    </p>
                    <p className="text-lg whitespace-nowrap truncate" style={{ textShadow: '1px 1px 2px black' }}>
                        Цена(сут): {price} BYN
                    </p>
                </div>

                {/* Правая часть — кнопка */}
                <div className="flex items-center justify-end w-1/2">
                    <Button className="bg-white h-11 text-blue-950 font-bold">
                        Бронь
                    </Button>
                </div>
            </CardHeader>
        </Card>

    );
}

export default RoomsCard;