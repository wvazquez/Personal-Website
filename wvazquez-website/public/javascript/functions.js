$( document ).ready(function() {
    console.log('ready');
    $('.project-overlay').on('click', (event)=>{
        let projectID = event.currentTarget.id;
        
        $.get(`/projects/${projectID}`, (data)=>{
            setProjectOverview(data);
            console.log(data);
            $('.project-container').css('left', '-50%');
        });
        
    });

    $('.back-arrow').on('click', ()=>{
        $('.project-container').css('left', 0);
    });


});

function setProjectOverview(data){
    $('#overview-title').text(data.title);
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