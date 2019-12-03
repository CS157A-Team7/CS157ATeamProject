<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $username = $_POST['username'];

    $query = "(SELECT 'Username 1' AS friend FROM friends_with WHERE 'Username 2'='$username')
	UNION
	(SELECT 'Username 2' AS friend FROM friends_with WHERE 'Username 1'='$username')";
    $result = $conn->query($query);
    if(!$result) die ("Database access failed: " . $conn->error);

    $rows = $result->num_rows;
    $response = array();

    for($j = 0; $j < $rows; $j++)
    {
        $result->data_seek($j);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $response[] = $row;
    }

    echo json_encode($response);

    $result->close();
    $conn->close();
?>