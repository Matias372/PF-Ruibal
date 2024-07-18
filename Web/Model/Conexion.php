<?php
class Conexion {
    private $host = 'localhost'; // Host del servidor MySQL
    private $db = 'perronautas'; // Nombre de la base de datos
    private $user = 'root'; // Usuario de MySQL, por defecto es 'root' en XAMPP
    private $password = ''; // Contraseña del usuario MySQL, por defecto está vacía en XAMPP
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->user, $this->password, $this->db);

        if ($this->conn->connect_error) {
            die('Conexión fallida: ' . $this->conn->connect_error);
        }
    }
}
?>