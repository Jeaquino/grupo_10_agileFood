const { check, validatorResult, body } = require("express-validator");
const db = require('../database/models')

module.exports = [
    check("nombre")
    .isLength({
        min: 1,
        max: 20,
    })
    .withMessage("debe ingresar al menos un caracter y maximo 20"),
    check("precio")
    .isLength({
        min: 1,
    })
    .withMessage("debe ingresar un monto valido no superior a 5 caracteres"),

    check("descuento")
    .isLength({
        min: 1,
        max: 6,
    })
    .withMessage("debe ingresar un monto valido no superior a 6 caracteres"),

    check("stock")
    .isLength({
        min: 1,
        max: 6,
    })
    .withMessage("debe ingresar un monto valido no superior a 6 caracteres"),

    check("descripcion")
    .isLength({
        min: 1,
        max: 200,
    })
    .withMessage("debe ingresar una descripcion valida por favor"),

    check("image")
    .isLength({
        min: 1,
        max: 4,
    })
    .withMessage("debe ingresar una imagen valida"),
]