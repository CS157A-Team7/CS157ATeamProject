<?php
    require_once 'login.php';
	
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$_POST = json_decode(file_get_contents("php://input"),true);
	$list = $_POST['list'];
	$friends = $_POST['selected_friends'];
	
	$list_id = $list['list_id'];
	$name = $list['name'];
	$description = $list['description'];
	$owner = $list['owner'];
	$expiration_date = $list['date'];
	$expiration_date = !empty($expiration_date) ? "'$expiration_date'" : "NULL";
	$url = $list['url'];
	$items = $list['items'];
	
	print_r ($list);
	echo $friends[0]['username'];
	
	
	
	$update_query = "UPDATE surprise_wishlist SET type=0 WHERE list_id = '$list_id'";
	$result = $conn->query($update_query);
	if(!$result) die ("Database access failed: " . $conn->error);
	
	$query = "INSERT INTO list(name, description) VALUES ('$name', '$description')";
	
	if ($conn->query($query) === TRUE) {
		$new_list_id = $conn->insert_id;
	
		$add_query = "INSERT INTO wishlist(list_id, url) VALUES ('$new_list_id', '$url')";
		if($conn->query($add_query) === TRUE){
			echo 'Added to Wishlist table';
		}
		else{
			echo '0';
		}
		
		$other_query = "INSERT INTO surprise_wishlist(list_id, owner, type, expiration_date) VALUES ('$new_list_id', '$owner', 1, $expiration_date)";
		if($conn->query($other_query) === TRUE){
			echo 'Added to surprise_wishlist';
		}
		else{
			echo $conn->error;
		}
		
		for($i = 0; $i < count($items); $i++){
			$item_name = $items[$i]['name'];
			$item_description = $items[$i]['description'];
			
			$add_item_query = "INSERT INTO item(name, description, checked) VALUES ('$item_name', '$item_description', 0)";
			if ($conn->query($add_item_query) === TRUE) {
				$new_item_id = $conn->insert_id;
				$list_has_items_query = "INSERT INTO list_has_items(list_id, item_id) VALUES ('$new_list_id', '$new_item_id')";
				if($conn->query($list_has_items_query) === TRUE){
					echo '1';
				}
				else{
					echo '0';
				}
			}
		}
		
		for($i = 0; $i < count($friends); $i++){
			$username = $friends[$i]['username'];
			$collaborates_on_query = "INSERT INTO collaborates_on(username, list_id) VALUES ('$username', '$new_list_id')";
			if($conn->query($collaborates_on_query) === TRUE){
				echo '1';
			}
			else{
				echo $conn->error;
			}
		}
	}
	
    $conn->close();
?>