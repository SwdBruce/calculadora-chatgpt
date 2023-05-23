<?php

// Permitir el acceso desde cualquier origen (*)
header("Access-Control-Allow-Origin: *");

// Permitir los métodos de solicitud que deseas permitir
header("Access-Control-Allow-Methods: POST");

// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type");

// Verificar si la solicitud es de tipo OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder solo con los encabezados permitidos para las preflight requests
    exit();
}

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app_calculadora";

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si hay errores de conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Si tiene el query ?listar=1
if (isset($_GET['listar']) && $_GET['listar'] == 1) {
    // Consulta SQL para obtener los datos de la tabla 'operacion'
    $sql = "SELECT * FROM operacion";

    // Ejecutar la consulta y obtener los resultados
    $result = $conn->query($sql);

    // Crear un arreglo para almacenar los datos
    $operaciones = array();

    // Verificar si hay resultados
    if ($result->num_rows > 0) {
        // Almacenar los datos en el arreglo $operaciones
        while($row = $result->fetch_assoc()) {
            $operaciones[] = $row;
        }
    }

    // Devolver los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($operaciones);
    exit();
} else {
    // Obtener los datos enviados por POST en formato JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['usuario']) || !isset($data['resultado'])) {
        $response = array('success' => false, 'message' => 'No se enviaron los datos correctamente');
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
    $usuario = $data['usuario'];
    $fechaHora = date("Y-m-d H:i:s");
    $html = $data['resultado'];

    // Consulta SQL para insertar los datos en la tabla 'operacion'
    $sql = "INSERT INTO operacion (usuario, fecha_hora, resultado) VALUES ('$usuario', '$fechaHora', '$html')";

    // Ejecutar la consulta y verificar si fue exitosa
    if ($conn->query($sql) === TRUE) {
        $response = array('success' => true, 'message' => 'Datos insertados correctamente');
    } else {
        $response = array('success' => false, 'message' => 'Error al insertar datos: ' . $conn->error);
    }

    // Cerrar la conexión a la base de datos
    $conn->close();

    // Devolver la respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>
