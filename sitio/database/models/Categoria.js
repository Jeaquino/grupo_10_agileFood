module.exports = (sequelize,dataTypes) => {
    let alias = "categorias";
    let cols = {
        idCategoria:{
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncremet: true
        },
        nombre:{
            type: dataTypes.STRING(100)
        }
    };

    let config = {
        tableName: "categorias",
        timestamps: false
    }

    const Categoria = sequelize.define(alias,cols,config)

    return Categoria

}