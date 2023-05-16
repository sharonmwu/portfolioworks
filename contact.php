<?php 
$email="contact@example.com";

$name=addcslashes($_POST['name'], "<>");
$subject=($_POST['subject']);
$user_email=$_POST['email'];
$message=htmlspecialchars($_POST['message']);
$message_send='<html><head><title> </title></head><body>'.$message.'</body></html>';

if($name!=null && $subject!=null && $user_email!=null && $message!=null){
	if(filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL)){
		$headers[] = 'MIME-Version: 1.0';
		$headers[] = 'Content-type: text/html; charset=UTF-8';
		$headers[] = 'From:'.$name.'<'.$user_email.'>';
		mail($email,$subject,$message_send,implode("\r\n", $headers));
		echo 'sent';
	}else{
		echo 'Incorrect e-mail';
	}
}
else{
	echo 'Please fill all fields. Thank you.';
}
?>