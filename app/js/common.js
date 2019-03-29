$(document).ready(function() {

	resize();

	function resize() {
		$("#sec-3 .item-descr h3").height('auto').equalHeights();	
		$("#sec-3 .item-descr p").height('auto').equalHeights();	
		// $("#sec-2-2 h3").height('auto').equalHeights();	
		// $("#sec-2-2 .img-container p").height('auto').equalHeights();	
		
	};

	$(window).resize(function() {
		resize();
	});

}); 