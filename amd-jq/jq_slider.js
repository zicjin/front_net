define(function (require, exports, module) {
return function($){

/* jQuery 'Slidey' plug-in v.1.1
 * http://www.jcwd.com.au
 * @john0514
 *
 * Copyright 2011, John Cobb
 * Free for all to use, abuse and improve under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * August 2011 */

$.fn.slidey = function(options) {
	var settings = {};	
	var defaults = {
		width: 700,			// Width + Height used to ensure consistency
		height: 300,			// Width + Height used to ensure consistency
		animation: 'fade',		// The type of animation (slide or fade)
		animationDuration: 450, 	// The duration in ms of the transition between slides
		automatic: true,			// Automatically rotate through the slides
		rotationSpeed: 4000,		// Delay in ms between auto rotation of the slides
		hoverPause: true,		// Pause the slider when any elements receive a hover event
		showControls: true,		// Show the manual slider controls
		centerControls: true,		// Center the controls vertically
		nextText: 'Next',		// Text to display in 'next' controller
		prevText: "Prev",		// Text to display in 'previous' controller
		showMarkers: true,		// Show positional markers
		centerMarkers: true,		// Center the positional indicators
		keyboardNav: true,		// Navigated the slider with arrow keys
		useCaptions: true		// Use image title text as caption
	}
	
	// Overwrite the defaults with the provided options (if any)
	settings = $.extend({}, defaults, options);
	
	// Variables
	var	$container = this;
		$slider = $('ul.slidey'),
		slides = $slider.children('li'),
		slideCount = slides.length,
		animating = false,
		paused = false,
		current = 0,
		slidePosition = 1,
		next = 0,
		$active = slides.eq(current),
		forward = 'forward',
		back = 'backward'
	
	slides.css({'height':settings.height,'width':settings.width});
	$slider.css({'height':settings.height,'width':settings.width});
	$container.css({'height':settings.height,'width':settings.width});
	
	// Phat Controller(s)
	if(settings.showControls){
		
		// Create the elements for the controls
		$controlContainer = $('<ul class="slidey-controls"></ul>');
		$next = $('<li><a href="#" class="slidey-next" class="controls">'+settings.nextText+'</a></li>');
		$previous = $('<li><a href="#" class="slidey-prev" class="controls">'+settings.prevText+'</a></li>');
		
		// Bind click events to the controllers
		$next.click(function(e){
			e.preventDefault();
			if(!animating)
				slideyGo(forward,false);
		});
		
		$previous.click(function(e){
			e.preventDefault();
			if(!animating)
				slideyGo(back, false);
		});
		
		// Put 'em all together and what do you get? Ding dong. Hotdog
		$next.appendTo($controlContainer);
		$previous.appendTo($controlContainer);
		$controlContainer.appendTo($container);
		
		// Vertically center the controllers
		if(settings.centerControls){
			$control = $next.children('a');
			offset = ($container.height() -$control.height()) / 2;
			$next.children('a').css('top', offset).show();
			$previous.children('a').css('top', offset).show();
		}
		
	}
	
	// Let's put in some markers
	if(settings.showMarkers){
		
		$markerContainer = $('<ol class="slidey-markers"></ul>');
		
		//Create a marker for each banner and add append it to the wrapper
		$.each(slides,function(key,value){
			if(settings.animType == 'slide'){
				if(key != 0 && key != slideCount-1)
					$marker = $('<li><a href="#">'+key+'</a></li>');
			}
			else{
				key++
				$marker = $('<li><a href="#">'+key+'</a></li>');
			}
			
			$marker.click(function(e){
				e.preventDefault();
				if(!$(this).hasClass('active-marker') && !animating)
					slideyGo(false,key);
			});
			
			$marker.appendTo($markerContainer);
			
		});
		
		markers = $markerContainer.children('li');
		markers.eq(current).addClass('active-marker');
		$markerContainer.appendTo($container);
		
		if(settings.centerMarkers){
			offset = (settings.width - $markerContainer.width() )/ 2;
			$markerContainer.css('left', offset);
		}
		
	}
	
	// Enable keyboard navigation
	if(settings.keyboardNav){
		
		$(document).keyup(function(event) {
			
			if(!paused){
				clearInterval(slideyInterval);
				paused=true;
			}
			
			if (!animating) {
				if(event.keyCode == 39){
					event.preventDefault();
					slideyGo(forward, false);
				}
				else if(event.keyCode == 37){
					event.preventDefault();
					slideyGo(back,false);
				}
			}
			
			if(paused & settings.automatic){
				slideyInterval = setInterval(function(){ slideyGo(forward) }, settings.rotationSpeed);
				paused=false;
			}
			
		});
	}
	
	// Show captions
	if(settings.useCaptions){
		
		$.each(slides, function(key, value){
			
			var $slide = $(value);
			var $slideChild = $slide.children('img:first-child');
			var title = $slideChild.attr('title');
			
			if(title){
				var $caption = $('<p class="slidey-caption">'+title+'</p>');
				$caption.appendTo($slide);
			}
		});
		
	}
	
	// Run a bubble-bath and float in that m'fkr like a hovercraft.
	if(settings.hoverPause && settings.automatic){
			
		$container.hover(function(){
			if(!paused){
				clearInterval(slideyInterval);
				paused=true;
			}
		},function(){
			if(paused){
				slideyInterval = setInterval(function(){ slideyGo(forward) }, settings.rotationSpeed);
				paused=false;
			}
		});
		
	}
	
	
	// We have to make a few tweaks if we're sliding instead of fading
	if(settings.animation == 'slide'){
		
		$first = slides.eq(0);
		$last = slides.eq(slideCount-1);
		
		$first.clone().addClass('clone').removeClass('slide').appendTo($slider);
		$last.clone().addClass('clone').removeClass('slide').prependTo($slider);
		
		slides = $slider.children('li');
		slideCount = slides.length;
		
		$wrapper = $('<div class="slidey-wrapper"></div>').css({
			'width' : settings.width,
			'height' : settings.height,
			'overflow' : 'hidden',
			'position' : 'relative'
		});
		
		$slider.css({
			'width' : settings.width*slideCount,
			'left' : -settings.width
		});
		
		slides.css({
			'float': 'left',
			'position': 'relative',
			'display' : 'list-item'
		});
		
		$wrapper.prependTo($container);
		$slider.appendTo($wrapper);
		
	}
	
	// Check position to see if we're at the first or last slide and update 'next' accordingly
	var checkPosition = function(direction){
		
		if(settings.animation == 'fade'){
			
			if(direction == forward){
				!$active.next().length ? next = 0 : next++
			}
			else if(direction == back){
				!$active.prev().length ? next = slideCount-1 : next--
			}
			
		}
		
		if(settings.animation == 'slide'){
			
			if(direction == forward){
				next = slidePosition + 1;
			}
			
			if(direction == back){
				next = slidePosition - 1;
			}
		}
		
		return next;
	}
	
	// Kick off the rotation if we're on auto pilot
	if(settings.automatic){
		var slideyInterval = setInterval(function(){ slideyGo(forward,false) }, settings.rotationSpeed);
	}
	
	// Show the first slide	
	slides.eq(current).show();
	$slider.show();
	
	// What comes next? Hey, Bust a move!
	var slideyGo =  function(direction,position){
		
		if(!animating){
			
			if(direction){
				next = checkPosition(direction);
			}
			else if(position && settings.animation == 'fade'){
				next = position-1;
			}else{
				next = position;
			}
			
			animating = true;
			
			if(settings.animation == 'fade'){
				
				if(settings.showMarkers){
					markers.eq(current).removeClass('active-marker');
					markers.eq(next).addClass('active-marker');
				}
				
				$next = slides.eq(next);
				
				$active.fadeOut(settings.animationDuration);
				$next.fadeIn(settings.animationDuration, function() {
					$active.hide();
					current = next;
					$active = $next;
					animating = false;
				});
			}
			else if(settings.animation == 'slide'){
				
				if(settings.showMarkers){
					
					markers.eq(slidePosition-1).removeClass('active-marker');
					
					if(next==slideCount-1){
						markers.eq(0).addClass('active-marker');
					}else if(next==0){
						markers.eq(slideCount-3).addClass('active-marker');
					}else{
						markers.eq(next-1).addClass('active-marker');
					}
					
				}
				
				$slider.animate({'left': -next*settings.width}, settings.animationDuration, function(){
					
					if(next==0){
						slidePosition=slideCount-2;
						$slider.css({'left' : -slidePosition*settings.width});
					}else if(next==slideCount-1){
						slidePosition=1;
						$slider.css({'left' : -settings.width});
					}else{
						slidePosition=next;
					}
					
					animating=false;
					
				});
				
			}
			
		}
		
	}
	return this; // KTHXBYE
	
}

}});