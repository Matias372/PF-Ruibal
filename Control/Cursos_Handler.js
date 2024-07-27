/* Aca iria el codigo para detectar los cursos de la base de datos, se elimino eso*/

/*funcion para mostrar detalles del curso*/
function toggleCourseContent(button) {
    const cursoContent = button.closest('.curso').querySelector('.nombrecurso-contenido');
    if (cursoContent.style.display === 'none' || cursoContent.style.display === '') {
        cursoContent.style.display = 'block';
        button.textContent = '▲';
    } else {
        cursoContent.style.display = 'none';
        button.textContent = '▼';
    }
}
