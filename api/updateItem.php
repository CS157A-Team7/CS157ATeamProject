<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	$name = $_POST['name'];
    $description = $_POST['description'];
	$item_id = $_POST['item_id'];

    $query = "UPDATE item SET name='$name', description = '$description' WHERE item_id = '$item_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);
	

    $conn->close();
?>