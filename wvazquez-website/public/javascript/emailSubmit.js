

export function form() {
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
}
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
    
