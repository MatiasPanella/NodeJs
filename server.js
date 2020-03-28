const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://user_admin:adminadmin@test-olza1.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log("conectaod a bd"))
        .catch(()=> console.log("no se conecto a bd"))

const autos = new Schema({
    marca:{
        type: String
    },
    modelo:{
        type: String
    },
    anio:{
        type: Number
    }
})

const autoss=mongoose.model('Autos', autos)

//creaAuto()
obtenerAuto()
async function obtenerAuto(){
    const aut=await autoss.find()
    console.log(aut)
}
async function creaAuto(){
    const at=new autoss({
        marca: 'VW',
        modelo: 'Gol Trend',
        anio: 2019
        
    })
    const resultado = await at.save()
    console.log(resultado)
}

