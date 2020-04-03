const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const ruteo = express.Router();
const { check, validationResult } = require('express-validator');

ruteo.get('/', async (req, res) => {
    const user = await User.find()
    res.send(user)
})
ruteo.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send("no hay usuarios")
    res.send(user)
})

ruteo.post('/', [
    check('name').isLength({ min: 3 }),
    check('lastName').isLength({ min: 3 }),
    check('password').isLength({ min: 3 }),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashPasword = await bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPasword
    })
    const result = await user.save()
    res.status(201).send(result)
})

ruteo.put('/:id', [
    check('name').isLength({ min: 3 }),
    check('lastName').isLength({ min: 3 }),
    check('password').isLength({ min: 3 }),
    check('email').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = await user.findByIdandUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.lastName,
        password: req.body.password
    },
        {
            new: true
        })

    if (!user) {
        return res.status(404).send('No Existe el id ingresado')
    }

    res.status(204).send()
})

ruteo.delete('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).send('El coche con ese ID no esta, no se puede borrar')
    }


    res.status(200).send('usuario borrado')

})



module.exports = ruteo