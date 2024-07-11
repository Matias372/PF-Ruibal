document.addEventListener('DOMContentLoaded', (event) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Función para mostrar el formulario de nuevo curso
    function showNewCourseForm() {
        const contenedor = document.querySelector('.contenedor');
        contenedor.innerHTML = ''; // Limpiar cualquier contenido previo

        // Crear formulario para nuevo curso
        const nuevoCursoForm = document.createElement('form');
        nuevoCursoForm.innerHTML = `
            <label for="nombre">Nombre del curso:</label><br>
            <input type="text" id="nombre" name="nombre" required><br><br>
            
            <label for="descripcion">Descripción:</label><br>
            <textarea id="descripcion" name="descripcion" rows="4" required></textarea><br><br>
            
            <label for="imagen">Imagen del curso:</label><br>
            <input type="file" id="imagen" name="imagen" accept="image/*" required><br><br>
            
            <label for="temario">Temario (formato JSON):</label><br>
            <div id="modulosContainer">
                <div class="modulo">
                    <input type="text" name="modulos[]" placeholder="Nombre del módulo" required>
                    <button type="button" class="eliminarModulo">Eliminar</button>
                </div>
            </div>
            <button type="button" id="agregarModulo">Agregar Módulo</button><br><br>

            <label for="precioDolares">Precio en USD:</label><br>
            <input type="number" id="precioDolares" name="precioDolares" required><br><br>
            
            <label for="precioPesos">Precio en $:</label><br>
            <input type="number" id="precioPesos" name="precioPesos" required><br><br>
            
            <button type="submit">Crear Curso</button>
        `;

        // Agregar manejo dinámico de módulos
        const modulosContainer = nuevoCursoForm.querySelector('#modulosContainer');
        const agregarModuloBtn = nuevoCursoForm.querySelector('#agregarModulo');

        agregarModuloBtn.addEventListener('click', function () {
            const nuevoModulo = document.createElement('div');
            nuevoModulo.classList.add('modulo');
            nuevoModulo.innerHTML = `
                <input type="text" name="modulos[]" placeholder="Nombre del módulo" required>
                <button type="button" class="eliminarModulo">Eliminar</button>
            `;
            modulosContainer.appendChild(nuevoModulo);
        });

        modulosContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('eliminarModulo')) {
                event.target.closest('.modulo').remove();
            }
        });

        // Manejar el envío del formulario
        nuevoCursoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Recoge los módulos y lo convierte a JSON
            const modulosInputs = Array.from(nuevoCursoForm.querySelectorAll('input[name="modulos[]"]'));
            const modulos = modulosInputs
                .map(input => input.value.trim())
                .filter(modulo => modulo !== ''); // Filtrar módulos vacíos

            if (modulos.length === 0) {
                alert('Debe ingresar al menos un módulo.');
                return;
            }
            const temarioJSON = JSON.stringify(modulos);

            // FormData para enviar al servidor
            const formData = new FormData(this);
            formData.append('temario', temarioJSON);

            // Enviar datos al servidor
            fetch('../../Model/CrearCurso.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Mostrar mensaje de respuesta
                // Puedes agregar aquí lógica adicional si necesitas redireccionar o actualizar la página, etc.
            })
            .catch(error => console.error('Error:', error));
        });

        contenedor.appendChild(nuevoCursoForm);
    }
    // Manejar el clic en el botón "Nuevo Curso"
    document.querySelector('#nuevoCurso').addEventListener('click', function () {
        if (!isLoggedIn) {
            // Si no está iniciada la sesión, redirigir a la página de inicio de sesión
            window.location.href = '../../Visual/Html/AdminDog.html';
            return;
        }
        showNewCourseForm();
    });
});
