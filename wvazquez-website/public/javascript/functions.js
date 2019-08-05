$( document ).ready(function() {
    console.log('ready');
    $('.project-overlay').on('click', (event)=>{
        let projectID = event.currentTarget.id;
        
        $.get(`/projects/${projectID}`, (data)=>{
            setProjectOverview(data);
            console.log(data);
            $('.project-overview').show(100);
            $('.project-container').css('left', '-50%');
        });
        
    });

    $('.back-arrow').on('click', ()=>{
        $('.project-container').css('left', 0);
        $('.project-overview').fadeOut(700);
    });

    
    smoothScroll();

});

function setProjectOverview(data){
    $('#overview-title').text(data.title);
    $('#overview-link').attr('href', data.url)
    // $('<a/>',{
    //     text: "Visit Website"
    // }).attr('href', data.url);
    const $content = $('.project-content');
    $content.html(""); //removes previously loaded data.
    data.assets.forEach(asset => {
        console.log(asset);
        $('<img />').attr("src", asset.src)
                    .attr('alt', asset.title)
                    .appendTo($content);

        $( "<p/>", {
            text: asset.desc,
          }).appendTo($content);
    });
    
}

function smoothScroll () {
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