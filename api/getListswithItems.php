<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $username = $_POST['username'];

    $query = "SELECT list_id,name,description FROM list NATURAL JOIN account_has_list WHERE username='$username'";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);

    $rows = $result->num_rows;
    $response = array();

    for($i = 0; $i < $rows; $i++)
    {
        $result->data_seek($i);
        $row = $result->fetch_array(MYSQLI_ASSOC);
		
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