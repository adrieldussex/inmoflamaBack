const Propiedad = require('../models/Propiedad')

const PropiedadController = {
    create: async(req,res) => {
        try {
            await new Propiedad(req.body).save()
            res.status(200).json({
                success: true,
                message: 'Propiedad agregada con éxito'
            })
        } catch(error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'La propiedad no pudo ser agregada'
            })
        }
    },

    read: async(req,res) => {
        const {id} = req.params
        try {
            let propiedad = await Propiedad.findOne({_id:id})
            if (propiedad) {
                res.status(200).json({
                    message: 'Propiedad encontrada',
                    response: propiedad,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se ha encontrado la propiedad',
                    success: false
                })
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: 'Error',
                success: false
            })
        }
    },

    all: async(req,res) => {
        let propiedad
        let query = {}

        if (req.query.direccion) {
            query.direccion = req.query.direccion
        }

        try {
            propiedad = await Propiedad.find(query)
            
            res.json(propiedad)
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'No encontramos ninguna propiedad'
            })
        }
    },

    update: async(req, res) => {
        const {id} = req.params
        try {
            let propiedad = await Propiedad.findOne({_id:id})
            if (propiedad) {
                await Propiedad.findOneAndUpdate({_id:id}, req.body,{new:true})
                res.status(200).json({
                    message: 'Propiedad actualizada',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se pudo encontrar la propiedad',
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error',
                success: false
            })
        }
    },

    destroy: async(req, res) => {
        const {id} = req.params
        try {
            let propiedad = await Propiedad.findOne({_id:id})
            if (propiedad) {
                await Propiedad.findOneAndDelete({_id:id})
                res.status(200).json({
                    message: 'Propiedad eliminada',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'Propiedad no encontrada',
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error',
                success: false
            })
        }
    }
}

module.exports = PropiedadController