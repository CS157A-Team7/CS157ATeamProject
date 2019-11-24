<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	$checkmark = $_POST['checkmark'];
	$item_id = $_POST['item_id'];

    $query = "UPDATE item SET checked ='$checkmark' WHERE item_id = '$item_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);
	

    $conn->close();
?>