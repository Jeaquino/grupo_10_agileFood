const bcrypt = require("bcrypt");
const dbUser = require("../data/userDataBase");
const dbProduct = require("../data/database");
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
            title:"Inicio de sesion"  
        });
    },

/* verificarLogin: function (req,res,next){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let usersJSON = fs.readFileSync("dbUsuarios.json")

        }
        else{
            return res.render("login",{errors: errors.erros})
        }

    },*/

    crear:function(req, res, next) {
        
        let ultimoId = 0; 
        dbUser.forEach(user => {
            if (user.id > ultimoId){
                ultimoId = user.id;
            }  
        });

        let usuario = {
            id: ultimoId +1 ,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.calle + " " + req.body.numero,
            detalle: req.body.detalle,
            Localidad:req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña,10), //encripto la contraseña
            categoria: req.body.categoty,
            image:"",
        }

        dbUser.push(usuario);
        fs.writeFileSync("./data/users.json",JSON.stringify(dbUser))
        res.redirect("/")
    },
    productosAdmin : (req,res, next)=>{
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
        res.render('productosAdministrador',{
            css : "productosAdmin",
            title: "Productos Administrador",
            productos:productos,
        })
    }
}