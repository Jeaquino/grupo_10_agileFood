const bcrypt = require("bcrypt");
const dbUser = require("../data/userDataBase");

module.exports = {

    registro:function(req, res, next) {

        res.render('registroUsuario', { 
            css:"style",
            title:"Registro"  
        });
    },

    login:function(req, res, next) {

        res.render('login', { 
            css:"login",
            title:"Login"  
        });
    },
/*
    crear:function(req, res, next) {

        let usuario = {
            id: 1,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.dirección,
            Localidad:req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña,10), //encripto la contraseña
            categoria: req.body.categoty,
            image:"image/" + id
        }

        dbUser.push(usuario);
        res.redirect("/")
    }*/
}