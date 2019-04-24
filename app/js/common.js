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




	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Fitness Club</small>';
			}
		}
	});
	




}); 