<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
	$errorMSG = "Введите Имя ";
} else {
	$name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
	$errorMSG .= "Неверный E-mail адрес ";
} else {
	$email = $_POST["email"];
}

// PHONE
if (empty($_POST["phone"])) {
	$errorMSG .= "Неверный номер ";
} else {
	$phone = $_POST["phone"];
}

$EmailTo = "alenakrivohiza@gmail.com";
$Subject = "Fitness. Новый клиент!";

// готовим тело электронного письма
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";

$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";

$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";

// отправляем на электронную почту
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// перенаправляем на страницу сообщения об успешной отправке данных формы
if ($success && $errorMSG == "") {
	echo "success";
} 
else {
	if($errorMSG == "") {
		echo "Что-то пошло не так :(";
	} else {
		echo $errorMSG;
	}
}

?>