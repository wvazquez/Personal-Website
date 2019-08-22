import { smoothScroll } from "./smoothScroll.js";
import { getProject, returnToProjectOverview } from "./projects.js";
import { form } from "./emailSubmit.js";
import { videoSetup } from "./video.js";
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
    videoSetup();
    $(window).on('resize', videoSetup);

    //handles contact modal on 404 page.
    $('#notfound .contact-btn').on('click', modal);

    $('.nav-toggler').on('click', toggle);
    $('.slideout-container').on('click', toggle);

});