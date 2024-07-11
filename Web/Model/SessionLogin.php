<?php
    require_once '../../Model/Conexion.php';
    // Obtener los datos del formulario
    // Obtener los datos del formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];
    
        // Consulta para verificar las credenciales
        $sql = "SELECT id, username FROM usuarios WHERE username=? AND password=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows == 1) {
        // Inicio de sesión exitoso
        $row = $result->fetch_assoc();
        $_SESSION['id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        
        // Redireccionar a la página de inicio o dashboard
        header("Location: ../../Visual/Html/AdminDog.html");
        exit();
        } else {
        // Credenciales inválidas
        echo "Usuario o contraseña incorrectos.";
        }
    
        // Cerrar la declaración preparada
        $stmt->close();
    }
    ?>