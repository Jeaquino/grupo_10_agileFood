const { check, validatorResult, body } = require("express-validator");
const db = require('../database/models')

module.exports = [
    check("nombre")
    .isLength({
        min: 1,
        max: 100,
    })
    .withMessage("debe ingresar al menos un caracter y maximo 100"),

    check("nombre")
    .isAlpha()
    .withMessage("Solo se aceptan letras"),

    check("precio")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("precio")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("descuento")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("descuento")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("categoria")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("categoria")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("clasificacion")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("clasificacion")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("stock")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("stock")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("descripcion")
    .isEmpty()
    .withMessage("Debe conmpletar este campo"),

    check("descripcion")
    .isLength({
        min: 1,
        max: 300,
    })
    .withMessage("La descripcion no puede superar los 300 caracteres"),
]