function toggleCourseContent(button) {
    const card = button.closest('.card');
    const cursoContent = card.querySelector('.curso__contenido');
    const isVisible = cursoContent.classList.contains('visible');

    if (isVisible) {
        cursoContent.classList.remove('visible');
        setTimeout(() => {
            cursoContent.style.display = 'none';
        }, 1000); // El tiempo debe coincidir con la duración de la transición
        button.textContent = '▼';
    } else {
        cursoContent.style.display = 'block';
        setTimeout(() => {
            cursoContent.classList.add('visible');
        }, 1); // Un pequeño retraso para permitir que el cambio de display sea procesado
        button.textContent = '▲';
    }
}
