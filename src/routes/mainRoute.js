const express = require('express'), app = express();

// Solicitando controller
const controller = require(__dirname + '/../controllers/treatData.js');

// Anexando controller de tratamento a rota /boleto
app.get('/boleto/:ticket', controller.treatingTicket);

app.get('/boleto', controller.treatingTicket);

// Exportando app
module.exports = app;