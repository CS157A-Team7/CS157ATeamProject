<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $list_id = $_GET['list_id'];

	$list_query = "SELECT list_id,name,description FROM list NATURAL JOIN wishlist WHERE list_id ='$list_id'";
	$list_result = $conn->query($list_query);
	if(!$list_result) die ("Database access failed: " . $conn->error);

	$list_result->data_seek(0);
	$list_row = $list_result->fetch_array(MYSQLI_ASSOC);
	
    $query = "SELECT item_id,name,description,checked FROM item NATURAL JOIN list_has_items WHERE list_id='$list_id'";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);

    $rows = $result->num_rows;
	$second_response = array();

    for($j = 0; $j < $rows; $j++)
    {
        $result->data_seek($j);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $second_response[] = $row;
    }

	$items['items'] = $second_response;
	$combine = array_merge($list_row, $items);
	$response = (object)$combine;
	
    echo json_encode($response);

    $result->close();
    $conn->close();
?>
