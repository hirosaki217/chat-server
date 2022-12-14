const router = require('express').Router();
const uploadFile = require('../middleware/uploadFile');
const MessageController = require('../controller/MessageController');

const messageRouter = (io) => {
    const messageController = new MessageController(io);

    router.get('/:conversationId', messageController.getList);
    router.post('/text', messageController.addText);
    router.get('/:conversationId/files', messageController.getListFiles);
    router.post('/files', uploadFile.singleUploadMiddleware, messageController.addFile);
    router.post('/multiple/files', uploadFile.multipleUploadMiddleware, messageController.addFiles);
    router.post('/files/base64', messageController.addFileWithBase64);
    router.delete('/:id', messageController.deleteById);
    router.delete('/:id/only', messageController.deleteOnlyMeById);
    router.post('/:id/reacts/:type', messageController.addReaction);
    router.post('/:id/share/:conversationId', messageController.shareMessage);

    return router;
};

module.exports = messageRouter;
