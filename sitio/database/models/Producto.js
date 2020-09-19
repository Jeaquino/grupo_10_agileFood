module.exports = (sequelize,dataTypes) => {
    let alias = "Productos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        name:{
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.INTEGER
        },
        category:{
            type: dataTypes.STRING
        },
        classification:{
            type: dataTypes.STRING
        },
        score:{
            type: dataTypes.DECIMAL
        },
        stock:{
            type: dataTypes.INTEGER
        },
        description:{
            type: dataTypes.STRING(400)
        },
        image:{
            type: dataTypes.STRING
        },
    };

    let config = {
        tableName: "Productos",
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config)

    return Usuario

}