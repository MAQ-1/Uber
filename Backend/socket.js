const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');


let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL || '*'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    console.log('Socket.io initialized and waiting for connections');

    io.on('connection', (socket) => {
        console.log(`Socket connected successfully: ${socket.id}`);
        
        socket.on('join',async (data) => {
            const{userId,userType}=data;
            console.log(`[socket] join event received: userType=${userType}, userId=${userId}, socketId=${socket.id}`);

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(`[socket] user socketId updated: ${userId}`);
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(`[socket] captain socketId updated: ${userId}`);
            }
        });


        socket.on('update-location-captain',async(data)=>{
            const{userId,location} = data;
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, 
                { location:
                     {
                      type: 'Point',
                      coordinates: [location.lng, location.ltd]
                     }
                     });
            console.log(`[socket] captain location updated: ${userId} -> [${location.lng}, ${location.ltd}]`);
        });
            
        


        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

function sendMessageToSocketId(socketId, messageObject) {

    console.log(`sending message to ${socketId}:`, messageObject);
    if (!io) {
        console.error('Socket.io is not initialized');
        return;
    }

    io.to(socketId).emit(messageObject.event, messageObject.data);
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
