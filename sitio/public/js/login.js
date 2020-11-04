window.addEventListener('load', function() {

    let mail = document.querySelector(".mail")
    let constrasena = document.querySelector(".titulo")

    let regExMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let regExContrsena = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,18}$/; // La contraseña debe tener al entre 8 y 18 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.

    constrasena.addEventListener("blur", function() {
        if (!regExContrsena.test(this.value)) {
            errorEmail.innerHTML = "La contraseña debe tener al entre 8 y 18 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos"
        }
    })

    nombre.addEventListener("blur", function() {
        switch (true) {
            case this.length == 0:
                errors.nombre = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <= 2:
                errorNombre.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorNombre.innerHTML = ""
                break;
        }
    })

    precio.addEventListener("input", function() {
        importe.innerText = precio.value
        console.log(importe)
    })

    descuento.addEventListener("input", function() {
        rebaja.innerText = precio.value
    })

    descripcion.addEventListener("input", function() {
        detalle.innerText = descripcion.value
    })

    imagen.addEventListener('change', function(e) {

        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function() {
            console.log(vistaPrevia.src)
            console.log(e.target.files[0])
            vistaPrevia.src = reader.result;
        }
    })

    botonCategoria.addEventListener("click", function() {
        let categoria = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })

    botonClasificacion.addEventListener("click", function() {
        let clasificacion = prompt("ingrese el nombre de la categoria")
        let resultado = confirm("seguro que desea agregar la categoria")
    })

});
window.addEventListener('load', function() {
    const eye = document.querySelector(".feather-eye");
    const eyeoff = document.querySelector(".feather-eye-off");
    const passwordField = document.querySelector("input[type=password]");

    eye.addEventListener("click", () => {
        eyeoff.style.display = "block";
        eye.style.display = "none";

        passwordField.type = "text";
    });

    eyeoff.addEventListener("click", () => {
        eyeoff.style.display = "none";
        eye.style.display = "block";

        passwordField.type = "password";
    })
})