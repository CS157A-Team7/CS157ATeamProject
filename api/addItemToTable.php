<?php
	require_once 'login.php';
	require_once 'sanitize.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$name = sanitizeMySQL($conn, $_GET['name']);
	$description = sanitizeMySQL($conn, $_GET['description']);
	$checked = sanitizeMySQL($conn, $_GET['checked']);
	$list_id = sanitizeMySQL($conn, $_GET['list_id']);
	
	$query = "INSERT INTO item(name, description, checked) VALUES ('$name', '$description', '$checked')";
	
	if ($conn->query($query) === TRUE) {
		$item_id = $conn->insert_id;
		$add_query = "INSERT INTO list_has_items(list_id, item_id) VALUES ('$list_id', '$item_id')";
		if($conn->query($add_query) === TRUE){
			echo '1';
		}
		else{
			echo '0';
		}
	}
	else{
		die ("Database access failed: " . $conn->error);
	}
	
    $conn->close();
?>
