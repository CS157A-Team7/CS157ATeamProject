<?php
    require_once 'login.php';
    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);

    $list_id = $_GET['list_id'];

    $query = "SELECT item_id,name,description,checked FROM item NATURAL JOIN list_has_items WHERE list_id='$list_id'";
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
