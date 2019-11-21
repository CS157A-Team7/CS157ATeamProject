<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $description = $_POST['description'];
	$list_id = $_POST['list_id'];

    $query = "UPDATE list SET description = '$description' WHERE list_id = '$list_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);

    $conn->close();
?>