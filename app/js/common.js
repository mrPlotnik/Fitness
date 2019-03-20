$(document).ready(function() {

	resize();

	$(window).resize(function() {
		resize();
	});

	function resize() {
		$("#sec-3 .item-descr h3").equalHeights();	
		$("#sec-3 .item-descr p").equalHeights();	
		console.log('Done!');
	};	

}); 