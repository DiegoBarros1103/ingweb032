const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombreProductora', 'invalid.nombreProductora').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.status(400).json({ mensaje: errors.array() });
        }

        const existeProductora = await Productora.findOne({ nombreProductora: req.body.nombreProductora})
        if(existeProductora) {
            return res.status(400).send('nombre de productora ya existe');
        }
        let productora = new Productora();
        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;        
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();


        res.send(productora);
                 

    } catch (error) {
        console.log(error);
    }
    
  });

  router.get('/', async function (req, res) {

        try {

            const productoras = await Productora.find();
            res.send(productoras);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error');
        }

  });

  router.put('/:productoraId', [
    check('nombreProductora', 'invalid.nombreProductora').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
            
        }

        let productora = await Productora.findById(req.params.productoraId);
        if(!productora) {
            return res.status(400).send('productora no existe');

        }
        
        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        

        productora = await productora.save();

        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la productora');
    }


   });

module.exports = router;