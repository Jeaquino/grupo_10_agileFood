const querySelector = function (element) {
    return document.querySelector(element);
}


window.addEventListener('load', function () {
    console.log('vinculación correcta');

    let formRegister = querySelector('form#registro');

    let elementos = formRegister.elements;

    let inputNombre = querySelector('#nombre');
    let inputApellido = querySelector('#apellido');
    let inputEmail = querySelector('#email');
    let inputImagen = querySelector('#imagen');
    let inputContrasena = querySelector('#contrasena');
    let inputVerificacion = querySelector('#verificacion');
    let checkBases = querySelector('.form-check-input');

    let regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

    inputNombre.addEventListener('blur', function () {
        switch (true) {
            case this.value == 0:
                errorNombre.innerHTML = "El campo nombre es obligatorio"
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

    inputApellido.addEventListener('blur', function () {
        switch (true) {
            case this.value == 0:
                errorApellido.innerHTML = "El campo apellido es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <= 2:
                errorApellido.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorApellido.innerHTML = ""
                break;
        }
    })

    inputEmail.addEventListener('blur', function () {

        switch (true) {
            case this.value == 0:
                errorEmail.innerHTML = "El campo email es obligatorio"
                this.classList.add('is-invalid')
                break;
            case !regExEmail.test(this.value):
                errorEmail.innerHTML = "Debes escribir un email válido"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorEmail.innerHTML = ""
                break;
        }
    })

    inputImagen.addEventListener('change', function (e) {

        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function () {
            vistaPrevia.src = reader.result;
            inputImagen.classList.remove('is-invalid')
            inputImagen.classList.add('is-valid');
            errorFoto.innerHTML = ""
        }
    })

    inputContrasena.addEventListener('blur', function () {
        switch (true) {
            case this.value == 0:
                errorContrasena.innerHTML = "El campo contraseña es obligatorio"
                this.classList.add('is-invalid')
                break;
            case !regExPass.test(this.value):
                errorContrasena.innerHTML = "La contraseña debe tener entre 8 y 12 caracteres, una mayúscula una minúscula y un número"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorContrasena.innerHTML = ""
                break;
        }
    })

    inputContrasena.addEventListener('mouseover', function () {
        this.setAttribute("title", "La contraseña debe tener entre 8 y 12 caracteres, una mayúscula una minúscula y un número");
    })


    inputVerificacion.addEventListener('blur', function () {
        switch (true) {
            case this.value == 0:
                errorVerificacion.innerHTML = "Reingrese su contraseña"
                this.classList.add('is-invalid')
                break;
            case this.value != inputContrasena.value:
                errorVerificacion.innerHTML = "Las contraseñas no coinciden"
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorVerificacion.innerHTML = ""
                break;
        }
    })

    checkBases.addEventListener('click', function () {
        checkBases.classList.toggle('is-valid');
        checkBases.classList.remove('is-invalid');
        errorBases.innerHTML = ""
    })

    formRegister.addEventListener('submit', function (event) {
        event.preventDefault();
        if (checkBases.checked == false) {
            checkBases.classList.add('is-invalid');
            errorBases.innerHTML = "Debes aceptar las bases y condiciones"
        }
        let error = false
        for (let index = 0; index < elementos.length - 1; index++) {
            if (elementos[index].value == 0 && elementos[index].name != "aclaracion") {
                elementos[index].classList.add('is-invalid');
                error = true;
            }
        }
        if (!error) {
            formRegister.submit()
        } else {
            msgError.innerHTML = "Los campos señadados son obligatorios"
        }
    })

})