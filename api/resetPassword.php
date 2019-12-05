<?php
    require_once 'login.php';
	require_once 'sanitize.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	if(isset($_COOKIE['nameForReset'])){
		$username = $_COOKIE['nameForReset'];
		$password = sanitizeMySQL($conn, $_POST['password']);
		$code = sanitizeMySQL($conn, $_POST['code']);
		
		$code_query = "SELECT * FROM reset_password WHERE username='$username' AND token='$code'";
		$code_result = $conn->query($code_query);
		if(!$code_result) die ("Database access failed: " . $conn->error);
		
		$row = $code_result->num_rows;
		if($row === 1){
			$query = "UPDATE account SET password='$password' WHERE username = '$username';";
			$result = $conn->query($query);
			if(!$result) die ("Database access failed: " . $conn->error);
			
			$delete_query = "DELETE FROM reset_password WHERE username='$username'";
			$delete_result = $conn->query($delete_query);
			if(!$delete_result) die ("Database access failed: " . $conn->error);
			
			setcookie('nameForReset', $username, time() -2592000, '/');
		}
		else{
			die("Incorrect");
		}
	}
	else{
		echo "No User";
	}
	
    $conn->close();
?>