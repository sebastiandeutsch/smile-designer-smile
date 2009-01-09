/*
 * smileDesignerSmile Plugin V0.5
 *
 * Copyright (c) 2009 Sebastian Deutsch <sebastian.deutsch@9elements.com>
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 */
jQuery.fn.smileDesignerSmile = function(imgUrl, options) {
	// get defaults
	var defaults = {
		backgroundPosition	: '0px 0px',
		opacity				: '0.5',
		logging				: true
	};
	
	var opts = jQuery.extend(defaults, options);

	// check for firebug
	if (!window.console || !window.console.firebugVersion)
	{
	        var names       =  ["log", "debug", "info", "warn", "error",
								"assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd",
								"count", "trace", "profile", "profileEnd"];
	        window.console  =  {};
	        for (i in names)
	        {
	                window.console[names[i]] = function() {};
	        }

	}
	
	// get the object
	var dummy = jQuery(this);
	
	dummy.css('position','absolute');
	dummy.css('top','0');
	dummy.css('left','0');
	dummy.css('backgroundColor','transparent');
	dummy.css('backgroundImage', 'url(' + imgUrl + ')');
	dummy.css('backgroundPosition', opts.backgroundPosition );
	dummy.css('backgroundRepeat','no-repeat');
	dummy.css('width','100%');
	dummy.css('height','100%');
	dummy.css('opacity', opts.opacity);
	dummy.css('display','none');
	
	// make it unselectable
	dummy.css('MozUserSelect','none');		// FF
	dummy.css('KhtmlUserSelect','none');	// SF + CHROME
	dummy.attr('unselectable', 'on')		// IE + OPERA
	
	dummy.is_hidden = true;
	
	jQuery(document).dblclick(function() {
		if(dummy.is_hidden) {
			dummy.show();
			dummy.is_hidden = !dummy.is_hidden;
		} else {
			dummy.hide();
			dummy.is_hidden = !dummy.is_hidden;
		}
	});
	
	$(document).keyup(function(event){
		if(!dummy.is_hidden) {
			var dx = 0;
			var dy = 0;
			
			if(event.keyCode == 37) { /* cursor left */
				dx = -1; dy =  0;
			}
			if(event.keyCode == 38) { /* cursor top */
				dx =  0; dy = -1;
			}
			if(event.keyCode == 39) { /* cursor right */
				dx =  1; dy =  0;
			}
			if(event.keyCode == 40) { /* cursor down */
				dx =  0; dy =  1;
			}
			
			var oldpos = dummy.css('backgroundPosition');
			
			var cx = oldpos.split(' ')[0];
			var cy = oldpos.split(' ')[1];

			var ox = parseInt(cx.substring(0, cx.length-2));
			var oy = parseInt(cy.substring(0, cy.length-2));
												
			var x = ox+dx;
			var y = oy+dy;
			
			var newpos = x + 'px ' + y + 'px';
			dummy.css('backgroundPosition', newpos);
			
			if(opts.logging) {
				console.log(newpos);
			}
		}
	});
	
	
	dummy.mouseup(function(e) {
		if(!dummy.is_hidden) {
			dummy.pressed = false;
			dummy.endX = e.clientX;
			dummy.endY = e.clientY;
		}
	});

	dummy.mousedown(function(e) {
		if(!dummy.is_hidden) {
			dummy.pressed = true;
			dummy.startX = e.clientX;
			dummy.startY = e.clientY;
		}
	});
	
	dummy.mousemove(function(e) {
		if(!dummy.is_hidden) {
			if(dummy.pressed) {
				var oldpos = dummy.css('backgroundPosition');
				
				var cx = oldpos.split(' ')[0];
				var cy = oldpos.split(' ')[1];
				
				var ox = parseInt(cx.substring(0, cx.length-2));
				var oy = parseInt(cy.substring(0, cy.length-2));
									
				var x = ox- (dummy.startX-e.clientX);
				var y = oy- (dummy.startY-e.clientY);
				
				dummy.startX = e.clientX;
				dummy.startY = e.clientY;
				
				var newpos = x + 'px ' + y + 'px';
				dummy.css('backgroundPosition', newpos);

				if(opts.logging) {
					console.log(newpos);
				}
			}
		}
	});
}
