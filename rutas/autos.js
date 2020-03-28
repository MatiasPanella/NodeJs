const express=require('express');
//const app=express();
const ruteo = express.Router();
const {check, validationResult} = require ('express-validator');


var coches = [
    {id: 0, company: 'BMW', model: 'X3', year: '2020' },
    {id: 1, company: 'Audi', model: 'A1', year: '2021' },
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022' }
]

ruteo.get('/', (req,res) => {
    res.send(coches)
})
ruteo.get('/:company',(req,res)=>{
    const auto = coches.find(auto => auto.company===req.params.company);
    
    if(!auto){
        res.status(404).send("no hay autos")
    }else{
    res.send(auto);
    }
})

ruteo.post('/', (req, res)=>{
    var autoId=coches.length;
    var aut={
        id: autoId,
        company: req.body.company,
        model: req.body.model, 
        year: req.body.year,
    }
    coches.push(aut);
    res.send(aut);
})


ruteo.post('/3', [
    check('company').isLength({min:3}),
    check('model').isLength({min:3})
],
(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var autoId=coches.length;
    var aut={
        id: autoId,
        company: req.body.company,
        model: req.body.model, 
        year: req.body.year,
    }
    coches.push(aut);
    res.send(aut);
})

ruteo.put('/:id',[
    check('company').isLength({min:3}),
    check('model').isLength({min:3})
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({error:error.array()});
    }
    const at = coches.find(at => at.id === parseInt(req.params.id))
    
    if(!at){
        return res.status(404).send('No Existe el id ingresado')
    }

    at.company=req.body.company
    at.model=req.body.model
    at.year=req.body.year

    res.status(204).send()
})

ruteo.delete('/:id', (req, res)=>{
    const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

    if(!coche){
        return res.status(404).send('El coche con ese ID no esta, no se puede borrar')
    }

    const index = coches.indexOf(coche)
    coches.splice(index,1)
    res.status(200).send('coche borrado')

})



module.exports = ruteo