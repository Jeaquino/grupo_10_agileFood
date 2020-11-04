module.exports = //primero se agrega module.exports es fundamental para no tener errores 
    //luego tenemos que configurar los datos de nuesra base de datos
    //en este caso configuraremos de desarrollo(development)
    {
        "development": {
            "username": "root", //usuario
            "password": null, //contraseña
            "database": "agilefood", //la base de datos se llama
            "host": "127.0.0.1", //donde queda la base de datos
            "port": "3306", //donde queda el puerto
            "dialect": "mysql", //que idioma maneja la base de datos
            "operatorAliases": false
        }, //sequelizer toma todo estos datos para hacer la coneccion con javascript eso lo hace en 
        // la carpeta (models) en el archivo(index.js)
        "test": {
            "username": "root",
            "password": null,
            "database": "database_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": null,
            "database": "database_production",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }