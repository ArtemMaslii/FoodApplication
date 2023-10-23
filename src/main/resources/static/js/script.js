window.addEventListener('DOMContentLoaded', function() {
    const tabs = require("./modules/tabs"),
            modals = require("./modules/modals"),
            timer = require("./modules/timer"),
            sliders = require("./modules/sliders"),
            calculator = require("./modules/calculator"),
            forms = require("./modules/forms"),
            cards = require("./modules/cards");

    tabs();
    modals();
    timer();
    sliders();
    calculator();
    forms();
    cards();
});