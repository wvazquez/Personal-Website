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
    form();

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



function form() {
    var validated = true;
    var input = $('.validate-input .input');

    

    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var check = true;
        

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
            validated=true;
        }

        if(validated){
            var $name = $('#input-name');
            var $email= $('#input-email');
            var $message = $('#input-message')

            var data={
                name : $name.val().trim(),
                email : $email.val().trim(),
                message : $message.val().trim(),
            }

            

            console.log(data);


            $.post( '/sendemail', data, function(res){
                $name.val("");
                $email.val("");
                $message.val("");
            });
        }
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                validated = false;
                return validated;
            }
        }
        else {
            if($(input).val().trim() == ''){
                validated = false;
                return validated;
            }

        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
}