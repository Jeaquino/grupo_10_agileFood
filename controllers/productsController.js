const dbProduct = require("../data/database");

module.exports = {

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
    },

    productos:function(req, res, next) {

        let categorias = [];
        let productos = [];
        let seccion; 

        dbProduct.forEach(producto => {
            if (!categorias.includes(producto.category)){
                categorias.push(producto.category)
            }
        })


        categorias.forEach(categoria => {
            seccion = dbProduct.filter(producto =>{
                return producto.category == categoria
            })
            productos.push(seccion);
        })

        res.render('Productos', { 
            title: "Productos",
            categorias:categorias,
            productos:productos,
            css:"Productos",  
        });
    }
}