const lastViewService = require('../services/LastViewService');

const socket = (io) => {
    io.on('connect', (socket) => {
        socket.on('disconnect', () => {
            const userId = socket.userId;
            console.log(userId, 'is disconnected');
        });

        socket.on('join', (userId) => {
            socket.userId = userId;
            console.log(`user: ${userId} is join to socket`);
            socket.join(userId);
        });

        socket.on('join-conversations', (conversationIds) => {
            conversationIds.forEach((id) => socket.join(id));
        });

        socket.on('join-conversation', (conversationId) => {
            socket.join(conversationId);
        });
        socket.on('typing', (conversationId, me) => {
            socket.to(conversationId).emit('typing', conversationId, me);
        });

        socket.on('not-typing', (conversationId, me) => {
            socket.to(conversationId).emit('not-typing', conversationId, me);
        });
    });
};

module.exports = socket;
