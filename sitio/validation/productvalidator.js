const {check,validatorResult,body} = require("express-validator");
const db = require('../database/models')

let regExNombre =  /[\d]+$/g;

module.exports = [
    check("nombre")
    .isLength({
        min: 3,
        max: 100,
    })
    .withMessage("Debe ingresar al menos un caracter y maximo 100"),

    body('nombre')
    .custom((value)=>{
        if(regExNombre.test(value)){
            return true
        }else{
            return false
        }
    }).withMessage("Solo se permiten caracteres alfabeticos"),

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

    body('categoria')
    .custom(function (value) {
        if (value == '0') {
            return false
        }else{
            return true
        }
    }).withMessage("Debe seleccionar una categoria"),

    check("clasificacion")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("clasificacion")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    body('clasificacion')
    .custom(function (value) {
        if (value == '0') {
            return false
        }else{
            return true
        }
    }).withMessage("Debe selecionar una clasificacion"),

    check("stock")
    .isLength({
        min: 1,
    })
    .withMessage("Debe conmpletar este campo"),

    check("stock")
    .isNumeric()
    .withMessage("Solo se aceptab valores numericos"),

    check("descripcion")
    .isLength({
        min: 1,
        max: 300,
    })
    .withMessage("La descripcion no debe estar vacia y no puede superar los 300 caracteres"),

    body('image')
    .custom((value,{req})=>{
        if(!req.files[0]){
            return false
        }else{
            return true
        }
    }).withMessage("Debe seleccionar un archivo"),

    body('image')
    .custom((value,{req})=>{
        if(req.errorValidacionImagen){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permite png, jpg, jpeg, gif")
]