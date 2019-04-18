// Этот фрагмент кода прослушивает функции отправки данных #form. Перед этой функцией мы обрабатываем переменную event, которая хранит действие отправки данных формы для функции.

// Этот фрагмент кода проверяет, нашел ли Bootstrap Validator проблемы и остановил ли работу кода. 
$("#form").validator().on("submit", (function(event) {
		if (event.isDefaultPrevented()) {	// обработка ошибки формы...	
			formError();
			submitMSG(false, "Заполните всю форму!");
		} else { // если все в порядке! 
			event.preventDefault(); // Останавливает отправку данных формы при обновлении страницы без выбора действия в форме.
			submitForm(); // вызывает функцию submitForm(), которая отправляет данные формы в php/form.php
		}
}));

function submitForm() {
	// инициируем переменную с содержимым формы
	var name = $("#name").val();
	var email = $("#email").val();   
	var phone = $("#phone").val();   
	// инициируем объект AJAX внутри
	$.ajax({
		type: "POST",
		url: "php/form.php", // адрес размещения файла PHP
		data: "name=" + name + "&email=" + email + 'phone', // ошибка?
		// функция обратного вызова
		success : function(text) { // если запрос успешен вызываем функцию
			if (text == "success") { // проверяем на соответствие статуса запроса
				formSuccess(); // если, статус запроса == "success", то вызоваем функцию formSuccess(),
			}
		}
	})
};

function formSuccess() {
	$("#msgSubmit").removeClass("hidden");
	$("#form")[0].reset();
	submitMSG(true, "Сообщение отправлено!")
};

function formError(){
	$("#form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass();
	});
};

function submitMSG(valid, msg){
		var msgClasses;
	if(valid){
		msgClasses = "tada animated text-success text-uppercase";
	} else {
		msgClasses = "w-100 text-danger text-uppercase";
	}
	$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}


	// Поведение label
	$("input").blur( function() {

		var findLabel 	= $(this).parent().find("label"),
				inputValue	= $(this).val(),
				active 			= "label-active",
				notActive 	= "label-not-active";				

		if(inputValue == '') {
			findLabel.addClass(notActive);
			findLabel.removeClass(active);	
			console.log(inputValue + " notActive"); // Удалить потом
		}   
	 
		else {
			findLabel.addClass(active);
			findLabel.removeClass(notActive);
			console.log(inputValue + " active"); // Удалить потом
		}
		 
	});	