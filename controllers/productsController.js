const dbProduct = require("../data/database");

module.exports = {

    listar: function(req,res){
        res.send(dbProduct)    //muestro información de prueba
    },

    detail:function(req, res, next) {

        let id = req.params.id;

        let productoElegido;

        dbProduct.forEach(producto => {
            if (producto.id==id){
                productoElegido=producto
            }
        })

        let recomendaciones = dbProduct.filter(producto => {
            return producto.category == productoElegido.category 
        })

        res.render('detailProducts', { 
            title: productoElegido.name,
            producto: productoElegido,
            recomendaciones: recomendaciones,
            css:"detailProducts"  
        });
    }
}