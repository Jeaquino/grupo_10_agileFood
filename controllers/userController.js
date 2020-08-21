const dbProduct = require("../data/database");

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
    }
}