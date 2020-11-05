const {check,validatorResult,body} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

module.exports = [
    check('email')
    .isLength({
        min:1
    })
    .withMessage('En campo no debe estar vacio'),

    check('email')
    .isEmail()
    .withMessage('Ingrese un email válido'),

    body('email')
    .custom(function (value) {
        return db.usuarios.findOne({
                where: {
                    email: value
                }
            })
            .then(user => {
                if (!user) {
                    withMessage('el mail no se encuentra registrado')
                }
            })
            .catch(() => {
                return Promise.reject('el mail no se encuentra registrado')
            })
    }),

    check('contraseña')
    .isLength({
        min:1
    })
    .withMessage('En campo no debe estar vacio'),

    body('contraseña')
    .custom((value, {
        req
    }) => {
        return db.usuarios.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (!bcrypt.compareSync(value, user.dataValues.contrasena)) { //si no machea la contraseña
                    return Promise.reject('estas mal')
                }
            })
            .catch(() => {
                return Promise.reject('Contraseña incorrecta')
            })
    })

]