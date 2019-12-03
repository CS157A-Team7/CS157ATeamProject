<?php
function encrypt($var)
{
	$salt1 = "q3v!@k";
	$salt2 = "m5@%";
	$token = hash('ripemd128', "$salt1$var$salt2");
	return $token;
}
?>