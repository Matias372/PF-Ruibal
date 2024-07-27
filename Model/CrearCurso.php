<?php
include 'Conexion.php'; // Asegúrate de ajustar la ruta según sea necesario
$conexion = new Conexion();
$conn = $conexion->conn;
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Función para guardar la imagen y devolver la URL
function guardarImagen() {
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

    // Guardar la imagen en el servidor
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
        // Devolver la URL de la imagen para almacenar en la base de datos
        $urlImagen = $rutaCompleta;
        return $urlImagen;
    } else {
        throw new Exception('Error al guardar la imagen.');
    }
}

// Función para guardar los datos en la base de datos
function guardarDatos($urlImagen) {
    // Usar la conexión desde Conexion.php
    global $conn;

    // Preparar datos para la inserción en la base de datos
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $temario = $_POST['temario'];
    $precioDolares = $_POST['precioDolares'];
    $precioPesos = $_POST['precioPesos'];

    // Query para insertar datos (ajusta según tu estructura de tabla)
    $stmt = $conn->prepare('INSERT INTO cursos (Nombre, Descripcion, Img, Temario, PrecioUSD, Precio$) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt === false) {
        throw new Exception('Error en la preparación de la consulta: ' . $conn->error);
    }

    $stmt->bind_param('ssssdd', $nombre, $descripcion, $urlImagen, $temario, $precioDolares, $precioPesos);
    if ($stmt->execute()) {
        // Éxito al guardar en la base de datos
        echo json_encode(['message' => 'Curso creado exitosamente.']);
    } else {
        // Error al guardar en la base de datos
        throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}

// Lógica principal para procesar el formulario
try {
    if (!isset($_FILES['imagen'])) {
        throw new Exception('No se ha recibido la imagen.');
    }
    
    // Guardar imagen y obtener la URL
    $urlImagen = guardarImagen();
    
    // Guardar datos en la base de datos usando la URL de la imagen
    guardarDatos($urlImagen);

} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
