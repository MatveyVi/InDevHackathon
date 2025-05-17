const { spawn } = require('child_process');
const path = require('path');

class RoomControlController {
    async toggleLight(req, res) {
        try {
            const { state } = req.body;
            const scriptName = state ? 'lightOn.py' : 'lightOff.py';
            const scriptPath = path.join(__dirname, 'py', scriptName);
            
            const pythonProcess = spawn('python', [scriptPath]);
            
            // Just send success immediately - let the UI handle the state
            res.json({ success: true });
            
        } catch (error) {
            console.error('Light control error:', error);
            res.status(500).json({ success: false });
        }
    }

    async toggleDoor(req, res) {
        try {
            const { state } = req.body;
            const scriptName = state ? 'doorOpen.py' : 'doorClose.py';
            const scriptPath = path.join(__dirname, 'py', scriptName);
            
            const pythonProcess = spawn('python', [scriptPath]);
            
            // Just send success immediately - let the UI handle the state
            res.json({ success: true });
            
        } catch (error) {
            console.error('Door control error:', error);
            res.status(500).json({ success: false });
        }
    }

    async getRoomState(req, res) {
        // Since we're not tracking state, just return default values
        res.json({
            success: true,
            state: {
                doorOpen: false,
                lightOn: false
            }
        });
    }
}

module.exports = new RoomControlController(); 