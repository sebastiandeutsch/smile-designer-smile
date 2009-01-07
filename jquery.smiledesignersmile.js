/*
 * smileDesignerSmile Plugin
 *
 * Copyright (c) 2009 Sebastian Deutsch <sebastian.deutsch@9elements.com>
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 */
jQuery.fn.smileDesignerSmile = function(imgUrl, options) {
	var defaults = {
		backgroundPosition : '0px 0px',
		opacity : '0.5'
	};
	
	var opts = jQuery.extend(defaults, options);
	
	var dummy = jQuery(this);
	
	dummy.css('position','absolute');
	dummy.css('top','0');
	dummy.css('left','0');
	dummy.css('background-color','transparent');
	dummy.css('background-image', 'url(' + imgUrl + ')');
	dummy.css('background-position', opts.backgroundPosition );
	dummy.css('background-repeat','no-repeat');
	dummy.css('width','100%');
	dummy.css('height','100%');
	dummy.css('opacity', opts.opacity);
	dummy.css('display','none');
	dummy.css('-moz-user-select','none');
	
	
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
			
			var oldpos = dummy.css('background-position');
			
			var cx = oldpos.split(' ')[0];
			var cy = oldpos.split(' ')[1];

			var ox = parseInt(cx.substring(0, cx.length-2));
			var oy = parseInt(cy.substring(0, cy.length-2));
												
			var x = ox+dx;
			var y = oy+dy;
			
			var newpos = x + 'px ' + y + 'px';
			dummy.css('background-position', newpos);
			console.log(newpos);
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
				var oldpos = dummy.css('background-position');
				
				var cx = oldpos.split(' ')[0];
				var cy = oldpos.split(' ')[1];
				
				var ox = parseInt(cx.substring(0, cx.length-2));
				var oy = parseInt(cy.substring(0, cy.length-2));
									
				var x = ox- (dummy.startX-e.clientX);
				var y = oy- (dummy.startY-e.clientY);
				
				dummy.startX = e.clientX;
				dummy.startY = e.clientY;
				
				var newpos = x + 'px ' + y + 'px';
				dummy.css('background-position', newpos);
				console.log(newpos);
			}
		}
	});
}
