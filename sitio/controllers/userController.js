const bcrypt = require("bcrypt");
const dbUser = require("../data/userDataBase");
const fs = require("fs");

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
            title:"Inicio de sesion"  
        });
    },

    crear:function(req, res, next) {
        
        let ultimoId = 0; 
        dbUser.forEach(user => {
            if (user.id > ultimoId){
                ultimoId = user.id;
            }  
        });

        let usuario = {
            id: ultimoId +1 ,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.calle + " " + req.body.numero,
            detalle: req.body.detalle,
            Localidad:req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña,10), //encripto la contraseña
            categoria: req.body.categoty,
            image:"",
        }

        dbUser.push(usuario);
        fs.writeFileSync("./data/users.json",JSON.stringify(dbUser))
        res.redirect("/")
    }
}