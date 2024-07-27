<?php
// Incluir archivo de conexión
include_once 'Conexion.php';

// Verificar si se proporcionó un nombre de curso
if (isset($_POST['cursoEliminar'])) {
    $nombreCurso = $_POST['cursoEliminar'];

    // Inicializar conexión a la base de datos
    $conexion = new Conexion();
    $conn = $conexion->conn;

    // Verificar la conexión
    if ($conn) {
        // Obtener la imagen del curso que se va a eliminar
        $query = "SELECT Img FROM cursos WHERE Nombre = ?";
        $stmt_img = $conn->prepare($query);
        $stmt_img->bind_param('s', $nombreCurso);
        if ($stmt_img->execute()) {
            $stmt_img->store_result();
            if ($stmt_img->num_rows > 0) {
                $stmt_img->bind_result($imagenCurso);
                $stmt_img->fetch();
                
                // Eliminar la imagen del servidor si existe
                if (!empty($imagenCurso) && file_exists($imagenCurso)) {
                    unlink($imagenCurso);
                }
            }
            $stmt_img->close();
        }

        // Eliminar el curso de la base de datos
        $query_delete = "DELETE FROM cursos WHERE Nombre = ?";
        $stmt = $conn->prepare($query_delete);
        
        if ($stmt) {
            // Vincular parámetros
            $stmt->bind_param('s', $nombreCurso);

            // Ejecutar consulta
            if ($stmt->execute()) {
                // Verificar si se eliminó algún curso
                if ($stmt->affected_rows > 0) {
                    // Curso eliminado correctamente
                    echo json_encode(array('success' => true, 'message' => 'Curso eliminado correctamente'));
                } else {
                    // No se encontró el curso para eliminar
                    echo json_encode(array('error' => 'Curso no encontrado'));
                }
            } else {
                // Si hay un error en la ejecución de la consulta
                echo json_encode(array('error' => 'Error al ejecutar la consulta'));
            }

            // Cerrar declaración
            $stmt->close();
        } else {
            // Si hubo un error en la preparación de la consulta
            echo json_encode(array('error' => 'Error en la preparación de la consulta'));
        }

        // Cerrar conexión
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
