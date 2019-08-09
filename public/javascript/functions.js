import { smoothScroll } from "./smoothScroll.js";
import { projectSetup } from "./projectSetup.js";
import { form } from "./emailSubmit.js";

$( document ).ready(function() {
    smoothScroll();
    projectSetup();
    form();
});