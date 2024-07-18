<?php
// Incluir archivo de conexión
include_once 'Conexion.php';

// Verificar si se proporcionó un nombre de curso
if (isset($_POST['nombre'])) {
    $nombreCurso = $_POST['nombre'];

    // Inicializar conexión a la base de datos
    $conexion = new Conexion();
    $conn = $conexion->conn;

    // Verificar la conexión
    if ($conn) {
        // Consulta SQL para obtener el curso por nombre
        $query = "SELECT Nombre, Descripcion, Img, Temario, PrecioUSD, Precio$ FROM cursos WHERE Nombre = ?";

        // Preparar la declaración
        $stmt = $conn->prepare($query);
        
        // Vincular parámetros
        $stmt->bind_param('s', $nombreCurso);

        // Ejecutar consulta
        if ($stmt->execute()) {
            // Obtener resultados
            $result = $stmt->get_result();

            // Verificar si se encontraron resultados
            if ($result->num_rows > 0) {
                // Obtener datos del curso
                $curso = $result->fetch_assoc();

                // Devolver respuesta JSON con los datos del curso
                echo json_encode($curso);
            } else {
                // Si no se encuentra el curso, devolver error
                echo json_encode(array('error' => 'Curso no encontrado'));
            }
        } else {
            // Si hay un error en la ejecución de la consulta
            echo json_encode(array('error' => 'Error al ejecutar la consulta'));
        }

        // Cerrar declaración y conexión
        $stmt->close();
        $conn->close();
    } else {
        // Si no se pudo establecer conexión a la base de datos
        echo json_encode(array('error' => 'Error de conexión a la base de datos'));
    }
} else {
    // Si no se proporcionó un nombre de curso válido
    echo json_encode(array('error' => 'Nombre de curso no proporcionado'));
}
?>
