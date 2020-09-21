const dbProduct = require("../data/database");
const fs = require("fs");
const path = require('path');

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
            css:"detailProducts",
            usuario: req.session.usuario  
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
            usuario: req.session.usuario  
        });
    },

    agregar:function(req, res, next) {

        res.render('formularioAgregarProducto', { 
            title: "Agregar producto",
            css:"formularioAgregarProducto",
            usuario: req.session.usuario  
        });
    },

    carrito:function(req, res, next) {

        res.render('carritoDeCompras', { 
            css:"carritoDeCompras",
            title:"carrito de compras",
            usuario: req.session.usuario  
        });
    },

    crear:function(req, res, next) {
        let ultimoId = 1; 
        dbProduct.forEach(producto => {
            if (producto.id > ultimoId){
                ultimoId = producto.id;
            }  
        });
        let product = {
            id: ultimoId +1,
            name: req.body.nombre,
            price: req.body.precio,
            discount: req.body.discount,
            category:req.body.categoria,
            classification:req.body.clasificacion,
            score:[],
            stock:req.body.stock,
            description: req.body.descripcion,
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }
        dbProduct.push(product);
        fs.writeFileSync(path.join(__dirname, "..", "data", "productsDataBase.json"),JSON.stringify(dbProduct),'utf-8')
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
        res.render("formularioEditarProducto",
        {producto: product,title:"Modificar producto", 
        css:"formularioAgregarProducto",
        usuario: req.session.usuario})             
    },

    edit:function(req, res, next) {
        let idProducto = req.params.id;

        dbProduct.forEach(producto=>{
            if(producto.id == idProducto){
            producto.id = idProducto;
            producto.name = req.body.nombre;
            producto.price = req.body.precio;
            producto.discount = req.body.discount;
            producto.category = req.body.categoria;
            producto.classification = req.body.clasificacion;
            producto.score = [];
            producto.stock = req.body.stock;
            producto.description = req.body.description;
            producto.image = (req.files[0]) ? req.files[0].filename : producto.image
            }
        })
        
        fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"),JSON.stringify(dbProduct))
        res.redirect("/products")
        
    },
    eliminar:function(req,res){
        let idProducto = req.params.id;
        dbProduct.forEach(producto=>{
            if(producto.id == idProducto){
                let aEliminar = dbProduct.indexOf(producto);
                dbProduct.splice(aEliminar,1);
            }
        })
        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProduct));
        res.redirect('/users/administrador')
    }
}