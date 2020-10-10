module.exports = (sequelize,dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        idUsuario:{
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
        dni:{
            type: dataTypes.INTEGER
        },
        email:{
            type: dataTypes.STRING
        },
        constraseña:{
            type: dataTypes.STRING
        },
        idDomicilio:{
            type: dataTypes.INTEGER
        },
        categoria:{
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config)

    return Usuario

}