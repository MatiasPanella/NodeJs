const express=require('express');
const app=express();
const car = require('./rutas/autos')
const user = require('./rutas/user')

app.use(express.json());
app.use('/api/users/', user)
app.use('/api/cars/',car);

const port=process.env.PORT || 3000;
app.listen(port, ()=> console.log("escuchando del puerto "+ port));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user_admin:adminadmin@test-olza1.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log("conectaod a bd"))
        .catch(()=> console.log("no se conecto a bd"))