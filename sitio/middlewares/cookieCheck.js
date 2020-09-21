module.exports = function(req,res,next){
    if(req.cookies.userAgileFood){
        req.session.usuario = req.cookies.userAgileFood;
        next()
    }else{
        next()
    }
}