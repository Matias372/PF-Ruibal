/* Función para mostrar detalles del curso */
function toggleCourseContent(button) {
    // Encuentra el contenedor más cercano de la tarjeta del curso
    const card = button.closest('.card');
    // Busca el contenido del curso dentro de la tarjeta
    const cursoContent = card.querySelector('.curso__contenido');
    if (cursoContent.style.display === 'none' || cursoContent.style.display === '') {
        cursoContent.style.display = 'block';
        button.textContent = '▲'; // Cambia el texto del botón a ▲ para indicar que el contenido está visible
    } else {
        cursoContent.style.display = 'none';
        button.textContent = '▼'; // Cambia el texto del botón a ▼ para indicar que el contenido está oculto
    }
}

// Opcional: Inicializa el estado de los botones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.curso__toggle-button');
    toggleButtons.forEach(button => {
        // Encuentra el contenedor más cercano de la tarjeta del curso
        const card = button.closest('.card');
        // Busca el contenido del curso dentro de la tarjeta
        const cursoContent = card.querySelector('.curso__contenido');
        if (cursoContent.style.display === 'none' || cursoContent.style.display === '') {
            button.textContent = '▼'; // Asegúrate de que el botón muestre ▼ si el contenido está oculto
        } else {
            button.textContent = '▲'; // Asegúrate de que el botón muestre ▲ si el contenido está visible
        }
    });
});
