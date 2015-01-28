module.exports = function (app) {
    'use strict';
    var chat = app.controllers.chat;
    app.get('/chat/:email', chat.index);
};