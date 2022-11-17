const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const { threadId } = require("worker_threads");

const SchemaUsuario = mongoose.Schema({
    nombre:{type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true, match: [/\S+@\S+\.\S+/, "correo inválido"] , index: true},
    username: {type: String, unique: true, require: true},
    hash: String,//contraseña cifrada
    salt: String,//llave para desifrar
    tarjeta: String,
    tipo: {type: String, enum: ['Vendedor', 'Comprador']},
}, {timestamp: true})
//validación en los campos unique
SchemaUsuario.plugin(UniqueValidator, {message: 'El usuario ya existe'});
//todas las funcionalidades del esquema sin arroy function para construir methods
SchemaUsuario.methods.crearContrasena= function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex")
}

SchemaUsuario.methods.validarContrasena = function(password){
    const pass = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512") 
    .toString("hex") 
    return pass === this.hash 
}

SchemaUsuario.methods.generaJWT = function(){
    const today = new Date();
    const exp = new Date();
    //solo por 60 dias
    exp.setDate(today.getDate() + 60)
//A quien le estoy dando acceso
    return jwt.sign({
        id: this.id,
        username : this.username,
        exp: parseInt(exp.getTime()/1000)
    }, process.env.SECRET)//secret es la llave para cifrarla
}

SchemaUsuario.methods.toAuthJSON = function (){
    return{
        username: this.username,
        email: this.email,
        token: this.generaJWT()//le va a mandar un JWT a cada usuario
    }
}

//Que informacion queremos que vea el usuario
//tambien hay privateData para datos privados

SchemaUsuario.methods.publicData = function(){
    return {
        username: this.username,
        email: this.email,
        nombre: this.nombre,
        tipo: this.tipo
    }
}

const Usuario = mongoose.model("Usuario", SchemaUsuario)
function agregarUsuario(req, res){
    const usuario = new Usuario(req.body)
    const pass = req.body.password
    usuario.crearContrasena(pass);

    usuario.save()
    .then(data => res.status(200).send(data)) 
}

module.exports = Usuario;