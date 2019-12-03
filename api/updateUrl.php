<?php
    require_once 'login.php';
	require_once 'sanitize.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	$list_id = sanitizeMySQL($conn, $_POST['list_id']);
	
	$url = "wishliste.com/list/$list_id";

    $query = "UPDATE wishlist SET url='$url' WHERE list_id = '$list_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);
	
	echo $url;
    $conn->close();
?>