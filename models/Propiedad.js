const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    direccion: {type: String, required: true},
    localidad: {type: String, required: true},
    precio: {type: Number, required: true},
    tipo: {type: String, required: true},
    operacion: {type: String, required: true},
    superficie: {type: String, required: true},
    dormitorios: {type: Number, required: true},
    baños: {type: Number, required: true},
    descripcion: {type: String, required: true},
    imagen: [{type: String, required: true}]
})

const Propiedad = mongoose.model(
    'propiedades',
    schema
)

module.exports = Propiedad