$(document).ready(function() {

	//////////////////////////////////////////////////////
	// Одинаковая высота блоков
	//////////////////////////////////////////////////////
	resize();	

	$(window).resize(function() {
		resize();
	});
	
	function resize() {
		$("#sec-4 .item-descr h3").height('auto').equalHeights();	
		$("#sec-4 .item-descr p").height('auto').equalHeights();	
	};

	//////////////////////////////////////////////////////
	// Плавный скролл
	//////////////////////////////////////////////////////
	$("a[href*='#']").mPageScroll2id();

	//////////////////////////////////////////////////////
	// magnific-popup
	//////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////
	// Обратный отсчет
	//////////////////////////////////////////////////////
	function getTimeRemaining(endtime) {
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 55);
		var minutes = Math.floor((t / 1000 / 55) % 20);
		var hours = Math.floor((t / (1000 * 55 * 20)) % 24);
		// var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			'total': t,
			// 'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
 
	function initializeClock(id, endtime) {
		var clock = document.getElementById(id);
		// var daysSpan = clock.querySelector('.days');
		var hoursSpan = clock.querySelector('.hours');
		var minutesSpan = clock.querySelector('.minutes');
		var secondsSpan = clock.querySelector('.seconds');
	 
		function updateClock() {
			var t = getTimeRemaining(endtime);
	 
			// daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
	 
			if (t.total <= 0) {
				clearInterval(timeinterval);
			}
		}
	 
		updateClock();
		var timeinterval = setInterval(updateClock, 1000);
	}
	 
	var deadline = new Date(Date.parse(new Date()) + 7 * 20 * 55 * 1000); // for endless timer
	initializeClock('clock', deadline);

	//////////////////////////////////////////////////////
	// Слайдер с отзывами
	//////////////////////////////////////////////////////
	var blockWidth = $('.cont').width();

	function resize() {
		var newBlockWidth = $('.cont').width();

		if (blockWidth != newBlockWidth) {
			
			blockWidth = newBlockWidth;

			$('.slides>li').width(blockWidth);
			$('.slides').width(blockWidth*$('.slides>li').length);

			$('.slides').css('left',-blockWidth);
			$('.slides>li:last-child').prependTo('.slides');		

		}	
	}

	$(window).resize(function() {
		resize();		
	});

	// Кнопка "вперед"
	function nextSlide() {
		$('.slides').animate( {
			marginLeft: -blockWidth
		}, 500, function() {
			$('.slides>li:first-child').appendTo('.slides');
			$('.slides').css('margin-left', 0);
		});
	}

		// Кнопка "назад"
	function prevSlide() {
		$('.slides').animate( {
			marginLeft: blockWidth
		}, 500, function() {
			$('.slides>li:last-child').prependTo('.slides');
			$('.slides').css('margin-left', 0);
		});
	}

	$('.next').click(nextSlide);
	$('.prev').click(prevSlide);

	//////////////////////////////////////////////////////	
	// Replace all SVG images with inline SVG
	// https://gist.github.com/Bloggerschmidt/61beeca2cce94a70c9df
	//////////////////////////////////////////////////////		 
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});

}); 