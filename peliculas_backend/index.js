const express = require('express')
const { getConnection } = require('./db/db-connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();
const host =' 0.0.0.0';
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/genero', require('./router/genero'));
app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora'));
app.use('/tipo', require('./router/tipo'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })