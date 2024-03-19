const mongoose = require('mongoose');

const getConnection = async () => {

    
    try {

        const url = 'mongodb://base2:QyX1KyrYhtPwKqb4@ac-qy5y1hj-shard-00-00.lgze9rl.mongodb.net:27017,ac-qy5y1hj-shard-00-01.lgze9rl.mongodb.net:27017,ac-qy5y1hj-shard-00-02.lgze9rl.mongodb.net:27017/peliculas?ssl=true&replicaSet=atlas-7vs9dk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);

        console.log('Su conexion ha sido exitosa');


    } catch (error) {
        console.log(error);
    }  
   
}

module.exports = {
    getConnection,
}
     