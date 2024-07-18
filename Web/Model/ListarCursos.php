<?php
// Incluir archivo de conexión
include_once 'Conexion.php';
$conexion = new Conexion();
$conn = $conexion->conn;

// Establecer cabeceras para respuesta JSON
header('Content-Type: application/json');

// Inicializar array para almacenar cursos
$cursos = array();

// Verificar conexión
if ($conn) {
    // Consulta SQL para obtener todos los cursos
    $query = "SELECT Nombre FROM cursos";

    // Ejecutar consulta
    $result = $conn->query($query);

    // Verificar si se encontraron resultados
    if ($result->num_rows > 0) {
        // Recorrer resultados y guardar en array
        while ($row = $result->fetch_assoc()) {
            $curso = array(
                'Nombre' => $row['Nombre']
                // Puedes añadir más campos según necesites
            );
            $cursos[] = $curso;
        }
    }

    // Liberar resultado
    $result->free_result();
} else {
    // Manejar error de conexión si es necesario
    echo json_encode(array('error' => 'Error de conexión a la base de datos.'));
    exit;
}

// Cerrar conexión
$conn->close();

// Devolver respuesta JSON con los cursos
echo json_encode($cursos);
?>
