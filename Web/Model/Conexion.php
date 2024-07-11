<?php
$servername = "localhost";  // Nombre del servidor de la base de datos
$username = "usuario";       // Nombre de usuario de la base de datos
$password = "contraseña";    // Contraseña del usuario de la base de datos
$dbname = "nombre_base_de_datos"; // Nombre de la base de datos a la que deseas conectar

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>