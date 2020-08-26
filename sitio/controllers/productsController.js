const dbProduct = require("../data/database");
const fs = require("fs");

module.exports = {

    detalle:function(req, res, next) {

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
            productos.push({categoria:categoria,
                productos:seccion});
        })

        res.render('Productos', { 
            title: "Productos",
            categorias:categorias,
            productos:productos,
            css:"Productos",  
        });
    },

    agregar:function(req, res, next) {

        res.render('formularioAgregarProducto', { 
            title: "Agregar producto",
            css:"formularioAgregarProducto",  
        });
    },

    carrito:function(req, res, next) {

        res.render('carritoDeCompras', { 
            css:"carritoDeCompras",
            title:"carrito de compras"  
        });
    },

    crear:function(req, res, next) {

        let product = {
            id: 1,
            name: req.body.nombre,
            price: req.body.precio,
            discount: req.body.discount,
            category:req.body.categoria,
            classification:req.body.clasificacion,
            score:[],
            stock:req.body.stock,
            description: req.body.description,
            image:"image/" + req.body.nombre + ".jpg" 
        }
        dbProduct.push(product);
        fs.writeFileSync("./data/productsDataBase.json",JSON.stringify(dbProduct))
        res.redirect("/products")
    },

    form:function(req, res, next) {

        let id = req.params.id

        let product; 
        dbProduct.forEach( producto => {
            if(producto.id == id){
                product = producto
            }
        })
        res.render("formularioEditarProducto",{producto: product,title:"Modificar producto", css:"formularioAgregarProducto"})             
    },

    edit:function(req, res, next) {

        let product = {
            id: 1,
            name: req.body.nombre,
            price: req.body.precio,
            discount: req.body.discount,
            category:req.body.categoria,
            classification:req.body.clasificacion,
            score:[],
            stock:req.body.stock,
            description: req.body.description,
            image:"image/" + req.body.nombre + ".jpg" 
        }
        dbProduct.push(product);
        fs.writeFileSync("./data/productsDataBase.json",JSON.stringify(dbProduct))
        res.redirect("/products")
    },

}