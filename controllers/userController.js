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
            title:"Login"  
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
            id: 2,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.calle + " " + req.body.enumeracion + " " + req.body.detalle,
            Localidad:req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña,10), //encripto la contraseña
            categoria: req.body.categoty,
            image:"image/" + req.body.nomnbre + ".jpg"
        }

        dbUser.push(usuario);
        fs.writeFileSync("./data/users.json",JSON.stringify(dbUser))
        res.send(usuario)
    }
}