//---------------------------
// Función para validar un campo específico
function validarCampo(idCampo) {
  const input = document.getElementById(idCampo);
  // trim() elimina espacios al inicio y final; si queda vacío, muestra error
  if (input.value.trim() === '') {
    //   alert('¡Este campo no puede estar vacío!');
    input.classList.add('error'); // Añade clase para estilizar en CSS
    return false; // Indica que la validación falló
  } else {
    input.classList.remove('error'); // Remueve clase si está bien
    return true; // Indica que la validación pasó
  }
}
//---------------------------
document.getElementById('miFormulario').addEventListener('submit', function (event) {
  // Obtenemos los valores de los campos que necesitamos
  let nombreValido = validarCampo('InNombre');
  let emailValido = validarCampo('InEmail');
  const edad = document.getElementById("InEdad");
  const miCheckbox = document.getElementById('acepto');

  if (!nombreValido || !emailValido) {
    event.preventDefault(); // Evita que el formulario se envíe si hay errores
    alert('Por favor, complete Nombre, Mail y Edad.');
  } else
    if (edad.value < 18) {
      event.preventDefault(); // Evita que el formulario se envíe si hay errores
      //alert("Edad debe ser mayor que 18");
    } else
      if (!miCheckbox.checked) {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores
        alert("Acepta la Politica de Datos");
      }
      else {
        // Si todo está bien, el formulario se enviará (comportamiento por defecto)
        console.log('Formulario válido, enviando...');
        //alert("Formulario enviado...")
      }
});
//------------------------------------------------------
$(document).ready(function () {

  //----------------------------------------------------------
  // para enviar datos del formulario por mail, por medio de EmailJS
  $('#miFormulario').on('submit', function (event) {
    event.preventDefault();

    // Bloquear el botón y mostrar un indicador de carga
    const btn = $('#BotonEnviar');
    btn.prop('disabled', true).text('Enviando...');

    const templateParams = {
      nombre: $('#InNombre').val(),
      email: $('#InEmail').val(),
      edad: $('#InEdad').val(),
      mensaje: $('#InMensaje').val()
    };

    emailjs.send('service_xxdzu5r', 'template_z8x4rp5', templateParams)
      .then(function () {
        // Notificación de éxito
        Swal.fire({
          title: '¡Mensaje Enviado!',
          text: 'Gracias ' + templateParams.nombre + ', te contactaremos pronto.',
          icon: 'success',
          confirmButtonColor: '#0d6efd', // Color azul de Bootstrap
          confirmButtonText: 'Genial'
        });

        $('#miFormulario')[0].reset();
        btn.prop('disabled', false).text('Enviar');
      }, function (error) {
        // Notificación de error
        Swal.fire({
          title: 'Error',
          text: 'No pudimos enviar tu mensaje. Intenta más tarde.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
        btn.prop('disabled', false).text('Enviar');
      });
  });
// Cambiar color de fondo al azar----------------------------
  // Al hacer clic en el botón con ID 'btnCambiar'
  $('#btnCambiar').click(function () {
    // Generamos un color aleatorio
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // Aplicamos el color al body usando el método .css() de jQuery
    $('body').css('background-color', randomColor);
    // Opcional: Cambiar el texto del botón al mismo tiempo
    $(this).text('Aquí Cambia Color');
  });
  //----------------------------------------------------
});


