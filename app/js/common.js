$(document).ready(function() {

	resize();	

	$(window).resize(function() {
		resize();
	});

	function resize() {
		$("#sec-4 .item-descr h3").height('auto').equalHeights();	
		$("#sec-4 .item-descr p").height('auto').equalHeights();	
	};

	$("a[href*='#']").mPageScroll2id();

	$("#Form").validator().on("submit", (function(event) {
		if (event.isDefaultPrevented()) {
      // обработка ошибки формы...
    } else {
      // все в порядке!      

	    // отменяет отправку данных формы
	    event.preventDefault();
	    submitForm();
    }
	});

	function submitForm(){
    // Инициируем переменную с содержимым формы
    var name = $("#name").val();
    var email = $("#email").val();   

    $.ajax({
      type: "POST",
      url: "php/form-process.php",
      data: "name=" + name + "&email=" + email,
      success : function(text){
        if (text == "success"){
          formSuccess();
        }
      }
    });
	}

	function formSuccess(){
    $("#msgSubmit").removeClass("hidden");
	}

}); 