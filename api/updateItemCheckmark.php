<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

	$checkmark = $_POST['checkmark'];
	$item_id = $_POST['item_id'];
	$list_type = $_POST['list_type'];
	$description = $_POST['description'];

    $query = "UPDATE item SET checked ='$checkmark' WHERE item_id = '$item_id';";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);
	
	if($list_type == 1){
		$desc_query = "UPDATE item SET description = '$description' WHERE item_id = '$item_id'";
		$desc_result = $conn->query($desc_query);
		if(!$desc_result) die ("Database access failed: " . $conn->error);
	}
	

    $conn->close();
?>