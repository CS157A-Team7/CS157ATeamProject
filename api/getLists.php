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