<?php
    require_once 'login.php';
	require_once 'sanitize.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	$name = sanitizeMySQL($conn, $_POST['name']);
    $description = sanitizeMySQL($conn, $_POST['description']);
	$item_id = sanitizeMySQL($conn, $_POST['item_id']);

    $query = "UPDATE item SET name='$name', description = '$description' WHERE item_id = '$item_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);
	

    $conn->close();
?>