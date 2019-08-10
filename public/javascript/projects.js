export function getProject(event){
    let projectID = event.currentTarget.id;
        
    $.get(`/projects/${projectID}`, data => {
        setProject(data);
        console.log(data);
        $('.project-overview').show(100);
        $('.project-container').css('left', '-50%');
    });
}

export function returnToProjectOverview(){
    $('.project-container').css('left', 0);
    $('.project-overview').fadeOut(700);
}


function setProject(data){
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