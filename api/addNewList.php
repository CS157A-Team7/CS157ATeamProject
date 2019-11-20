<?php
	require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
	$name = $_GET['name'];
	$description = $_GET['description'];
	$url = $_GET['url'];
	$owner = $_GET['owner'];
	$type = $_GET['type'];
	$expiration_date = $_GET['expiration_date'];
	$date = $_GET['date'];
	$username = $_GET['username'];
	$list_type = $_GET['listType'];
	
	echo $list_type;
	
	$expiration_date = !empty($expiration_date) ? "'$expiration_date'" : "NULL";
	$date = !empty($date) ? "'$date'" : "NULL";
	
	$query = "INSERT INTO list(name, description) VALUES ('$name', '$description')";
	
	if ($conn->query($query) === TRUE) {
		$list_id = $conn->insert_id;
		$account_has_list_query = "INSERT INTO account_has_lists(username, list_id) VALUES ('$username', '$list_id')";
		
		if($conn->query($account_has_list_query) === TRUE){
				echo 'Added to account_has_list table';
			}
		else{
			echo $conn->error;
		}
	
		if($list_type == 0){
			$add_query = "INSERT INTO wishlist(list_id, url) VALUES ('$list_id', '$url')";
			if($conn->query($add_query) === TRUE){
				echo 'Added to Wishlist table';
			}
			else{
				echo '0';
			}
		}
		elseif($list_type == 1){
			$add_query = "INSERT INTO wishlist(list_id, url) VALUES ('$list_id', '$url')";
			if($conn->query($add_query) === TRUE){
				echo 'Added to Wishlist table';
			}
			else{
				echo '0';
			}
			
			$other_query = "INSERT INTO surprise_wishlist(list_id, owner, type, expiration_date) VALUES ('$list_id', '$owner', '$type', $expiration_date)";
			if($conn->query($other_query) === TRUE){
				echo 'Added to surprise_wishlist';
			}
			else{
				echo '0';
			}
		}
		else{
			$add_query = "INSERT INTO todo_list(list_id, date) VALUES ('$list_id', $date)";
			if($conn->query($add_query) === TRUE){
				echo 'Added to todo_list';
			}
			else{
				echo $conn->error;
			}
		}
	}
	else{
		die ("Database access failed: " . $conn->error);
	}
	
    $conn->close();
?>