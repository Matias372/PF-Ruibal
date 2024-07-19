<?php
header('Content-Type: application/json');
include 'Conexion.php'; // Ajusta la ruta según sea necesario

// Crear instancia de conexión
$conexion = new Conexion();
$conn = $conexion->conn;

// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Función para obtener todos los cursos
function obtenerCursos() {
    global $conn;

    // Consulta SQL para seleccionar todos los datos de la tabla cursos
    $query = "SELECT Nombre, Descripcion, Img, Temario, PrecioUSD, Precio$ FROM cursos";
    
    // Ejecutar consulta
    $result = $conn->query($query);

    // Verificar si la consulta fue exitosa
    if ($result === false) {
        throw new Exception('Error en la consulta: ' . $conn->error);
    }

    $courses = array();

    // Recorrer el resultado de la consulta
    while ($row = $result->fetch_assoc()) {
        $row['Temario'] = json_decode($row['Temario'], true); // Decodificar el campo Temario del formato JSON
        $courses[] = $row; // Añadir curso al array
    }

    return $courses;
}

// Lógica principal para procesar la solicitud
try {
    // Obtener todos los cursos
    $cursos = obtenerCursos();
    
    // Codificar los datos en formato JSON y devolver
    echo json_encode($cursos);
} catch (Exception $e) {
    // Devolver mensaje de error en caso de excepción
    echo json_encode(['error' => $e->getMessage()]);
}

// Cerrar conexión a la base de datos
$conn->close();
?>
