const dbProduct = require("../data/database");

module.exports = {

    registro:function(req, res, next) {

        res.render('login', { 
            css:"style",
            title:"Registro"  
        });
    },

    login:function(req, res, next) {

        res.render('prueba', { 
            css:"prueba",
            title:"Login"  
        });
    }
}