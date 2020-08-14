const dbProduct = require("../data/database");

module.exports = {

    detail:function(req, res, next) {

        res.render('login', { 
            css:"style",
            title:"Login"  
        });
    }
}