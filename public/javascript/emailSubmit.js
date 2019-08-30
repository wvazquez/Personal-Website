var $name = $('#input-name');
var $email= $('#input-email');
var $message = $('#input-message');
var input = $('.validate-input .input');
import {validateRecaptcha, getRecaptcha} from './recaptcha.js';


export function formSubmit(event) {
    event.preventDefault();
    input.each(function(){
        $(this).on("focusin", function(){
            hideInvalidMessage(this);
        });
    });

    var inputData = validatedData();

    if(inputData && validateRecaptcha()){
        inputData.recaptcha = getRecaptcha();
        postData(inputData);
    }
}


function validatedData(){
    let data = {};
    let hasIncompleteData = false;

    $.each(input, (index, element) => {
        if(validatedRegex(element) === false){
            showInvalidMessage(element);
            hasIncompleteData = true;
            return null;
        }
        data[element.name] = element.value.trim(); 
    });

    return (hasIncompleteData) ? null : data;
}
function validatedRegex(input) { 
    let regexString = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    let inputName = $(input).attr('type') || $(input).attr('name');
    let inputValue = $(input).val().trim();

    if((inputName == 'email' && inputValue.match(regexString) == null) || (inputValue == '' || inputValue.length < 5)) {
            return false;
    }
    return true;
}

function showInvalidMessage(input) {
    $(input).parent().addClass('alert-validate');
}

function hideInvalidMessage(input) {
    $(input).parent().removeClass('alert-validate');
}

function postData(data){
    $.post( '/sendemail', data, function(res){
        if(res === 'good'){
            alert("success");
            $name.val("");
            $email.val("");
            $message.val(""); 
            grecaptcha.reset();  
        }else{
            alert('error');
        };
        
    });
}