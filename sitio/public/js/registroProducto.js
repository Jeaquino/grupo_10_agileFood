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

    let botonCategoria = document.querySelector("#botonCategoria")
    let botonClasificacion = document.querySelector("#botonClasificacion")

    let regExNombre =  /[\d]+$/g;

    nombre.addEventListener("input", function () {
        titulo.innerText = nombre.value
    })

    nombre.addEventListener("blur", function () {
        switch (true) {
            case this.length == 0:
                errors.nombre = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <=2:
                errorNombre.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            case regExNombre.test(this.value):
                errorNombre.innerHTML = "Solo se pueden utilizar valores alfabeticos"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorNombre.innerHTML = ""
                break;
        }
    })

    precio.addEventListener("input", function(){
        importe.innerText = precio.value
        console.log(importe)
    })

    descuento.addEventListener("input", function(){
        rebaja.innerText = precio.value
    })

    descripcion.addEventListener("input", function(){
        detalle.innerText = descripcion.value
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

    botonCategoria.addEventListener("click", function(){
        let categoria = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })

    botonClasificacion.addEventListener("click", function(){
        let clasificacion = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })





});