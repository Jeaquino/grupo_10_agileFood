const {check,validatorResult,body} = require('express-validator');
const bcrypt = require('bcrypt');
const dbUsuarios = require('../data/userDataBase');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingrese un email válido'),

    check('contraseña')
    .isLength(8,18)
    .isAlphanumeric()
    .withMessage('Debes ingresar una contraseña, debe poseer valores alfanuméricos, un minimo de 6 caracteres y un maximo de 18'),

    body('email')
    .custom(function(value){
        let usuario = dbUsuarios.filter(user=>{ //filtro la base de datos y asigno el resultado a una varaible
          return user.email == value //aplico la condición si coincide el mail que el usuario ingresó en el imput con que está registrado
        })
        
        if(usuario == false){ //si no hay resultados
            return false //la validación retorna false, es decir NO PASO LA VALIDACIÓN
        }else{
            return true //la valiación retorna true, es decir VALIDÓ CORRECTAMENTE
        }
    })
    .withMessage('El usuario no está registrado'), //mensaje de error

    body('contraseña')
    .custom((value,{req})=>{
        let result = true;
        dbUsuarios.forEach(user => {
            if(user.email == req.body.email){
                if(!bcrypt.compareSync(value,user.contraseña)){
                    result = false
                }
            }
        });
        if(result == false){
            return false
        }else{
            return true
        }
    })
    .withMessage("Contraseña incorrecta")

]