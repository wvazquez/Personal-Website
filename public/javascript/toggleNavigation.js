
const menu    = $('.slideout-nav');
const toggler = $('.nav-toggler');

/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */

export function toggle(){
    toggler.toggleClass('active');
    menu.toggleClass('active');
}