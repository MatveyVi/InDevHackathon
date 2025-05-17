require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/room-model');

async function seedRooms() {
  await mongoose.connect(process.env.DB_URL);

  const rooms = [
    { name: 'Комната: 1', type: 'Эконом',   price: 60,  temperature: 22, humidity: 45, image: 'https://www.emona.ru/upload/iblock/3a6/3a652e7b9a528c8fb442eaab84941574.jpg' },
    { name: 'Комната: 2', type: 'Стандарт', price: 90,  temperature: 20, humidity: 40, image: 'https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg' },
    { name: 'Комната: 3', type: 'Люкс',     price: 130, temperature: 24, humidity: 50, image: 'https://soluxehotelmoscow.com/wp-content/uploads/2022/12/Bedroom-in-Premium-room-Soluxe-Hotel-Moscow.jpg.webp' },
    { name: 'Комната: 4', type: 'Эконом',   price: 60,  temperature: 21, humidity: 42, image: 'https://s.101hotelscdn.ru/uploads/image/hotel_image/660148/4801472.jpg' },
    { name: 'Комната: 5', type: 'Эконом',   price: 60,  temperature: 21, humidity: 42, image: 'https://wellpalaceside.com/wp-content/uploads/2023/05/well-palace-ekonomi-oda-3.jpg' },
    { name: 'Комната: 6', type: 'Люкс',     price: 130, temperature: 21, humidity: 42, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVkL9O9paRpXEdtuSi5hBgm9vlcEf6vQMUQ&s' },
    { name: 'Комната: 7', type: 'Люкс',     price: 130, temperature: 21, humidity: 42, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVkL9O9paRpXEdtuSi5hBgm9vlcEf6vQMUQ&s' },
    { name: 'Комната: 8', type: 'Стандарт', price: 90,  temperature: 21, humidity: 42, image: 'https://static.wixstatic.com/media/9dea3e_bf8ca45f6c7f402fb60fd85a007a0d55~mv2.jpg/v1/fill/w_640,h_484,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9dea3e_bf8ca45f6c7f402fb60fd85a007a0d55~mv2.jpg' },
  ];
  
  
  

  await Room.deleteMany(); // очищаем старые
  await Room.insertMany(rooms);

  console.log('Комнаты успешно добавлены');
  process.exit();
}

seedRooms();
