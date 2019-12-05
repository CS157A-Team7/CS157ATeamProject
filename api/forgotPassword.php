<?php
	require_once 'login.php';
	require_once 'sanitize.php';
	$conn = new mysqli($host, $user, $password, $dbname);
	if($conn->connect_error) die($conn->connect_error);

    $username = sanitizeString($_GET['username']);

    $query = "SELECT username FROM account WHERE username = '$username'";
	$result = $conn->query($query);
	if(!$result) die ("Database access failed: " . $conn->error);
	
	$rows = $result->num_rows;

    if($rows === 1) {
		$length = random_bytes('4');
		$token = bin2hex($length);
		$forgot_query = "INSERT INTO reset_password(username, token) VALUES ('$username', '$token')";
		$forgot_result = $conn->query($forgot_query);
		if(!$forgot_result) die ("Database access failed: " . $conn->error);
		setcookie('nameForReset', $username, time() + 60 * 60 * 24, '/');
      echo 1; //username found - send email
    }else {
       echo 0; //username not found - error
    }

    $conn->close();

?>
