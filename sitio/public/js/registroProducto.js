window.addEventListener('load', function () {

    let nombre = document.querySelector(".nombre")
    let titulo = document.querySelector(".titulo")

    let precio = document.querySelector(".precio")
    let importe = document.querySelector(".importe")

    let descuento = document.querySelector(".descuento")
    let rebaja = document.querySelector(".rebaja")

    let descripcion = document.querySelector(".descripcion")
    let detalle = document.querySelector(".detalle")

    let imagen = document.querySelector("custom-file-input")
    console.log(imagen)

    nombre.addEventListener("input", function () {
        titulo.innerHTML = nombre.value
    })

    precio.addEventListener("input", function(){
        importe.innerHTML = precio.value
    })

    descuento.addEventListener("input", function(){
        rebaja.innerHTML = precio.value
    })

    descripcion.addEventListener("input", function(){
        detalle.innerHTML = descripcion.value
    })

    imagen.addEventListener("change", function(){
        console.log(imagen)
    })



});