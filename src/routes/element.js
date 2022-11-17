const routerP = require('express').Router();
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validacion');
const{
    obtenerElements,
    crearElement,
    modificarElement,
    eliminarElement,
    obtenerElements2
} = require('../controllers/elements');

routerP.get('/', obtenerElements)
routerP.post('/',
[check('elementName', 'El nombre completo es obligatorio').not().isEmpty(),
check('expNum', 'El número de expediente es obligatorio').not().isEmpty(),
check('grade', 'El grado policial es obligatorio').not().isEmpty(),
check('grade', 'No es un grado válido').isIn([
    'Guardia Nacional', 
    'Subagente', 
    'Agente',
    'Agente Mayor', 
    'Suboficial', 
    'Oficial', 
    'Segundo Subinspector'])],validarCampos
, crearElement)

routerP.put('/:idElem', modificarElement)
routerP.delete('/', eliminarElement)
routerP.get('/:idElem', obtenerElements2)

module.exports = routerP;
