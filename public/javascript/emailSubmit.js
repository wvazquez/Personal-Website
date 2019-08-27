var $name = $('#input-name');
var $email= $('#input-email');
var $message = $('#input-message');
var input = $('.validate-input .input');

var allValidated;
export function form(event) {
    event.preventDefault();
    const $recaptch = $('#g-recaptcha-response');
    console.log($recaptch.val());
    reCaptcha($recaptch);
    
    allValidated = true;
    var data = {};

    input.map(function(index,element){
        data[element.name] = element.value.trim(); 
        if(validate(element) === false){
            showValidate(element);
            allValidated = false;
        }
    });
    focus();
    if(allValidated){
        // const $recaptch = $('#g-recaptcha-response');
        // console.log($recaptch);
        // reCaptcha($recaptch);
        // postData(data);
    }
}
function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == '' || $(input).val().trim().length < 5){
            return false;
        }
        return true;
    }
}

function showValidate(input) {
    $(input).parent().addClass('alert-validate');
}

function hideValidate(input) {
    $(input).parent().removeClass('alert-validate');
}

function postData(data){
    $.post( '/sendemail', data, function(res){
        $name.val("");
        $email.val("");
        $message.val("");
    });
}
function reCaptcha(value){
    $.post('/recaptcha', value, function(data){
        console.log("This is the front eend data: ", data)
    });

}
function focus(){
    input.each(function(){

        $(this).on("focusin", function(){
           hideValidate(this);
        });
        // $(this).on("focusout", function(){
        //     console.log(typeof this.name);
        //     // console.log()
        //     if(this.name == 'email'){
        //         if(validate(this)){
        //             return hideValidate(this);
        //         }else{
        //             return showValidate(this);
        //         }
        //     }else{
        //         if(!validate(this)){
        //             return showValidate(this);
        //         }
        //     }
            
        //  });
    });
}