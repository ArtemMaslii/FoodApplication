import tabs from "./modules/tabs";
import modals from "./modules/modals";
import timer from "./modules/timer";
import sliders from "./modules/sliders";
import calculator from "./modules/calculator";
import forms from "./modules/forms";
import cards from "./modules/cards";
import {openModal} from "./modules/modals";

window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    tabs();
    modals('[data-modal]', '.modal', modalTimerId);
    timer();
    sliders();
    calculator();
    forms(modalTimerId);
    cards();
});