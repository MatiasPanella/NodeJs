const express=require('express');
const app=express();
const car = require('./rutas/autos')

app.use(express.json());
app.use('/api/cars/',car);

const port=process.env.PORT || 3000;
app.listen(port, ()=> console.log("escuchando del puerto "+ port));