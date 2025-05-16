import React from 'react';
import {Button, Card, CardHeader, Divider,} from "@heroui/react";

function RoomsCard({name, status, temp, humidity}) {

    return (
        <Card fullWidth radius='md'
              className="flex flex-col transition hover:shadow-md cursor-pointer font-bold w-[380px]  ml-1 bg-[#EFEDCE]" >
            <CardHeader className='justify-between'>
                <div className='flex flex-col w-1/4 text-sky-950 '>

                    <div className='mr-8 '>
                        <p className='text-xl '>Номер: {name}</p>
                    </div>

                    <div className='text-xl'>
                        <p>Температура: {temp}</p>
                    </div>
                    <div className='text-xl'>
                        <p>Влажность: {humidity}</p>
                    </div>


                </div>

                <div className='flex flex-col  w-full ml-36'>

                    <Button
                        className="bg-sky-950 h-11 w-fit text-[#EFEDCE] font-bold  "
                    >
                        Бронировать
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
}

export default RoomsCard;