$(document).ready(function() {

	// Этот фрагмент кода прослушивает функции отправки данных #form. Перед этой функцией мы обрабатываем переменную event, которая хранит действие отправки данных формы для функции.

	// Этот фрагмент кода проверяет, нашел ли Bootstrap Validator проблемы и остановил ли работу кода. 
	$("#form").validator().on("submit", (function(event) {
		if (event.isDefaultPrevented()) {	// обработка ошибки формы...	
			formError(); // вызываем функцию formError()
			submitMSG(false, "Заполните всю форму!");
		} else { // если все в порядке! 
			event.preventDefault(); // Останавливает отправку данных формы при обновлении страницы без выбора действия в форме.
			submitForm(); // вызывает функцию submitForm()
		}
	}));

	// Функция, которая отправляет данные формы в php/form.php
	function submitForm() {
		// инициируем переменную с содержимым формы
		var name = $("#name").val();
		var email = $("#email").val();   
		var phone = $("#phone").val();   
		// инициируем объект AJAX внутри
		$.ajax({
			type: "POST",
			url: "php/form.php", // адрес размещения файла PHP
			data: "name=" + name + "&email=" + email + "&phone=" + phone, 
			// Функция обратного вызова вызывается, когда объект AJAX успешно принял информацию от скрипта PHP
			success : function(text) { // если запрос успешен вызываем функцию
				if (text == "success") { // проверяем на соответствие статуса запроса
					console.log("ЗАЕБИСЬ");
					formSuccess(); // если, статус запроса == "success", то вызоваем функцию formSuccess()
				} else {
					formError();
					submitMSG(false, text);
				}
			}	
		});
	};

	function formSuccess() {	
		console.log("ПИЗДАТО");
		$("#form")[0].reset();
		submitMSG(true, "Сообщение отправлено!");
	};

	function formError(){
		$("#form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	};

	function submitMSG(valid, msg) {
		var msgClasses;
		console.log("ОХУЕННО");
		if (valid) {
			msgClasses = "tada animated text-success text-uppercase";
		}
		else {
			msgClasses = "w-100 text-danger text-uppercase";
		}

		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
		
	};

	// ПОВЕДЕНИЕ ФОРМЫ

	// появление, вызов формы 
	$(".free-train").click(function() {		

		$("#sec-form").fadeIn(600);
		$("#sec-form").css("display", "flex");	

	});

	// закрытие формы
	$(".close").click(function() {		

		$("#sec-form").fadeOut(600, function() {

			$("#form")[0].reset();	
			$("#msgSubmit").removeClass().addClass("invisible");	
			$("label").removeClass().addClass("label-not-active");

		});		

	});

	// Поведение label
	$("input").blur( function() {

		if( $(this).val() !== '') {
			$(this).parent().find("label").removeClass().addClass("label-active"); // добавляем класс						
		}
				 
	});	

}); 	