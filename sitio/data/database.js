const fs = require("fs");
const path = require("path");

module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, "/productsDataBase.json"), "utf-8"));
/*modulo especial que parsea el JSON y que este al alcance de los controlladores si asi lo precise (productsController.js por ejemplo) */