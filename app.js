// Declarando Variáveis
const express = require('express'), app = express()

// Requisitando a rota principal
const mainRoute = require(__dirname + '/src/routes/mainRoute.js')

// Setando rotas
app.use(mainRoute);

// Tratando erros de rota
app.use((req, res, next) => {
    res.status(404).json({ 
        mensagem: `Rota não encontrada, use GET http://localhost:8080/boleto/CODIGO_DE_BARRAS`, 
        status: 404
    })
})

// Iniciando Aplicação
app.listen(8080, console.log(`Servidor Rodando na porta 8080`))