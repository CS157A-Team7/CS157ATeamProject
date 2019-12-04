<?php

$username = $_GET['username'];
setcookie('username', $username, time() -2592000, '/');

?>