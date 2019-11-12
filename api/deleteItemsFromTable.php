<?php
	require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$post = file_get_contents('php://input');
	$items = json_decode($post);

	for($count = 0; $count < count($items) ; $count++)
	{
		$id = $items[$count]->item_id;
		$query = "DELETE FROM item WHERE item_id = '$id'";
		$result = $conn->query($query);
		if(!$result) die("Database access failed: " . $conn->error);
		
		$add_query = "DELETE FROM list_has_items WHERE item_id = '$id'";
		$add_result = $conn->query($add_query);
		if(!$add_result) die("Database access failed: " . $conn->error);
	}
	
	echo '1';
	
    $conn->close();
?>
