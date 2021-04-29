const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;
app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.put('/clientes', async (req, res) => {
    contador++;
    const {
        nome, endereco, idade, status
    } = req.body;
    clientes[contador] = {
        contador,
        nome,
        endereco,
        idade,
        status
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            contador,
            nome,
            endereco,
            idade,
            status
        },
    });
    res.status(201).send(clientes[contador]);
});

app.delete("/clientes", (req, res, next) =>{
    clientes.forEach(cliente =>{
        if(cliente.contador === req.body.contador){
            const index  = clientes.indexOf(cliente);
            clientes.splice(index,1);
        }
    })
    res.status(201).json(clientes);
});
app.listen(4000, () => {
    console.log('Clientes. Porta 4000');
});