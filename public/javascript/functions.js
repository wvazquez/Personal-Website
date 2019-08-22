import { smoothScroll } from "./smoothScroll.js";
import { getProject, returnToProjectOverview } from "./projects.js";
import { form } from "./emailSubmit.js";
// import { videoSetup } from "./video.js";
import { modal } from './modal.js';
import {toggle } from './toggleNavigation.js';

$( document ).ready(function() {

    // smooth scroll for navigation items
    $('nav a[href^="#"]').on('click', smoothScroll);

    //Displays specific project
    $('.project-overlay').on('click', getProject);
    
    //Back arrow returns to all projects overview
    $('.back-arrow').on('click', returnToProjectOverview);

    // Handles email form submit
    $('.validate-form').on('submit',form);

    // handles video setup and reload
    // videoSetup();
    // $(window).on('resize', videoSetup);

    //handles contact modal on 404 page.
    $('#notfound .contact-btn').on('click', modal);

    $('.nav-toggler').on('click', toggle);
    $('.slideout-container').on('click', toggle);

    let $sm = 576;
    let $windowsize=$(window).width();
    let $viewportheight = $(window).height();
    console.log($viewportheight);
    console.log(($viewportheight-250)/2);
    let roootmargin = ($viewportheight-250)/2;
    let rootthreshold = 1;
    console.log(roootmargin);
    if(roootmargin < 0){
        roootmargin += roootmargin;
        console.log(roootmargin);
    }else{
        roootmargin = 0 - roootmargin;
    }
    if($viewportheight < 300){
        roootmargin = 0;
        rootthreshold = 0.5;
    }
    console.log(roootmargin);
    
    var targets = $('.project-unit');
    const options = {
        root: null,
        threshold: rootthreshold,
        rootMargin: `0px 0px ${roootmargin}px`
    };
    console.log(options.threshold);
    const observer = new IntersectionObserver(callback,options);
    function callback(entries, observer){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                $(entry.target).siblings().children('.project-overlay').css("top", '100%')
                console.log(entry);
                $(entry.target).children('.project-overlay').css("top", 0);
            }else{
                $(entry.target).children('.project-overlay').css("top", '100%');
            }
        });
    }
    
    if($windowsize <= $sm){
        targets.each((index,target)=>{
            observer.observe(target);
        });   
    }
    $(window).on('resize', function(){
        $windowsize = $(window).width();

        if($windowsize <= $sm){
             
            targets.each((index,target)=>{
                observer.observe(target);
            });   
        }else{
            targets.each((index,target)=>{
                $(target).children('.project-overlay').removeAttr('style');
                observer.unobserve(target);
            });
        }
    });
});