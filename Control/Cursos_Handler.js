document.addEventListener('DOMContentLoaded', function() {
    fetchCursos();
});

async function fetchCursos() {
    try {
        // Realizar la solicitud a getCourses.php
        const response = await fetch('../../Model/GetCourses.php');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        
        // Imprimir la respuesta cruda en la consola
        const responseText = await response.text();
        console.log('Respuesta cruda:', responseText);
        
        // Convertir la respuesta en JSON
        const cursos = JSON.parse(responseText);
        
        // Llamar a la función para renderizar los cursos
        renderCursos(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
    }
}

function renderCursos(cursos) {
    const container = document.querySelector('.curso-container');
    
    // Limpiar el contenedor actual de cursos
    container.innerHTML = '<h2>Cursos</h2>';

    // Iterar sobre cada curso y generar HTML
    cursos.forEach((curso, index) => {
        const cursoHTML = `
            <div class="curso">
                <div class="curso-header">
                    <img src="../${curso.Img}" alt="Imagen del curso" class="curso-imagen">
                    <div class="nombrecurso-detalles">
                        <h3>${curso.Nombre}</h3>
                        <p>${curso.Descripcion}</p>
                    </div>
                    <button class="toggle-button" onclick="toggleCourseContent(this)">▼</button>
                </div>
                <div id="Curso${index + 1}name" class="nombrecurso-contenido" style="display: none;">
                    <section>
                        <div>
                            <p><strong>Temario:</strong></p>
                            <ul>
                                ${curso.Temario.map(modulo => `<li>${modulo}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="medios-pago">
                            <p><strong>Medios de pago:</strong></p>
                            <div class="pago">
                                <span>Transferencia bancaria:</span>
                                <span id="$" class="monto">$ ${curso.Precio$}</span>
                            </div>
                            <div class="pago">
                                <span>Pagos exterior:</span>
                                <span id="USD" class="monto">USD ${curso.PrecioUSD}</span>
                            </div>
                        </div>
                    </section>
                    <a class="inscribirse-button" href="Inscribirse.html">Inscribirse</a>
                </div>
            </div>
        `;

        // Añadir el HTML del curso al contenedor
        container.innerHTML += cursoHTML;
    });
}

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
