

export function validateRecaptcha(){
    const $recaptcha = $('#g-recaptcha-response');
    if($recaptcha.val() == ""){
        alert("Please Complete reCAPTCHA");
        return false;
    }
    
     return true;    
}

export function getRecaptcha(){
    return $('#g-recaptcha-response').val();
}