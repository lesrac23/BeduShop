const mongoose = require("mongoose");

  const ElementSchema = mongoose.Schema({
    elementName : {type: String, require: true},
    expNum : {type: Number, require: true, unique: true},
    contactNumer : Number,
    rfc : {type: String, unique: true},
    grade : {type: String , require: true, enum: ['Guardia Nacional', 'Subagente', 'Agente',
'Agente Mayor', 'Suboficial', 'Oficial', 'Segundo Subinspector']}},
{
    collection: 'Elements'
});

    const Element = mongoose.model("Element", ElementSchema);

    module.exports= Element
    