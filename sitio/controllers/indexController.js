const dbProduct = require("../data/database");

module.exports = {

home:function(req, res, next) {

    let categorias;
    let mostrar;
    let catalogo;

    res.render('index', { 
        title: "Agile Food",
        css:"index",
        usuario: req.session.usuario
    });
    }
}