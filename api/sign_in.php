<?php

  // $query = "SELECT COUNT(*) FROM account WHERE username=$user"
  // if ($query > 0) {
  //   //bad stuff
  //   die ("User with " . $conn->error);
  // }

  require_once 'login.php';


  //$query = "INSERT INTO account(username, password) VALUES ('$username', '$password')";

    $username = mysqli_real_escape_string($db,$_POST['username']); //instead of santizing here use the function from master
    $password = mysqli_real_escape_string($db,$_POST['password']);

    $sql = "SELECT username FROM account WHERE username = '$username' and password = '$password'";
    $result = mysqli_query($db,$sql);
    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    $active = $row['active'];

    $count = mysqli_num_rows($result);

    // If result matched $myusername and $mypassword, table row must be 1 row

    if($count == 1) {
      //logged in!

      echo 1; //1 or 0 for t/f
       //session_register("username");
       //$_SESSION['login_user'] = $username;

       //header("location: welcome.php");
    }else {
       $error = "Your Login Name or Password is invalid";
       echo 0;
    }

    $conn->close();

?>
