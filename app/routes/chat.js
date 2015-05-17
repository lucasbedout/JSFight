var Message = require('../models/message');

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('message', function (from, msg) {

            var message = new Message({sender: from, content: msg});

            message.save(function(err) {
                if (err)
                    throw err;
                io.sockets.emit('broadcast', { content: msg, sender: from });
            });
        });
    });
};