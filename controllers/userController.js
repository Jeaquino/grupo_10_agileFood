const dbProduct = require("../data/database");

module.exports = {

    listar: function(req,res){
        res.send(dbProduct)    //muestro información de prueba
    },

    detail:function(req, res, next) {

        res.render('login', { 
            css:"style"  
        });
    }
}