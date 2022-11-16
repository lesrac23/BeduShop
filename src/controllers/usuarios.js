const Usuario = require('../modules/Usuario');
const passport = require('passport');

function login (req, res){
    const email = req.body.email;
    const password = req.body.password;

        passport.authenticate('local', {session: false}, (err, user, info) =>{
            if(err) {
                console.log(err);
                
                return res.send(err)
            }
            if(user){
                user.token = user.generaJWT();
                return res.json({user: user.toAuthJSON()});
            }
            else
                return res.status(422).json(info)
        })(req, res)
    /* Usuario.findOne({username:user})
    .then (usuario=>{
        if (usuario.validarContrasena (pass))
            res.status(200).send(usuario.toAuthJSON())
        else
            res.status(401).send("Usuario o contraseña incorrectos")
    }) */
}

function agregarUsuario(req, res){
    const usuario = new Usuario(req.body)
    const pass = req.body.password
console.log(pass);
    usuario.crearContrasena(pass);
    usuario.save()
    .then(data => res.status(200).send(data.publicData()))
}

//del usuario que se logueo al sistema
function obtenerUsuarios(req, res){
    if(!req.auth)
        res.sendStatus(401)
    Usuario.findById(req.auth.id)
    .then(user =>{
        res.send(user.publicData())
    })
}

module.exports={
    login,
    agregarUsuario,
    obtenerUsuarios
}