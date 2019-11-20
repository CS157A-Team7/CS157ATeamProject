<?php
	require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$post = file_get_contents('php://input');
	$lists = json_decode($post);

	for($count = 0; $count < count($lists) ; $count++)
	{
		$id = $lists[$count]->list_id;
		$items = $lists[$count]->items;
		
		for($item_count = 0; $item_count < count($items) ; $item_count++)
		{
			$item_id = $items[$item_count]->item_id;
			$query = "DELETE FROM item WHERE item_id = '$item_id'";
			$result = $conn->query($query);
			if(!$result) die("Database access failed: " . $conn->error);
			
			$add_query = "DELETE FROM list_has_items WHERE item_id = '$item_id'";
			$add_result = $conn->query($add_query);
			if(!$add_result) die("Database access failed: " . $conn->error);
		}
		
		$query = "DELETE FROM account_has_lists WHERE list_id = '$id'";
		$result = $conn->query($query);
		if(!$result) die("Database access failed: " . $conn->error);
		
		$query = "DELETE FROM list WHERE list_id = '$id'";
		$result = $conn->query($query);
		if(!$result) die("Database access failed: " . $conn->error);
		
		$add_query = "DELETE FROM wishlist WHERE list_id = '$id'";
		$add_result = $conn->query($add_query);
		if(!$add_result) die("Database access failed: " . $conn->error);
		
		$add_query = "DELETE FROM surprise_wishlist WHERE list_id = '$id'";
		$add_result = $conn->query($add_query);
		if(!$add_result) die("Database access failed: " . $conn->error);
		
		$add_query = "DELETE FROM todo_list WHERE list_id = '$id'";
		$add_result = $conn->query($add_query);
		if(!$add_result) die("Database access failed: " . $conn->error);
	}
	
	echo '1';
	
    $conn->close();
?>
