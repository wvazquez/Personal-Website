$( document ).ready(function() {
    console.log('ready');
    $('.project-overlay').on('click', ()=>{
        $('.project-container').css('left', '-50%');
    });

    $('.back-arrow').on('click', ()=>{
        $('.project-container').css('left', 0);
    });
});