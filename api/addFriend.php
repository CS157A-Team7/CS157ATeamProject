<?php
	require_once 'login.php';
	require_once 'sanitize.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$username = $_GET['username'];
	$friend = sanitizeMySQL($conn, $_GET['friend']);
	
	$check_query = "SELECT username FROM account WHERE username='$friend'";
	
	$check_result = $conn->query($check_query);
	if(!$check_result) die ("Database access failed: " . $conn->error);
	
	$check_row = $check_result->num_rows;
	if ($check_row === 0) {
		die ("User does not exist. Try Again");
	}
	
	$query = "INSERT INTO friends_with(`Username 1`, `Username 2`) VALUES ('$username', '$friend')";
	
	$result = $conn->query($query);
	if(!$result) die ("Database access failed: " . $conn->error);
	
	
    $conn->close();
?>