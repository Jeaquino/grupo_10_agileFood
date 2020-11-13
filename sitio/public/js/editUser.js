const querySelector = function (element) {
    return document.querySelector(element);
}


window.addEventListener('load', function () {
    console.log('vinculación correcta');

    let formRegister = querySelector('form#registro');

    let elementos = formRegister.elements;

    let inputNombre = querySelector('#nombre');
    let inputApellido = querySelector('#apellido');
    let inputImagen = querySelector('#imagen');

    inputNombre.addEventListener('blur', function () {
        switch (true) {
            case this.value == 0:
                errorNombre.innerHTML = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length < 2:
                errorNombre.innerHTML = "Tenés que poner al menos 2 letras"
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
            case this.value.trim().length < 2:
                errorApellido.innerHTML = "Tenés que poner al menos 2 letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorApellido.innerHTML = ""
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


})