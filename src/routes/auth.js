//recuperar jwt
const {expressjwt : jwt} = require('express-jwt')
//const jwt =require('express-jwt')
//middelware punto intermedio de autenticacion
function getTokenFromHeader(req){
    const aut = req.headers.authorization
    const auSplit = aut.split(' ')
    if(aut && auSplit[0] ==='Token'||
    aut && auSplit[0]==='Bearer')
    return auSplit[1]
    return null
}
//Cuakes de mis end points 
const auth ={
    requerido: jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        useProperty: 'usuario',
        getToken: getTokenFromHeader
    }),
    opcional: jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        useProperty: 'usuario',
        getToken: getTokenFromHeader,
        credentialsRequired: false
    })
}

module.exports = auth