const { validationResult } = require('express-validator');
const FlightLog = require('../modules/FlightLog')

//READ (GET)
function obtenerFlightLogs(req, res){
    FlightLog.find()
    .then(data => res.status(200).send(data))
}

//CREATE (POST) 
function crearFlightLog(req, res){
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    }
    const info = req.body;
    const fliglog = new FlightLog(info)
    fliglog.save()
    .then(data => res.send(data))
}

//DELETE
function eliminarFlightLog(req, res){
    const nombre = req.body.fliglogName;
    //console.log("Valor a eliminar: "+ nombre);
    FlightLog.findOneAndDelete({name:nombre})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
}

//put  UPDATE
function modificarFlightLog(req, res){
    const id = req.params.idFlagLog;
    const nuevaInfo = req.body;
    FlightLog.findByIdAndUpdate(id, nuevaInfo)
        .then (data =>{
                FlightLog.findById(id)
                .then((info) => res.send(info))
            })
}


function obtenerFlightLog2(req, res){
    const nombre = req.params.idFlightLog;
    const query ={
        'name': nombre
        }
        FlightLog.find(query)
        .then(data =>res.status(200).send(data))
}

module.exports = {
    obtenerFlightLogs,
    crearFlightLog,
    modificarFlightLog,
    eliminarFlightLog,
    obtenerFlightLog2
}
