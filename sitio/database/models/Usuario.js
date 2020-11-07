/*[models]el modelo debe comenzar en mayuscula y luego en singular
[Usuario.js]
Si Quiero hacer un modelo para los usuraios exportar la funcionalidad de la base de datos,
se crea el archivo (usuario) dentro de la carpata (models)
el modelo exporta 2 parametros
1)exporta (sequelize)
2)son los tipo de base de datos y en a este paso lo llamamos(dataTypes)
luego se le asigna una (const) en este caso (let) y se debe usar el nombre de la tabla en plural (usuarios)
*/
module.exports = (sequelize, dataTypes) => {
    let alias = "usuarios"; //se estila el nombre del modelo en plural y se estila
    let cols = { //----------el nombre de columnas de un [objeto literal] por ultimo vamos a tener una configurac
        //linea 57 aprox
        idUsuario: {
            type: dataTypes.INTEGER(11), //el tipo de columna  de base de datos
            allowNull: true,
            autoIncremet: true, //autoincremental
            primaryKey: true, //clave primaria
        },
        nombre: {
            type: dataTypes.STRING(100), //el tipo de dato es un STRING y asi se restringue que no sea un numero
            allowNull: false,
        },
        apellido: {
            type: dataTypes.STRING(100), //el tipo de dato es un STRING y asi se restringue que no sea un numero
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "Por más que seas un experimento y tengas un codigo de barras, escribe tu apellido con letras, no uses numeros"
                }
            }
        },
        dni: {
            type: dataTypes.INTEGER(8) //el tipo de dato es un entero que recibe 8 digitos
        },
        email: {
            type: dataTypes.STRING(100), //el tipo de dato es un string texto y recibe hasta 100 caracteres
            allowNull: false,
            unique: true //unico
        },
        contrasena: {
            type: dataTypes.STRING(100), //el tipo de dato es un string y recibe 100 caracteres
        },
        idDomicilio: {
            type: dataTypes.INTEGER(11) //el tipo de dato es un entero y puede recibir hasta 11 caracteres
        },
        categoria: {
            type: dataTypes.STRING(100) //el tipo de dato es un string y puede recibir hasta 100 caracteres
        },
        imagen: {
            type: dataTypes.STRING(100)
        },
    };
    let config = {
        tableName: "usuarios", //el nombre de la tabla
        timestamps: false //fecha de creacion y actualizacion de los registros
            //si no tiene timestamps va a fallar la base de datos
    }

    const Usuario = sequelize.define(alias, cols, config) //aca se [cierra el modelo d base d datos con las 3 alias]
        //-------------------------------alias,cols,config
    Usuario.associate = function(models) {

        Usuario.belongsToMany(models.productos, {
            as: 'producto',
            through: "carritos",
            foreignKey: "idProducto", //clave foranea
            otherKey: "idUsuario", //otra clave
            timestamps: false //la fecha y la actualizacion de los registros, si no tiene timestamps..
                //puede fallar la base de datos
        })

        Usuario.hasMany(models.domicilios, { //usuario tiene muchos modelos de domicilio
            as: "domicilios", // de domicilio
            ForeignKey: "idUsuario", //clave foranea de domicilio
        })
    }


    return Usuario //retorna la funcion usuario

}