const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/users')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req,file,callback)=>{
    expresionRegImagen = /jpeg|jpg|png|gif/;
    testImagen = expresionRegImagen.test(file.mimetype);
     if(testImagen){
        callback(null,true);
     }else{
        req.errorValidacionImagen = "Se aceptan solo imagenes";
        return callback(null, false, req.errorValidacionImagen);
     }
}

module.exports = multer({
    storage:storage,
    fileFilter : fileFilter
});