/*[models]el modelo debe comenzar en mayuscula y luego en singular
[Producto.js]
Si Quiero hacer un modelo para los usuraios exportar la funcionalidad de la base de datos,
se crea el archivo (usuario) dentro de la carpata (models)
el modelo exporta 2 parametros
1)exporta (sequelize)
2)son los tipo de base de datos y en a este paso lo llamamos(dataTypes)
luego se le asigna una (const) en este caso (let) y se debe usar el nombre de la tabla en plural (usuarios)
*/
module.exports = (sequelize, dataTypes) => {
    let alias = "productos"; //se estila el nombre del modelo en plural y se estila..
    let cols = { //----------el nombre de columnas de un [objeto literal] por ultimo vamos a tener una configurac
        // en la linea 48
        idProducto: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, //clave primaria
            autoIncremet: true //auto incremental
        },
        nombre: {
            type: dataTypes.STRING(100) //el nombre sera un string de no mas de 100 caracteres
        },
        precio: {
            type: dataTypes.DECIMAL(10, 2) //el precio sera decimal con 10 caracteres y 2 caracteres para el decimo
        },
        descuento: {
            type: dataTypes.INTEGER(2) //sera de dos digitos el descuento
        },
        idCategoria: {
            type: dataTypes.INTEGER(11),
        },
        idClasificacion: {
            type: dataTypes.INTEGER(11),
        },
        puntaje: {
            type: dataTypes.DECIMAL(2, 2)
        },
        stock: {
            type: dataTypes.INTEGER(11)
        },
        descripcion: {
            type: dataTypes.STRING(300)
        },
        imagen: {
            type: dataTypes.STRING(100)
        },
    };

    let config = {
        tableName: "productos", //hace alucion a el nombre de la tabla
        timestamps: false //fecha de creacion y actualizacion de los registros
            //si no tiene timestamps va a fallar la base de datos..por eso se pone false por que no se usa
    }

    let Producto = sequelize.define(alias, cols, config) //aca se [cierra el modelo d base d datos con las 3 alias]
        //-------------------------------alias,cols,config
        //-----------------Asociacion de Producto con categorias y clasificaciones---------------------------
    Producto.associate = function(models) {

        Producto.belongsTo(models.categorias, {
            as: "categorias",
            foreignKey: "idCategoria", //clave foranea
        })
        Producto.belongsTo(models.clasificaciones, {
            as: "clasificaciones",
            foreignKey: "idClasificacion", //clave foranea
        })

        Producto.belongsToMany(models.usuarios, { //producto se relaciona a muchos usuarios
            as: 'usuarios', //de usuarios
            through: "carritos",
            foreignKey: "idUsuario", //clave foranea
            otherKey: "idProducto",
            timestamps: false //fecha de creacion y actualizacion de los registros
                //si no tiene timestamps va a fallar la base de datos
        })
    }

    return Producto //retorna producto

}