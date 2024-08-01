/* aca se agrega las funciones para mostrar detalles del curso de la base de datos */
function toggleCourseContent(button) {
    // Encuentra el contenedor
    const card = button.closest('.card');
    // Busca el contenido
    const cursoContent = card.querySelector('.curso__contenido');
    if (cursoContent.style.display === 'none' || cursoContent.style.display === '') {
        cursoContent.style.display = 'block'; // Muestra el contenido
        button.textContent = '▲'; // Cambia el texto del botón a ▲ para indicar que el contenido está visible
    } else {
        cursoContent.style.display = 'none'; // Oculta el contenido
        button.textContent = '▼'; // Cambia el texto del botón a ▼ para indicar que el contenido está oculto
    }
}


