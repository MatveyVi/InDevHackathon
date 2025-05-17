import api from "../api";

export const getAvailableRooms = async (from, to) => {
    const res = await api.post('/hotel/all-rooms', {
        from, 
        to
    });
  
    return res.data; // тут будет массив комнат
  };


//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [rooms, setRooms] = useState([]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!from || !to) return alert("Выберите обе даты");

//     const res = await getAvailableRooms(from, to);
//     setRooms(res);
//   };