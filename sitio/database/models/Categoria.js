module.exports = (sequelize, dataTypes) => {
    let alias = "categorias";
    let cols = {
        idCategoria: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncremet: true
        },
        nombre: {
            type: dataTypes.STRING(100)
        }
    };

    let config = {
        tableName: "categorias",
        timestamps: false
    }

    let Categoria = sequelize.define(alias, cols, config)

   Categoria.associate = function (models) {

        Categoria.hasMany(models.productos, {
            as: "productos",
            foreignKey: "idCategoria",
        })
    }

    return Categoria

}