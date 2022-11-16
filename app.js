//instanciamos express
const express = require('express');
const mongoose = require('mongoose');

require('./src/config/passport')

const app = express(); 
//Para que nos lo entregue en formato json
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGOURI);

app.use('/v1', require('./src/routes'));


//escucha al puerto 4001
app.listen(process.env.PORT, ()=>{
  console.log("The server is Alive");
});

app.get('/', (req, res)=> res.send('hola Mundo es mi respuesta'));
