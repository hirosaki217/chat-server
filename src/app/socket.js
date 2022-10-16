const lastViewService = require('../services/LastViewService');

const socket = (io) => {
    io.on('connect', (socket) => {
        socket.on('disconnect', () => {
            const userId = socket.userId;
            console.log('userid: ', userId, 'is disconnect');
        });
    });
};

module.exports = socket;
