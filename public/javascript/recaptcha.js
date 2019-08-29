

export function validateRecaptcha(){
    const $recaptcha = $('#g-recaptcha-response');
    if($recaptcha.val() == ""){
        handleRecaptchaError("Please Complete reCAPTCHA");
    }
    
     return true;    
}

function handleRecaptchaError(error){
    alert(`${error}`)
    return false;
}

export function getRecaptcha(){
    const $recaptcha = $('#g-recaptcha-response');
    // $.post('/recaptcha', $recaptcha, function(data){
    //     console.log("IT reached here data :" , data)
    //     if(data.success){
    //         console.log(data);
    //         return true;
    //     }else{
    //         console.log(data[error]);
    //         handleRecaptchaError(data[error]);
    //     }
    // });
    return $recaptcha.val();
}