import asyncio
import sys
import json
from bleak import BleakScanner, BleakClient
from controller_pb2 import IdentifyRequest, ControllerResponse, States, GetState

# Settings
BLE_DEVICE_NAME = "ROOM_34"
TOKEN = "GbKZUb0ZU5oTAzun"

# Ensure UTF-8 encoding for stdout and stderr
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

async def find_device():
    try:
        devices = await BleakScanner.discover()
        for device in devices:
            if device.name == BLE_DEVICE_NAME:
                return device.address
        print(json.dumps({
            "status": "error",
            "message": "Device not found in available BLE devices"
        }))
        return None
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Error during device discovery: {str(e)}"
        }))
        return None

async def handle_notification(sender, data):
    try:
        if data == b'\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\x0c\r\x0e':
            print(json.dumps({
                "status": "success",
                "message": "Authentication confirmed"
            }))
            return True

        response = ControllerResponse()
        response.ParseFromString(data)
        
        if response.HasField('status'):
            success = response.status == response.Statuses.Ok
            print(json.dumps({
                "status": "success" if success else "error",
                "message": f"Command {'succeeded' if success else 'failed'}"
            }))
            return success
        
        return False
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Error handling notification: {str(e)}"
        }))
        return False

async def send_command(client, characteristic, state_value, operation):
    try:
        set_state_bytes = b'\x08' + state_value.to_bytes(1, 'little')
        await client.write_gatt_char(characteristic, set_state_bytes)
        # Wait for command to be processed
        await asyncio.sleep(0.5)
        print(json.dumps({
            "status": "success",
            "message": f"Door {operation} command sent successfully"
        }))
        return True
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Failed to send {operation} command: {str(e)}"
        }))
        return False

async def connect_and_control(address):
    client = None
    try:
        if not address:
            return False

        client = BleakClient(address)
        await client.connect()
        
        if not client.is_connected:
            print(json.dumps({
                "status": "error",
                "message": "Failed to connect to device"
            }))
            return False

        # Get characteristics
        ff01_char = "0000ff01-0000-1000-8000-00805f9b34fb"
        ff02_char = "0000ff02-0000-1000-8000-00805f9b34fb"

        # Send authentication
        identify_request = IdentifyRequest()
        identify_request.Token = TOKEN
        await client.write_gatt_char(ff02_char, identify_request.SerializeToString())
        await asyncio.sleep(0.5)

        # Subscribe to notifications
        await client.start_notify(ff01_char, handle_notification)
        await asyncio.sleep(0.5)

        # Send door close command
        success = await send_command(client, ff01_char, States.DoorLockClose, "close")
        
        # Wait for command completion
        await asyncio.sleep(1.0)

        # Cleanup
        await client.stop_notify(ff01_char)
        return success

    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Connection error: {str(e)}"
        }))
        return False
    finally:
        if client and client.is_connected:
            try:
                await client.disconnect()
            except Exception:
                pass

async def main():
    try:
        device_address = await find_device()
        if device_address:
            success = await connect_and_control(device_address)
            if success:
                print(json.dumps({
                    "status": "success",
                    "message": "Door closed successfully"
                }))
            else:
                print(json.dumps({
                    "status": "error",
                    "message": "Failed to close door"
                }))
        else:
            print(json.dumps({
                "status": "error",
                "message": "No compatible device found"
            }))
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": f"Operation failed: {str(e)}"
        }))

if __name__ == "__main__":
    asyncio.run(main())