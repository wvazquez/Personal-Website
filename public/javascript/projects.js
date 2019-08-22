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
// let targets = $('.project-unit');
// export function showTilesOnScroll(){
    
//     const options = {
//         root: null,
//         threshold: 1,
//         rootMargin: '-125px 0px'
//     };
    
//     const observer = new IntersectionObserver(callback,options);

//     function callback(entries, observer){
//         entries.forEach(entry =>{
//             if(entry.isIntersecting){
//                 console.log(entry);
//                 $(entry.target).children('.project-overlay').css("top", 0);
//             }else{
//                 $(entry.target).children('.project-overlay').css("top", '100%');
//             }
//         });
//     }

//     targets.each((index,target)=>{
//         observer.observe(target);
//     });
    
// }
// export function stopObserving(){
//     targets.each((index,target)=>{
//         observer.unobserve(target);
//     });
// }