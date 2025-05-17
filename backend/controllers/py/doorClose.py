import asyncio
from bleak import BleakScanner, BleakClient
from controller_pb2 import IdentifyRequest, ControllerResponse, States, GetState

# Настройки
BLE_DEVICE_NAME = "ROOM_34"
TOKEN = "GbKZUb0ZU5oTAzun"

async def find_device():
    #print("🔍 [Шаг 1] Начало поиска BLE устройств...")
    devices = await BleakScanner.discover()
    for device in devices:
        if device.name == BLE_DEVICE_NAME:
            #print(f"✅ [Шаг 1] Устройство найдено: {device.name} ({device.address})")
            return device.address
    #print("❌ [Шаг 1] Устройство не найдено")
    return None
    # Ручное создание ClientMessage с set_state
    set_state_bytes = b'\x08' + state_value.to_bytes(1, 'little')
    client_message_bytes = b'\x12' + len(set_state_bytes).to_bytes(1, 'little') + set_state_bytes
    return client_message_bytes

def build_set_state_raw(state_value):
    # Ручное создание SetState без ClientMessage
    return b'\x08' + state_value.to_bytes(1, 'little')

async def send_state_command(client, ff01_char, state_value, action):
    if client.is_connected:
        #print(f"💡 [Шаг] Отправка команды {action} (ClientMessage)...")
        message_bytes = build_set_state_raw(state_value)
        #print(f"✅ [Шаг] Команда {action} (Raw): {message_bytes.hex()}")
        await client.write_gatt_char(ff01_char, message_bytes)




async def handle_notification(sender, data):
    #print(f"📡 [Уведомление] Длина={len(data)}, Hex={data.hex()}")
    if data == b'\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\x0c\r\x0e':
        #print("✅ [Уведомление] Успешная авторизация или подтверждение")
        return True
    try:
        # Пробуем интерпретировать как строку
        try:
            print(f"📋 [Уведомление] Данные как строка: {data.decode('utf-8')}")
        except UnicodeDecodeError:
            print(f"📋 [Уведомление] Данные не строка, сырые байты: {data.hex()}")
        
        # Пробуем десериализовать как ControllerResponse
        response = ControllerResponse()
        response.ParseFromString(data)
        print(f"{response}")
        if response.HasField('status'):
            #print(f"✅ [Уведомление] Статус: {response.status}")
            return response.status == response.Statuses.Ok
        elif response.HasField('state'):
            state = response.state
            #print(f"✅ [Уведомление] Состояние: Свет={state.light_on}, Дверь={state.door_lock}, "
                  #f"Канал 1={state.channel_1}, Канал 2={state.channel_2}, "
                  #f"Температура={state.temperature}, Давление={state.pressure}, "
                  #f"Влажность={state.humidity}")
            return True
        elif response.HasField('info'):
            info = response.info
            #print(f"✅ [Уведомление] Информация: IP={info.ip}, MAC={info.mac}, BLE Name={info.ble_name}, Token={info.token}")
            return True
        else:
            print("⚠️ [Уведомление] Ответ не содержит ожидаемых полей ControllerResponse")
    except Exception as e:
        print(f"❌ [Уведомление] Ошибка десериализации: {e}")
    return False



async def get_state(client, ff01_char):
    if client.is_connected:
        print("🔄 [Шаг] Отправка команды для получения состояния устройства...")

        # Создаем объект GetState (пустое сообщение)
        get_state_message = GetState()

        # Сериализуем в байты
        message_bytes = get_state_message.SerializeToString()  
        #print(f"✅ [Шаг] Команда получения состояния: {message_bytes.hex()}")

        # Отправляем команду через BLE
        await client.write_gatt_char(ff01_char, message_bytes)
        await asyncio.sleep(2)  # Подождем некоторое время для получения ответа

        # Ожидаем уведомления
        #print("📡 [Шаг] Ожидание ответа от устройства...")
        await asyncio.sleep(2)  # Немного подождем, чтобы устройство могло ответить

        # После отправки команды, проверьте, получаете ли данные в `handle_notification`.







async def connect_and_interact(address):
    if not address:
        return
    
    async with BleakClient(address) as client:
        #print(f"📶 [Шаг 2] Подключено к {BLE_DEVICE_NAME}!")

        # Проверка свойств характеристик
        #print("🛠️ [Шаг 3] Проверка характеристик...")
        ff02_char = None
        ff01_char = None
        for service in client.services:
            #print(f"\n🛠️ [Шаг 3] Сервис UUID: {service.uuid}")
            for char in service.characteristics:
                props = [p for p in ['read', 'write', 'notify'] if p in char.properties]
                #print(f"  🔹 [Шаг 3] Характеристика UUID: {char.uuid} ({', '.join(props)})")
                if char.uuid == "0000ff02-0000-1000-8000-00805f9b34fb":
                    ff02_char = char
                elif char.uuid == "0000ff01-0000-1000-8000-00805f9b34fb":
                    ff01_char = char

        if not ff02_char or not ff01_char:
            #print("❌ [Шаг 3] Характеристики не найдены!")
            return

        # Проверка соединения
        if not client.is_connected:
            #print("❌ [Шаг 4] Клиент не подключен!")
            return

        # Авторизация
        #print("🔑 [Шаг 4] Отправка токена авторизации в ff02...")
        identify_request = IdentifyRequest()
        identify_request.Token = TOKEN
        await client.write_gatt_char(ff02_char, identify_request.SerializeToString())
        #print("✅ [Шаг 4] Токен отправлен в ff02")
        #await asyncio.sleep(2.0)

        # Подписка на уведомления
        #print("📡 [Шаг 5] Подписка на уведомления от ff01...")
        await client.start_notify(ff01_char, handle_notification)
        #print("✅ [Шаг 5] Подписка на уведомления ff01 активирована")
        #await asyncio.sleep(2.0)

        await send_state_command(client, ff01_char, States.DoorLockClose,'закрытие замка')     

        #await get_state(client, ff01_char)

        # Отключение подписки
        await client.stop_notify(ff01_char)
        #print("✅ [Шаг 12] Подписка на уведомления ff01 отключена")









async def main():
    #print("🚀 [Шаг 0] Запуск программы...")
    device_address = await find_device()
    if device_address:
        await connect_and_interact(device_address)
    #print("🏁 [Шаг 13] Программа завершена")

if __name__ == "__main__":
    asyncio.run(main())