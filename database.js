console.log("I'm Alive");

const mongoose = require("mongoose");

const db = 'BeduShop';
const dbUser = 'lesrac23';
const dbPass = 'Adidas2022'; 

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.g0jumqp.mongodb.net/${db}?retryWrites=true&w=majority`
mongoose.connect(uri);

//Definir esquema, recibe informacion
const ProductoSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    precio: Number,
    cat : {type: String, enum:['Alimentos', 'Bebidas', 'Otros']},
    desc : String
},{
    collection: "Productos",
    timestamps: true
});

function obtenerProductos () {
    const Producto = mongoose.model("Producto", ProductoSchema);
    //Se trae todos los productos y regresa una promesa
    Producto.find().then(data => console.log(data));
}

const Producto = mongoose.model("Producto", ProductoSchema);

function crearProducto(producto){
    const prod = new Producto(producto);
    //regresa una promesa
    prod.save()
    .then( res => console.log(res))
}

const info ={
    nombre: "Sala",
    precio: 600,
    categoria: "Otros",
    desc: "4 sillones"
}

//crearProducto(info);
//obtenerProductos();

function obtenerProdPorPrecio (precio){
    const query ={
        'precio': {
          '$lte': precio
        }
      }
      Producto.find(query).then(data => console.log(data));
}

//obtenerProdPorPrecio(100);

function Agregacion(precio){
    //Para ejecutar agregaciones
    const agr = [[
        {
          '$project': {
            'nombre': 1, 
            'precio': 1, 
            '_id': 0
          }
        }, {
          '$match': {
            'precio': {
              '$lte': precio
            }
          }
        }, {
          '$sort': {
            'precio': -1
          }
        }
      ]]
    Producto.aggregate(agr).then(data => console.log(data));
}

//Agregacion(100);

//UPDATE: Buscar y despues Guardar

