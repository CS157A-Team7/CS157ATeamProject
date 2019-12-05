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
      echo 1; //username found - send email
    }else {
       echo 0; //username not found - error
    }

    $conn->close();

?>
