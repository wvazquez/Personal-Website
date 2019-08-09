export function smoothScroll (event) {
    let duration = 300;
    
	var link = $( $(this).attr('href') );

	if( link.length ) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: link.offset().top
		}, duration);
	}    
}