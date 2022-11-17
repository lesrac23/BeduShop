const routerP = require('express').Router();
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validacion');
const{
    obtenerFlightLogs,
    crearFlightLog,
    modificarFlightLog,
    eliminarFlightLog,
    obtenerFlightLog2
} = require('../controllers/flightlogs');

routerP.get('/', obtenerFlightLogs)
routerP.post('/',
[check('longitude', 'La longitud es obligatoria').not().isEmpty(),
check('latitude', 'La latitud es obligatoria').not().isEmpty(),
check('name', 'El nombre de la alcaldia/municipio es obligatorio').not().isEmpty()],validarCampos
, crearFlightLog)

routerP.put('/:idFlagLog', modificarFlightLog)
routerP.delete('/', eliminarFlightLog)
routerP.get('/:idFlightLog', obtenerFlightLog2)

module.exports = routerP;
