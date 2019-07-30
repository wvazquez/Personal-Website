$( document ).ready(function() {
    console.log('ready');
    $('.project-overlay').on('click', (event)=>{
        // event.stopPropagation();
        // console.log(event.currentTarget.id);
        let projectID = event.currentTarget.id;
        
        $.get(`/projects/${projectID}`, (data)=>{
            console.log(data);
            $('.project-container').css('left', '-50%');
        });
        
    });

    $('.back-arrow').on('click', ()=>{
        $('.project-container').css('left', 0);
    });


});