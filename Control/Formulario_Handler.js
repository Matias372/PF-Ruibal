/*== Se implementa EmailJS para enviar formulario como mail al administrador. se comenta codio y se procede a directamente redirigir pagina. */

/*
// perronautas.adiestramiento@gmail.com
(function(){
    emailjs.init("xxxxxxxxxx"); //API key de usuario de EmailJS
})();
*/
function sendEmail(event) {
    
    /*event.preventDefault(); 

    // Obtener los datos del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var mail = document.getElementById('mail').value;
    var telefono = document.getElementById('telefono').value;
    var curso = document.getElementById('cursoname').value;
    var mascota = document.getElementById('mascota').value;
    var fca = document.getElementById('fca').value;
    var comentarios = document.getElementById('comentarios').value;

    // Enviar el correo usando EmailJS
    emailjs.send("xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxx", { // Servicio id y plantilla id de correo
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
        window.location.href = 'Registrado.html';
    }, function(error) {
        console.error('Hubo un error al enviar el correo:', error);
    });*/

    window.location.href = 'Registrado.html';
}
