
const Element = require('../modules/Element')

//READ
function obtenerElements(req, res){
    Element.find()
    .then(data => res.status(200).send(data))
}

//CREATE (POST) 
function crearElement(req, res){

/*     const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    } */
    const info = req.body;
    const elem = new Element(info)
    elem.save()
    .then(data => res.send(data))
}

//DELETE
function eliminarElement(req, res){
    const name = req.body.elementName;
    console.log("Valor a eliminar: "+ name);
    Element.findOneAndDelete({nombre:name})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
}

//put  UPDATE
function modificarElement(req, res){
    const idname = req.params.idElem;
    const nuevaInfo = req.body;
    Element.findByIdAndUpdate(idname, nuevaInfo)
        .then (data =>{
                Element.findById(idname)
                .then((info) => res.send(info))
            })
}

function obtenerElements2(req, res){
    const name = req.params.idElem;
    const query ={
        'elementName': name
        }
        Element.find(query)
        .then(data =>res.status(200).send(data))
}

module.exports = {
    obtenerElements,
    crearElement,
    modificarElement,
    eliminarElement,
    obtenerElements2
}
