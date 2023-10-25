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

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2024-05-20');
    cards();
    calculator('.calculating__result span');
    forms('form', modalTimerId);
    sliders({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
});