const { Schema, model } =  require('mongoose');

const MediaSchema = Schema({

    serial: { type: String, requierd: true, unique: true },
    titulo: { type: String, requeired: true },
    sinopsis: { type: String, requeired: true },
    urlPelicula: {type: String, requierd: true },
    foto:  {type: String, requierd: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true },
    añoEstreno: { type: Number, required: true },
    genero: {type: Schema.Types.ObjectId, ref: 'genero', reequired: true },
    director: {type: Schema.Types.ObjectId, ref: 'director', required: true },
    productora: {type: Schema.Types.ObjectId, ref: 'productora', reequired: true },
    tipo: {type: Schema.Types.ObjectId, ref: 'tipo', reequired: true }
});

module.exports = model('Media', MediaSchema);

  