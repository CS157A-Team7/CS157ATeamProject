<?php

$host = "localhost";
$user = "root";
$password = "testPassword";
$dbname = "cs157a";

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];
#$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "select * from emp";

$result = mysqli_query($con,$sql);

if(!$result) {
	http_response_code(404);
	die(mysqli_error($con));
}

for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }

$con->close();
?>