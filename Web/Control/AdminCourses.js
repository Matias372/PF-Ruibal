let cursoOriginalNombre;
let cursoOriginalImagen;
let cursoOriginalDescripcion;
let cursoOriginalTemario;
let cursoOriginalPrecio$;
let cursoOriginalPrecioUSD;

document.addEventListener('DOMContentLoaded', (event) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Función para mostrar el formulario de nuevo curso
    function showNewCourseForm() {
        const contenedor = document.querySelector('.contenedor');
        contenedor.innerHTML = ''; // Limpiar cualquier contenido previo
        const mensajeDiv = document.querySelector('.mensaje');
        mensajeDiv.style.display = 'none';

        // Crear formulario para nuevo curso
        const nuevoCursoForm = document.createElement('form');
        nuevoCursoForm.id = 'nuevoCursoForm';
        nuevoCursoForm.setAttribute('enctype', 'multipart/form-data');
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
            <input type="text" id="precioDolares" name="precioDolares" pattern="^[0-9]+([.,][0-9]+)?$" required><br><br>
            
            <label for="precioPesos">Precio en $:</label><br>
            <input type="text" id="precioPesos" name="precioPesos" pattern="^[0-9]+([.,][0-9]+)?$" required><br><br>
            
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
            const formData = new FormData(nuevoCursoForm);`
            `
            // Añadir los módulos al formData
            const modulos = [];
            modulosContainer.querySelectorAll('.modulo input[name="modulos[]"]').forEach((input) => {
                modulos.push(input.value);
            });
            formData.set('temario', JSON.stringify(modulos));

            enviarFormulario(formData);
            contenedor.innerHTML = '';
        });

        contenedor.appendChild(nuevoCursoForm);
    }

    // Función para mostrar el formulario de modificación de curso
    function showModifyCourseForm() {
        const contenedor = document.querySelector('.contenedor');
        contenedor.innerHTML = ''; // Limpiar cualquier contenido previo
        const mensajeDiv = document.querySelector('.mensaje');
        mensajeDiv.style.display = 'none';

        // Crear formulario para seleccionar curso a modificar
        const selectCursoForm = document.createElement('form');
        selectCursoForm.id = 'selectCursoForm';
        selectCursoForm.innerHTML = `
            <label for="cursoSelect">Seleccione el curso a modificar:</label><br>
            <select id="cursoSelect" name="cursoSelect" required>
                <!-- Opciones de cursos se cargarán dinámicamente -->
            </select>
            <br><br>
            <button type="button" id="seleccionarCurso">Seleccionar Curso</button>
        `;

        // Manejar el clic en el botón "Seleccionar Curso"
        selectCursoForm.querySelector('#seleccionarCurso').addEventListener('click', function () {
            const cursoSeleccionado = selectCursoForm.querySelector('#cursoSelect').value;
            if (cursoSeleccionado) {
                // Crear objeto FormData para enviar el nombre del curso
                const formData = new FormData();
                formData.append('nombre', cursoSeleccionado);
                // Obtener datos del curso seleccionado y mostrar formulario de modificación
                fetch('../../Model/ObtenerCurso.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    showModifyCourseFormWithData(data); // Función para mostrar formulario con datos cargados
                })
                .catch(error => console.error('Error:', error));
            } else {
                alert('Seleccione un curso para modificar.');
            }
        });
        

        contenedor.appendChild(selectCursoForm);

        // Cargar opciones de cursos disponibles
        cargarOpcionesCursos();
    }

    // Función para mostrar formulario de modificación con datos cargados
    function showModifyCourseFormWithData(cursoData) {
        //valores originales del curso
        cursoOriginalNombre = cursoData.Nombre;
        cursoOriginalDescripcion = cursoData.Descripcion;
        cursoOriginalImagen = cursoData.Img;
        cursoOriginalTemario = JSON.parse(cursoData.Temario);
        cursoOriginalPrecio$ = cursoData.Precio$;
        cursoOriginalPrecioUSD = cursoData.PrecioUSD;

        const contenedor = document.querySelector('.contenedor');
        contenedor.innerHTML = ''; // Limpiar cualquier contenido previo
        const mensajeDiv = document.querySelector('.mensaje');
        mensajeDiv.style.display = 'none';

        // Crear formulario para modificar curso con datos cargados
        const modificarCursoForm = document.createElement('form');
        modificarCursoForm.id = 'modificarCursoForm';
        modificarCursoForm.setAttribute('enctype', 'multipart/form-data');
        modificarCursoForm.innerHTML = `
            <label for="nombre">Nombre del curso:</label><br>
            <input type="text" id="nombre" name="nombre" value="${cursoData.Nombre}" required><br><br>
            
            <label for="descripcion">Descripción:</label><br>
            <textarea id="descripcion" name="descripcion" rows="4" required>${cursoData.Descripcion}</textarea><br><br>
            
            <label for="imagen">Imagen del curso:</label><br>
            <input type="file" id="imagen" name="imagen" accept="image/*"><br><br>
            
            <label for="temario">Temario (formato JSON):</label><br>
            <div id="modulosContainer">
                <!-- Módulos cargados se mostrarán aquí -->
            </div>
            <button type="button" id="agregarModulo">Agregar Módulo</button><br><br>

            <label for="precioDolares">Precio en USD:</label><br>
            <input type="text" id="precioDolares" name="precioDolares" pattern="^[0-9]+([.,][0-9]+)?$" value="${cursoData.PrecioUSD}" required><br><br>
            
            <label for="precioPesos">Precio en $:</label><br>
            <input type="text" id="precioPesos" name="precioPesos" pattern="^[0-9]+([.,][0-9]+)?$" value="${cursoData.Precio$}" required><br><br>
            
            <button type="submit">Guardar Cambios</button>
        `;

        contenedor.appendChild(modificarCursoForm);
    
        // Parsear Temario si es necesario
        let temario = [];
        try {
            temario = JSON.parse(cursoData.Temario);
        } catch (e) {
            console.error('Error parsing Temario:', e);
        }

        if (Array.isArray(temario)) {
            mostrarModulos(temario);
        } else {
            console.error('Error: Temario no es un array');
        }

        // Agregar manejo dinámico de módulos
        const modulosContainer = modificarCursoForm.querySelector('#modulosContainer');
        const agregarModuloBtn = modificarCursoForm.querySelector('#agregarModulo');

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

        // Manejar el envío del formulario de modificación
        modificarCursoForm.addEventListener('submit', function (event) {
            event.preventDefault();

             // Obtener formData inicialmente con todos los campos
            const formData = new FormData(modificarCursoForm);

            // Verificar si se seleccionó una nueva imagen
            const nuevaImagen = modificarCursoForm.querySelector('#imagen').files[0];
            if (!nuevaImagen) {// Si no se seleccionó una nueva imagen, mantener la original
                formData.set('imagen', "SinCambio");
            }

            // Añadir los módulos al formData
            const modulos = [];
            modulosContainer.querySelectorAll('.modulo input[name="modulos[]"]').forEach((input) => {
                modulos.push(input.value);
            });
            formData.set('temario', JSON.stringify(modulos));
            
            formData.append('tmp-nombre', cursoOriginalNombre);
            formData.append('tmp-descripcion', cursoOriginalDescripcion);
            formData.append('tmp-imagen', cursoOriginalImagen);
            formData.append('tmp-temario', JSON.stringify(cursoOriginalTemario));
            formData.append('tmp-precioUSD', cursoOriginalPrecioUSD);
            formData.append('tmp-precio$', cursoOriginalPrecio$);

            /*
            alert(
                'tmp-nombre: ' + formData.get('tmp-nombre') + '\n' +
                'tmp-imagen: ' + formData.get('tmp-imagen') + '\n' +
                'tmp-temario: ' + (formData.has('tmp-temario') ? JSON.parse(formData.get('tmp-temario')).join(', ') : '') + '\n' +
                'tmp-descripcion: ' + formData.get('tmp-descripcion') + '\n' +
                'tmp-precioUSD: ' + formData.get('tmp-precioUSD') + '\n' +
                'tmp-precio$: ' + formData.get('tmp-precio$') + '\n' +
                'nombre: ' + formData.get('nombre') + '\n' +
                'imagen: ' + formData.get('imagen') + '\n' +
                'temario: ' + (formData.has('temario') ? JSON.parse(formData.get('temario')).join(', ') : '') + '\n' +
                'descripcion: ' + formData.get('descripcion') + '\n' +
                'precioUSD: ' + formData.get('precioDolares') + '\n' +
                'precio$: ' + formData.get('precioPesos')
            );*/

            enviarFormularioModificado(formData);
            contenedor.innerHTML = '';
        });
    }

    function showEliminateForm(){
        const contenedor = document.querySelector('.contenedor');
        contenedor.innerHTML = ''; // Limpiar cualquier contenido previo
        const mensajeDiv = document.querySelector('.mensaje');
        mensajeDiv.style.display = 'none';
    
        // Crear formulario para seleccionar curso a eliminar
        const selectCursoForm = document.createElement('form');
        selectCursoForm.id = 'selectCursoForm';
        selectCursoForm.innerHTML = `
            <label for="cursoSelect">Seleccione el curso que busca eliminar:</label><br>
            <select id="cursoSelect" name="cursoSelect" required>
                <!-- Opciones de cursos se cargarán dinámicamente -->
            </select>
            <br><br>
            <button type="button" id="seleccionarCurso">Seleccionar Curso</button>
        `;
    
        // Manejar el clic en el botón "Seleccionar Curso"
        selectCursoForm.querySelector('#seleccionarCurso').addEventListener('click', function () {
            const cursoSeleccionado = selectCursoForm.querySelector('#cursoSelect').value;
            if (cursoSeleccionado) {
                // Crear div para confirmación
                const confirmacionDiv = document.createElement('div');
                confirmacionDiv.classList.add('confirmacion');
                confirmacionDiv.innerHTML = `
                    <p>¿Está seguro que desea eliminar el curso "${cursoSeleccionado}"?</p>
                    <button id="confirmarEliminar">Sí</button>
                    <button id="cancelarEliminar">No</button>
                `;
                
                contenedor.appendChild(confirmacionDiv);
                // lee cuando el boton es presionado y ejecuta la accion correspondiente.
                const cancelarEliminarBtn = confirmacionDiv.querySelector('#cancelarEliminar');
                cancelarEliminarBtn.addEventListener('click', function () {
                    confirmacionDiv.remove();
                });
                
                const confirmarEliminarBtn = confirmacionDiv.querySelector('#confirmarEliminar');
                confirmarEliminarBtn.addEventListener('click', function () {
                    comandEliminate(cursoSeleccionado);
                    contenedor.innerHTML = '';
                });
            } else {
                alert('Seleccione un curso para eliminar.');
            }
        });
    
        contenedor.appendChild(selectCursoForm);
    
        // Cargar opciones de cursos disponibles
        cargarOpcionesCursos();
    }
    
    // Función para ejecutar la eliminación del curso
    function comandEliminate(cursoSeleccionado) {
        console.log('Eliminando curso:', cursoSeleccionado);
        const formData = new FormData();
        formData.append('cursoEliminar', cursoSeleccionado);
    
        fetch('../../Model/EliminarCurso.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Curso eliminado:', data);
            mostrarMensaje(`Curso "${cursoSeleccionado}" eliminado correctamente.`);
        })
        .catch(error => console.error('Error:', error));
    }
    
    // Función para mostrar los módulos cargados del curso
    function mostrarModulos(modulos) {
        const modulosContainer = document.querySelector('#modulosContainer');
    
        if (!modulosContainer) {
            console.error('Error: No se encontró el contenedor de módulos');
            return;
        }
    
        modulosContainer.innerHTML = ''; // Limpiar contenido previo
        
        modulos.forEach(modulo => {
            const moduloDiv = document.createElement('div');
            moduloDiv.classList.add('modulo');
            moduloDiv.innerHTML = `
                <input type="text" name="modulos[]" value="${modulo}" required>
                <button type="button" class="eliminarModulo">Eliminar</button>
            `;
            modulosContainer.appendChild(moduloDiv);
        });
    }    

    // Función para cargar opciones de cursos disponibles en el select
    function cargarOpcionesCursos() {
        const cursoSelect = document.querySelector('#cursoSelect');
        cursoSelect.innerHTML = ''; // Limpiar opciones previas

        // Obtener lista de cursos disponibles
        fetch('../../Model/ListarCursos.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(curso => {
                    const option = document.createElement('option');
                    option.textContent = curso.Nombre;
                    cursoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Función para enviar formulario de nuevo curso o modificación
    function enviarFormulario(formData) {
        fetch('../../Model/CrearCurso.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.message);
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para enviar formulario modificado de curso
    function enviarFormularioModificado(formData) {
        fetch('../../Model/ModificarCurso.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.message);
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para mostrar mensajes en la interfaz
    function mostrarMensaje(message) {
        const mensajeDiv = document.querySelector('.mensaje');
        mensajeDiv.textContent = message;
        mensajeDiv.style.display = 'block';

        const formularioActivo = document.querySelector('form');
        if (formularioActivo) {
            formularioActivo.style.display = 'none';
        }
    }

    // Event listener para botón "Nuevo Curso"
    document.querySelector('#nuevoCurso').addEventListener('click', function () {
        showNewCourseForm();
    });

    // Event listener para botón "Modificar Curso"
    document.querySelector('#modificar').addEventListener('click', function () {
        showModifyCourseForm();
    });

    // Event listener para botón "Modificar Curso"
    document.querySelector('#Eliminar').addEventListener('click', function () {
        showEliminateForm();
    });

    // Event listener para botón "Cerrar Sesión"
    document.querySelector('#cerrarSesion').addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'AdminDog.html'; // Redireccionar a la página de inicio de sesión
    });

    // Mostrar botones y contenido dependiendo del estado de inicio de sesión
    if (isLoggedIn) {
        document.querySelector('.botones').style.display = 'flex';
        document.querySelector('.contenedor').style.display = 'block';
    } else {
        document.querySelector('#loginForm').style.display = 'block';
    }
});
