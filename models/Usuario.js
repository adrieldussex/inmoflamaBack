const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nickname: {type: String, required: true},
    password: [{type: String, required: true}],
    logged: {type: Boolean, required: true},
})

const Usuario = mongoose.model(
    'usuarios',
    schema
)

module.exports = Usuario