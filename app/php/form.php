<?php
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];

$EmailTo = "alenakrivohiza@gmail.com";
$Subject = "Fitness. Новый клиент!";

// готовим тело электронного письма
$Body .= "Name: ";
$Body .= $name;
$Body .= "n";

$Body .= "Email: ";
$Body .= $email;
$Body .= "n";

$Body .= "Phone: ";
$Body .= $phone;
$Body .= "n";

// отправляем электронную почту
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// перенаправляем на страницу сообщения об успешной отправке данных формы
if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>