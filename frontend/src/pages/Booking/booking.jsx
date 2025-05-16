import React, {useEffect, useState} from 'react';
import RoomsCard from "../../Components/Card/RoomsCard.jsx";


function Booking({name, status,temp, humidity}) {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        //setRooms
    }, [])

    return (

        <div className="h-full">
        <div className='items-center justify-center flex mt-2 mb-5  border-spacing-1 h-full font-bold text-2xl' >
            <p className="mt-1  ">Booking</p>
        </div>
       <RoomsCard/>
        </div>

    );
}

export default Booking;