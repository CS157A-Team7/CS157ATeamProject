<?php
	require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$name = $_GET['name'];
	$description = $_GET['description'];
	$checked = $_GET['checked'];
	$list_id = $_GET['list_id'];
	
	$query = "INSERT INTO item(name, description, checked) VALUES ('$name', '$description', '$checked')";
	
	if ($conn->query($query) === TRUE) {
		$item_id = $conn->insert_id;
		$add_query = "INSERT INTO list_has_items(list_id, item_id) VALUES ('$list_id', '$item_id')";
		if($conn->query($add_query) === TRUE){
			echo json_encode('1');
		}
		else{
			echo json_encode('0');
		}
	}
	else{
		die ("Database access failed: " . $conn->error);
	}
	
    $conn->close();
?>
