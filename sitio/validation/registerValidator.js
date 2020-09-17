const { check, validatorResult, body } = require("express-validator");
const userDataBase = require("../data/userDataBase");
/*aca solicito express validator lo requiero de esta forma con la _base de datos_propiamente dicha 
se exporta un array de validaciones _aca abajo_ cada una de ellas*/
module.exports = [
    check("nombre") //checkeo el nombre
    .isLength({
        min: 1
    })
    .withMessage("debes ingresar un nombre real y verdadero"),

    check("apellido") //checkeo el apellido
    .isLength({
        min: 1
    })
    .withMessage("debes ingresar un apellido real y verdadero"),

    body("email") //checkeo el email
    .custom(function(value) {
        console.log(value)

        let usuario = dbUsuario.filter(user => { //filtro la base de datos y asigno resultado a la variable
            return user.email == value //aplico la condicion si cohincide el email que el usuario ingreso en el input con el que esta registrado con anterioridad
        })
        if (usuario == false) {
            return true
        } else {
            return false
        }
    })
    .withMessage("Este email ya esta registrado con exito!!!")
]