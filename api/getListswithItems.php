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
			$row['type'] = 'surprise';
		}
		elseif($todo_rows === 1){
			$row['type'] = 'todo';
		}
		else{
			$row['type'] = 'wish';
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