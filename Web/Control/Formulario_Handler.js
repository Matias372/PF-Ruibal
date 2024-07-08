// Inicializar EmailJS
(function(){
    emailjs.init("X9KKi_KEI1ovvrocR"); //API key de usuario de EmailJS
})();

function sendEmail(event) {
    event.preventDefault(); // Prevenir el envío del formulario


    // Obtener los datos del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var mail = document.getElementById('mail').value;
    var telefono = document.getElementById('telefono').value;
    var curso = document.getElementById('cursoname').value;
    var mascota = document.getElementById('mascota').value;
    var fca = document.getElementById('fca').value;
    var comentarios = document.getElementById('comentarios').value;

    console.log("Datos del formulario obtenidos:", {
        nombre,
        apellido,
        mail,
        telefono,
        curso,
        mascota,
        fca,
        comentarios
    });

    // Enviar el correo usando EmailJS
    emailjs.send('service_de7snee', 'template_cm6tfik', { // Servicio id y plantilla id de correo
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        telefono: telefono,
        curso: curso,
        mascota: mascota,
        fca: fca,
        comentarios: comentarios
    })
    .then(function(response) {
        console.log('Correo enviado exitosamente:', response);
        // Opcional: redirigir a una página de éxito
        window.location.href = 'Registrado.html';
    }, function(error) {
        console.error('Hubo un error al enviar el correo:', error);
    });
}
