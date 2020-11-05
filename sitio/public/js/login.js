window.addEventListener('load', function() {

    let mail = document.querySelector(".mail")
    let contrasena = document.querySelector(".contrasena")

    let regExMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let regExContrasena = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,18}$/; // La contraseña debe tener al entre 8 y 18 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.

    mail.addEventListener("blur", function() {
        switch (true) {
            case this.length == 0:
                errorEmail = "El campo no puede estar vacio, ingrese un mail"
                this.classList.add('is-invalid')
                break;
            case (!regExMail.test(this.value)):
                errorEmail.innerHTML = "Debe ingresar un mail valido"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorNombre.innerHTML = ""
                break;
        }
    })

    contrasena.addEventListener("blur", function() {
        switch (true) {
            case this.length == 0:
                errorContrasena = "El campo no puede estar vacio, ingrese una contraseña"
                this.classList.add('is-invalid')
                break;
            case (!regExContrasena.test(this.value)):
                errorContrasena.innerHTML = "La contraseña debe tener al entre 8 y 18 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorNombre.innerHTML = ""
                break;
        }
    })
})