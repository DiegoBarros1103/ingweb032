const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombres', 'invalid.nombres').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.status(400).json({ mensaje: errors.array() });
        }

        const existeDirector = await Director.findOne({ nombres: req.body.nombres})
        if(existeDirector) {
            return res.status(400).send('nombre de director ya existe');
        }
        let director = new Director();
        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;        
        director.fechaActualizacion = new Date;

        director = await director.save();


        res.send(director);
                 

    } catch (error) {
        console.log(error);
    }
    
  });

  router.get('/', async function (req, res) {

        try {

            const directores = await Director.find();
            res.send(directores);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error');
        }

  });

  router.put('/:directorId', [
    check('nombres', 'invalid.nombres').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
            
        }

        let director = await Director.findById(req.params.directorId);
        if(!director) {
            return res.status(400).send('director no existe');

        }
        
        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date;
        

        director = await director.save();

        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el director');
    }


   });

module.exports = router;