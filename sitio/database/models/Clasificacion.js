/*Creacion del modelo*/
module.exports = (sequelize, dataTypes) => {
    let alias = "clasificaciones";
    let cols = {
        idClasificacion: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncremet: true
        },
        nombre: {
            type: dataTypes.STRING(100)
        }
    };

    let config = {
            tableName: "clasificaciones",
            timestamps: false
        }
        /*aca definimos la tabla: el alias que esta definida arriba y las cols que son las columnas de arriba son objetos, y otro objeto es la configuracion*/
    let Clasificacion = sequelize.define(alias, cols, config)

    Clasificacion.associate = function(models) {
        /*se relaciona a muchos y (as)hace referencia al modelo que se relaciona al modelo de producto*/
        Clasificacion.hasMany(models.productos, {
            as: "productos",
            foreignKey: "idClasificacion",
        })
    }

    return Clasificacion

}