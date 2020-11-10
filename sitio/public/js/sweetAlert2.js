Swal.fire({ /*se trabaja con un objeto por eso se tiene que poner coma despues de los elementos o propiedades*/
    title: 'Bienvenido a Agile food!', //titulo
    text: 'Espero que te guste la comida deliciosa', //texto debajo del titulo
    // html:
    confirmButtonText: 'OK', //mensaje de confirmacion
    icon: 'info', //icono de success tambien esta de question,information
    footer: 'Cumpliendo los estandares de Calidad ISO 2001®', //mensaje de pie de pagina
    // width:
    padding: "1rem",
    background: '#000',
    grow: '50%', //se cambia para que abarque todo el ancho de la pagina si fuera fullscreen
    //backdrop: true,
    timer: 15000, //el tiempo de la alerta que se muestra 5000 mililsegundos son 5 segundos, luego desaparece
    timerProgressBar: true, //el tiempo de progreso de carga de la aplicacion
    // toast:
    position: "center", //para que se posicione en el centro de la pantalla, top arriba,bottom-start aparezca donde comienza,bottom-end es abajo a la derecha
    allowOutsideClick: true, //esto es si quieron permitir que el usuario haga click afuera de la ventana y sea posible cerrar el alerta
    allowEscapeKey: false, //quiero permitir que el usuario use la tecla de escape para cerrar
    allowEnterKey: false, //si el usuario pueda dar enter dentro de la alerta para cerrala.
    stopKeydownPropagation: false, //averiguar esto es un evento de teclado de fondo

    // input:
    // inputPlaceholder:
    // inputValue:
    // inputOptions:

    /*customClass: {
        // 	container:
        // 	popup:
        // 	header:
        // 	title:
        // 	closeButton:
        // 	icon:
        //image: ("../images/pizzachorreando.gif"),
        // 	content:
        // 	input:
        // 	actions:
        // 	confirmButton:
        // 	cancelButton:
        // 	footer:	
    }*/
    // showConfirmButton:
    // confirmButtonColor:
    // confirmButtonAriaLabel:

    // showCancelButton:
    // cancelButtonText:
    // cancelButtonColor:
    // cancelButtonAriaLabel:

    // buttonsStyling:
    // showCloseButton:
    // closeButtonAriaLabel:


    imageUrl: "../images/pizzachorreando.gif",
    // imageWidth:
    // imageHeight:
    // imageAlt:
});
/*Swal.fire({
    title: 'Custom width, padding, background.',
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/pizzachorreando.gif")
      left top
      no-repeat
    `
});
*/