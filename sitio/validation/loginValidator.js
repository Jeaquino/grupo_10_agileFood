const {check,validatorResult,body} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingrese un email válido'),

    check('contraseña')
    .isLength(8,18)
    .isAlphanumeric()
    .withMessage('Debes ingresar una contraseña con un minimo de 8 caracteres y un maximo de 18'),

    check('contraseña')
    .isAlphanumeric()
    .withMessage('Debe poseer valores alphanumericos'),

    body('email')
    .custom(function(value){
        return db.usuarios.findOne({
            where:{
                email:value
            }
        })
        .then(user => {
            if(!user){
                return Promise.reject('Email no registrado')
            }
        })
        .catch( error => {
            res.send(error)
        })
    }),

    body('contraseña')
    .custom((value,{req})=>{
        return db.usuarios.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value,user.dataValues.contrasena)){ //si no machea la contraseña
                return Promise.reject('estas mal')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales inválidas')
        })
    })

]