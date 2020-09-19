module.exports = (sequelize,dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        apellido:{
            type: dataTypes.STRING
        },
        domicilio:{
            type: dataTypes.STRING
        },
        localidad:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        constraseña:{
            type: dataTypes.STRING
        },
        admin:{
            type: dataTypes.BOOLEAN
        },
    };
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config)

    return Usuario

}