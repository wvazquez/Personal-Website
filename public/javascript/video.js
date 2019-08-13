const $videoImage = $('.video-container .poster img');
const $videoFilter = $('.video-container .filter');
const $video = $('.video-container video');

export function videoSetup(){
    //sets up height of video container
    setHeight();
    // Sets width to window width
    setWidth($videoImage);
    setWidth($videoFilter);
    setWidth($video);
}


  function setHeight() {
    var $videoContainer= $(".header");
    $('.homepage-hero-module').height($videoContainer.height());
  }

  function setWidth(element) {
    element.each(function(){
      $(this).width($(window).width());
    });
  }

