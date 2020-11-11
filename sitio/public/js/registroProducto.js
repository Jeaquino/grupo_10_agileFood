window.addEventListener('load', function () {

    let nombre = document.querySelector(".nombre")
    let titulo = document.querySelector(".titulo")

    let precio = document.querySelector(".precio")
    let importe = document.querySelector(".importe")

    let descuento = document.querySelector(".descuento")
    let rebaja = document.querySelector(".rebaja")

    let descripcion = document.querySelector("div textarea")
    let detalle = document.querySelector(".detalle")

    let stock = document.querySelector(".stock")
    let categoria = document.querySelector(".categoria")
    let clasificacion = document.querySelector(".clasificacion")

    let imagen = document.querySelector(".custom-file-input")
    let vistaPrevia = document.querySelector(".vistaPrevia")

    let botonCategoria = document.querySelector("#botonCategoria")
    let botonClasificacion = document.querySelector("#botonClasificacion")

    let regExNombre = /[\d]/;

    nombre.addEventListener("input", function () {
        titulo.innerText = nombre.value
    })

    nombre.addEventListener("blur", function () {
        console.log(this.value)
        switch (true) {
            case this.value.trim() == "":
                errorNombre.innerHTML = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <= 2:
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

    precio.addEventListener("input", function () {
        importe.innerText = precio.value
        console.log(importe)
    })

    precio.addEventListener("blur", function () {
        switch (true) {
            case this.value.trim() == "":
                errorPrecio.innerHTML = "No debe estar vacio"
                this.classList.add('is-invalid')
                break
            case this.value == 0:
                errorPrecio.innerHTML = "El precio no debe ser 0"
                this.classList.add('is-invalid')
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorPrecio.innerHTML = ""
                break;
        }
    })

    descuento.addEventListener("blur", function () {
        switch (true) {
            case this.value.trim() == "":
                errorDescuento.innerHTML = "No debe estar vacio, si lo deseas pueden poner 0% de descuento"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorDescuento.innerHTML = ""
                break;
        }
    })

    descuento.addEventListener("input", function () {
        rebaja.innerText = precio.value
    })

    stock.addEventListener("blur", function () {
        switch (true) {
            case this.value.trim() == "":
                errorStock.innerHTML = "No debe estar vacio"
                this.classList.add('is-invalid')
                break
            case this.value == 0:
                errorStock.innerHTML = "El stock no debe ser 0"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorStock.innerHTML = ""
                break;
        }
    })

    categoria.addEventListener("blur", function () {
        switch (true) {
            case this.options.selectedIndex == "0":
                errorCategoria.innerHTML = "Debes elegir una categoria"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorCategoria.innerHTML = ""
                break;
        }
    })

    clasificacion.addEventListener("blur", function () {
        switch (true) {
            case this.options.selectedIndex == "0":
                errorClasificacion.innerHTML = "Debes elegir una clasificacion"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorClasificacion.innerHTML = ""
                break;
        }
    })

    descripcion.addEventListener("input", function () {
        detalle.innerText = descripcion.value
    })

    descripcion.addEventListener("blur", function () {
        switch (true) {
            case this.value.trim() == "":
                errorDescripcion.innerHTML = "Agregue una breve descripcion por favor"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorDescripcion.innerHTML = ""
                break;
        }
    })

    imagen.addEventListener('change', function (e) {

        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function () {
            vistaPrevia.src = reader.result;
        }
    })

    imagen.addEventListener("blur", function (e) {
        console.log(e)
        switch (true) {
            /*case vistaPrevia.src==null:
                errorImage.innerHTML = "Debe selecionar una imagen"
                this.classList.add('is-invalid')
                break
            */default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorDescripcion.innerHTML = ""
                break;
        }
    })

    botonCategoria.addEventListener("click", function () {
        let categoria = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })

    botonClasificacion.addEventListener("click", function () {
        let clasificacion = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })



});