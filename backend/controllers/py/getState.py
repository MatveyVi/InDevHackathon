import asyncio
from bleak import BleakScanner, BleakClient
from controller_pb2 import IdentifyRequest, ControllerResponse, States, GetState

# Настройки
BLE_DEVICE_NAME = "ROOM_34"
TOKEN = "GbKZUb0ZU5oTAzun"

async def find_device():
    devices = await BleakScanner.discover()
    for device in devices:
        if device.name == BLE_DEVICE_NAME:
            return device.address
    return None

async def handle_notification(sender, data):
    if data == b'\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\x0c\r\x0e':
        return True
    try:
        response = ControllerResponse()
        response.ParseFromString(data)
        
        if response.HasField('state'):
            state = response.state
            print(json.dumps({
                'doorOpen': state.door_lock == States.DoorLockOpen,
                'lightOn': state.light_on == States.LightOn,
                'temperature': state.temperature,
                'humidity': state.humidity
            }))
            return True
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
    return False

async def get_state(client, characteristic):
    get_state_msg = GetState()
    await client.write_gatt_char(characteristic, get_state_msg.SerializeToString())

async def main():
    try:
        address = await find_device()
        if not address:
            print(json.dumps({
                'doorOpen': False,
                'lightOn': False,
                'temperature': 0,
                'humidity': 0,
                'error': 'Device not found'
            }))
            return

        async with BleakClient(address) as client:
            # Get the characteristic for notifications
            ff01_char = "0000ff01-0000-1000-8000-00805f9b34fb"
            
            # Subscribe to notifications
            await client.start_notify(ff01_char, handle_notification)
            
            # Send identify request
            identify_msg = IdentifyRequest()
            identify_msg.Token = TOKEN
            await client.write_gatt_char(ff01_char, identify_msg.SerializeToString())
            
            # Get current state
            await get_state(client, ff01_char)
            
            # Wait briefly for response
            await asyncio.sleep(1.0)
            
            # Cleanup
            await client.stop_notify(ff01_char)

    except Exception as e:
        print(json.dumps({
            'doorOpen': False,
            'lightOn': False,
            'temperature': 0,
            'humidity': 0,
            'error': str(e)
        }))

if __name__ == "__main__":
    import json
    import sys
    asyncio.run(main()) 