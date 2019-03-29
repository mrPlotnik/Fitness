$(document).ready(function() {

	resize();

	function resize() {
		$("#sec-3 .item-descr h3").height('auto').equalHeights();	
		$("#sec-3 .item-descr p").height('auto').equalHeights();	
		console.log('done!');
	};

	$(window).resize(function() {
		resize();
	});

}); 