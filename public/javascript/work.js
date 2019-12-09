export function getProject(event){
    let projectID = event.currentTarget.id;
    console.log("projectID", projectID)
        
    $.get(`/projects/${projectID}`, data => {
        setProject(data);
        $('.project-overview').show(100);
        $('.slide-section').css('left', '-50%');
    });
}

export function returnToProjectOverview(){
    $('.slide-section').css('left', 0);
    $('.project-overview').fadeOut(700);
}

function setProject(data){
    console.log(data)
    $('#overview-title').text(data.title);
    $('#overview-link').attr('href', data.url)
    // $('<a/>',{
    //     text: "Visit Website"
    // }).attr('href', data.url);
    const $projectContent = $('.project-content');
    $projectContent.html(""); //removes previously loaded data.
    data.assets.forEach(asset => {
        let $content = $('<div></div>').addClass('content');
        let $contentImage = $('<div></div>').addClass('content-image').append($('<img />').attr("src", asset.src).attr('alt', asset.title));
        let $paragraph = $( "<p/>", {text: asset.desc});
        $content.append($contentImage,$paragraph);
        $projectContent.append($content);
    });
}