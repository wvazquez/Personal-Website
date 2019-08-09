export function smoothScroll (tag, text) {
    let duration = 300;
    
    	$('nav a[href^="#"]').on('click', function(event) {
    
            var link = $( $(this).attr('href') );
            
    
    	    if( link.length ) {
    	        event.preventDefault();
    	        $('html, body').animate({
    	            scrollTop: link.offset().top
    	        }, duration);
    	    }
    	});
    
  }