<?php
// Conectar a la base de datos (debes tener tus credenciales y configuraciones aquí)
require_once('Conexion.php');
$conexion = new Conexion();
$conn = $conexion->conn;

ini_set('display_errors', 0); // Desactivar la visualización de errores
ini_set('log_errors', 1); // Activar el registro de errores
error_reporting(E_ALL);

function guardarImagen() {
    // Verifica si la imagen fue cambiada
    if ($_POST['imagen'] == "SinCambio") {
        return $_POST['tmp-imagen'];
    }

    // Directorio donde se guardará la imagen
    $directorio = '../Resources/Img/Cursos/';
    // Obtener nombre y extensión del archivo
    $nombreCurso = $_POST['nombre'];
    $nombreArchivo = $nombreCurso . '_IMG';
    $extension = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
    // Nombre completo del archivo con extensión
    $nombreCompleto = $nombreArchivo . '.' . $extension;
    // Ruta completa donde se guardará la imagen
    $rutaCompleta = $directorio . $nombreCompleto;

    // Eliminar la imagen vieja si existe
    if ($_POST['tmp-imagen'] && file_exists($_POST['tmp-imagen'])) {
        unlink($_POST['tmp-imagen']);
    }

    // Guardar la imagen en el servidor
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
        // Devolver la URL de la imagen para almacenar en la base de datos
        return $rutaCompleta;
    } else {
        throw new Exception('Error al guardar la imagen.');
    }
}

function guardarDatos($urlImagen) {
    global $conn;

    // Preparar datos para la inserción en la base de datos
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $temario = $_POST['temario'];
    $precioUSD = $_POST['precioDolares'];
    $precioARG = $_POST['precioPesos'];
    $tmp_nombre = $_POST['tmp-nombre'];

    // Query para actualizar datos (ajusta según tu estructura de tabla)
    $stmt = $conn->prepare('UPDATE cursos SET Nombre = ?, Descripcion = ?, Img = ?, Temario = ?, PrecioUSD = ?, Precio$ = ? WHERE Nombre = ?');
    if ($stmt === false) {
        throw new Exception('Error en la preparación de la consulta: ' . $conn->error);
    }

    $stmt->bind_param('ssssdds', $nombre, $descripcion, $urlImagen, $temario, $precioUSD, $precioARG, $tmp_nombre);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Curso actualizado exitosamente.']);
    } else {
        throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}

try {
    $urlImagen = "SinCambio";
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        $urlImagen = guardarImagen();
    }else{
        $urlImagen = $_POST['tmp-imagen'];
    }

    guardarDatos($urlImagen);

} catch (Exception $e) {
    http_response_code(500);
    $errorDetails = [
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ];
    echo json_encode($errorDetails);
}
?>
