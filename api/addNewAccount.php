<?php
	require_once 'login.php';
	require_once 'sanitize.php';
	require_once 'encrypt.php';
	
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$username = sanitizeMySQL($conn,$_POST['username']);
	$user_password = sanitizeMySQL($conn,$_POST['password']);
	
	$user_password = encrypt($user_password);
	
	$query = "SELECT username, password FROM account WHERE username='$username'";
	$result = $conn->query($query);
	if(!$result) die ("Database access failed: " . $conn->error);
	
	$rows = $result->num_rows;
	if ($rows === 0) {
		$additional_query = "INSERT INTO account(username, password) VALUES ('$username', '$user_password')";
		$additional_result = $conn->query($additional_query);
		if(!$additional_result) die ("Database access failed: " . $conn->error);
		
		if($additional_result === TRUE){
			echo 'Added new account';
		} else {
			echo 'Failed to add account';
		}
	} else {
		echo '0';
	}
	
    $conn->close();
?>
