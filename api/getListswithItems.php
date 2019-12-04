<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $username = $_POST['username'];

    $query = "SELECT list_id,name,description FROM list NATURAL JOIN account_has_lists WHERE username='$username'";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);

    $rows = $result->num_rows;
    $response = array();

    for($i = 0; $i < $rows; $i++)
    {
        $result->data_seek($i);
        $row = $result->fetch_array(MYSQLI_ASSOC);
		
		$list_id = $row['list_id'];
		
		$surprise_query = "SELECT list_id FROM surprise_wishlist WHERE list_id='$list_id'";
		$todo_query = "SELECT list_id FROM todo_list WHERE list_id='$list_id'";
		
		$surprise_result = $conn->query($surprise_query);
		if(!$surprise_result) die ("Database access failed: " . $conn->error);
		
		$surprise_rows = $surprise_result->num_rows;
		
		$todo_result = $conn->query($todo_query);
		if(!$todo_result) die ("Database access failed: " . $conn->error);
		
		$todo_rows = $todo_result->num_rows;
		
		if($surprise_rows === 1){
			$row['list_type'] = 'surprise';
			
			$url_query = "SELECT url from wishlist WHERE list_id = '$list_id'";
			$url_result = $conn->query($url_query);
			if(!$url_result) die ("Database access failed: " . $conn->error);
			
			$url_row = $url_result->num_rows;
			if($url_row === 1){
				$url_result->data_seek(0);
				$url = $url_result->fetch_array(MYSQLI_ASSOC);
				
				$row['url'] = $url['url'];
			}
			
			$date_query = "SELECT expiration_date from surprise_wishlist WHERE list_id = '$list_id'";
			$date_result = $conn->query($date_query);
			if(!$date_result) die ("Database access failed: " . $conn->error);
			
			$date_row = $date_result->num_rows;
			if($date_row === 1){
				$date_result->data_seek(0);
				$date = $date_result->fetch_array(MYSQLI_ASSOC);
				
				$row['date'] = $date['expiration_date'];
			}
			
			$owner_query = "SELECT owner from surprise_wishlist WHERE list_id = '$list_id'";
			$owner_result = $conn->query($owner_query);
			if(!$owner_result) die ("Database access failed: " . $conn->error);
			
			$owner_row = $owner_result->num_rows;
			if($owner_row === 1){
				$owner_result->data_seek(0);
				$owner = $owner_result->fetch_array(MYSQLI_ASSOC);
				
				$row['owner'] = $owner['owner'];
			}
			
			$type_query = "SELECT type from surprise_wishlist WHERE list_id = '$list_id'";
			$type_result = $conn->query($type_query);
			if(!$type_result) die ("Database access failed: " . $conn->error);
			
			$type_row = $type_result->num_rows;
			if($type_row === 1){
				$type_result->data_seek(0);
				$type = $type_result->fetch_array(MYSQLI_ASSOC);
				
				$row['type'] = $type['type'];
			}
			
		}
		elseif($todo_rows === 1){
			$row['list_type'] = 'todo';
			$date_query = "SELECT date from todo_list WHERE list_id = '$list_id'";
			$date_result = $conn->query($date_query);
			if(!$date_result) die ("Database access failed: " . $conn->error);
			
			$date_row = $date_result->num_rows;
			if($date_row === 1){
				$date_result->data_seek(0);
				$date = $date_result->fetch_array(MYSQLI_ASSOC);
				
				$row['date'] = $date['date'];
			}
		}
		else{
			$row['list_type'] = 'wish';
			
			$url_query = "SELECT url from wishlist WHERE list_id = '$list_id'";
			$url_result = $conn->query($url_query);
			if(!$url_result) die ("Database access failed: " . $conn->error);
			
			$url_row = $url_result->num_rows;
			if($url_row === 1){
				$url_result->data_seek(0);
				$url = $url_result->fetch_array(MYSQLI_ASSOC);
				
				$row['url'] = $url['url'];
			}
		}
		
		
		$additional_query = "SELECT item_id,name,description,checked FROM item NATURAL JOIN list_has_items WHERE list_id='$row[list_id]'";
        $additional_result = $conn->query($additional_query);
		if(!$additional_result) die ("Database access failed: " . $conn->error);
		
		$additional_rows = $additional_result->num_rows;
		$second_response = array();
		
		for($j = 0; $j < $additional_rows; $j++)
		{
			$additional_result->data_seek($j);
			$additional_row = $additional_result->fetch_array(MYSQLI_ASSOC);
			$second_response[] = $additional_row;
		}			

		$items['items'] = $second_response;
		$combine = array_merge($row, $items);
		
		$response[] = $combine;
    }

    echo json_encode($response);

    $result->close();
    $conn->close();
?>