<?php

  // $query = "SELECT COUNT(*) FROM account WHERE username=$user"
  // if ($query > 0) {
  //   //bad stuff
  //   die ("User with " . $conn->error);
  // }

  require_once 'login.php';
  require_once 'sanitize.php';

    $conn = new mysqli($host, $user, $password, $dbname);
    if($conn->connect_error) die($conn->connect_error);
	
  //$query = "INSERT INTO account(username, password) VALUES ('$username', '$password')";

    //$username = mysqli_real_escape_string($db,$_POST['username']); //instead of sanitizing here use the function from api folder
    //$password = mysqli_real_escape_string($db,$_POST['password']);

    $username = sanitizeString($_GET['username']);
    $password = sanitizeString($_GET['password']);

    $sql = "SELECT username FROM account WHERE username = '$username' and password = '$password'";
    //$result = mysqli_query($db,$sql);
	$result = $conn->query($sql);
    //$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	$rows = $result->num_rows;
    //$active = $row['active'];

    //$count = mysqli_num_rows($result);

    // If result matched $myusername and $mypassword, table row must be 1 row

    if($rows === 1) {
      //logged in!

      echo 1; //1 or 0 for t/f
       //session_register("username");
       //$_SESSION['login_user'] = $username;

       //header("location: welcome.php");
    }else {
       echo 0;
       $error = "Your Login Name or Password is invalid";
    }

    $conn->close();

?>
