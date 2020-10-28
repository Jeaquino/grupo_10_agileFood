window.addEventListener('load', function () {

    let nombre = document.querySelector(".nombre")
    let titulo = document.querySelector(".titulo")

    let precio = document.querySelector(".precio")
    let importe = document.querySelector(".importe")

    let descuento = document.querySelector(".descuento")
    let rebaja = document.querySelector(".rebaja")

    let descripcion = document.querySelector("div textarea")
    let detalle = document.querySelector(".detalle")

    let imagen = document.querySelector(".custom-file-input")
    let vistaPrevia = document.querySelector(".vistaPrevia")
    console.log(vistaPrevia)

    nombre.addEventListener("input", function () {
        titulo.innerHTML = nombre.value
    })

    precio.addEventListener("input", function(){
        importe.innerHTML = precio.value
    })

    descuento.addEventListener("input", function(){
        rebaja.innerHTML = precio.value
    })

    descripcion.addEventListener("change", function(){
        detalle.innerHTML = descripcion.value
    })

    imagen.addEventListener('change',function(e){

        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function(){
            console.log(vistaPrevia.src)
            console.log(e.target.files[0])
            vistaPrevia.src = reader.result;
        }      
    })



});