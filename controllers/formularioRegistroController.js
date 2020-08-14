const dbProduct = require("../data/database");

module.exports = {

    detail:function(req, res, next) {

    res.render('formularioregistro', { 
        title: "Registro",
        css:"style",  
    });
    }
}