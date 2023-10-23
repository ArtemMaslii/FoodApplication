/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/resources/static/js/modules/calculator.js":
/*!************************************************************!*\
  !*** ./src/main/resources/static/js/modules/calculator.js ***!
  \************************************************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector('.calculating__result span');

    let sex = localStorage.getItem("sex") || (localStorage.setItem("sex", "female"), "female"),
        height, weight, age,
        ratio = localStorage.getItem("ratio") || (localStorage.setItem("ratio", 1.375), 1.375);
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }

        if (sex === "female") {
            result.textContent = `${Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)}`;
        } else {
            result.textContent = `${Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)}`;
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");


    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener("click", (event) => {
                if (event.target.getAttribute("data-ratio")) {
                    ratio = +event.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", ratio);

                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                event.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if (input.value.match(/\D/g)) {
                input.classList.add("error_input");
            } else {
                input.classList.remove("error_input");
            }


            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

module.exports = calculator;

/***/ }),

/***/ "./src/main/resources/static/js/modules/cards.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/js/modules/cards.js ***!
  \*******************************************************/
/***/ ((module) => {

function cards() {
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    axios.get('http://localhost:8080/menu')
        .then(data => {
            data.data.menu.forEach(({img, altimg, title, description, price}) => {
                new MenuCard(img, altimg, title, description, price, ".menu .container").render();
            })
        });
}

module.exports = cards;

/***/ }),

/***/ "./src/main/resources/static/js/modules/forms.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/js/modules/forms.js ***!
  \*******************************************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:8080/food/registration', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

module.exports = forms;

/***/ }),

/***/ "./src/main/resources/static/js/modules/modals.js":
/*!********************************************************!*\
  !*** ./src/main/resources/static/js/modules/modals.js ***!
  \********************************************************/
/***/ ((module) => {

function modals() {

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Changed time to not disturb

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modals;

/***/ }),

/***/ "./src/main/resources/static/js/modules/sliders.js":
/*!*********************************************************!*\
  !*** ./src/main/resources/static/js/modules/sliders.js ***!
  \*********************************************************/
/***/ ((module) => {

function sliders() {

    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        widthInPixels = +width.replace(/\D/g, "");

    let slideIndex = 1;
    let offset = 0;

    const indicators = document.createElement("ol"),
        dots = [];

    function updateIndexOfCurrentSlide() {
        current.textContent = slides.length < 10 ? `0${slideIndex}` :`${slideIndex}`;
    }

    function showTotalNumberOfSlides() {
        total.textContent = slides.length < 10 ? `0${slides.length}` : `${slides.length}`;
    }

    function renderStyleOfSlides() {
        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = `${widthInPixels}`;
        });
    }

    function initiateIndicators(classNam) {
        indicators.classList.add(classNam);
        slider.append(indicators);
    }

    function addDotsToHTML() {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement("li");
            dot.setAttribute("data-slide-to", i + 1);
            dot.classList.add("dot");
            if (i === 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }
    }

    initiateIndicators("carousel-indicators");
    addDotsToHTML();

    function changeOpacityOfDots() {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    }

    function addTransformToSlidesField(offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function moveSlides(offset) {
        addTransformToSlidesField(offset);
        updateIndexOfCurrentSlide();
        changeOpacityOfDots();
    }

    showTotalNumberOfSlides();
    updateIndexOfCurrentSlide();
    renderStyleOfSlides();

    next.addEventListener("click", () => {
        if (offset === widthInPixels * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthInPixels;
        }

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        moveSlides(offset);
    });

    prev.addEventListener("click", () => {
        if (offset === 0) {
            offset = widthInPixels * (slides.length - 1)
        } else {
            offset -= widthInPixels;
        }

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        moveSlides(offset);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = +e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = widthInPixels * (slideTo - 1);

            moveSlides(offset);
        });
    });
}

module.exports = sliders;

/***/ }),

/***/ "./src/main/resources/static/js/modules/tabs.js":
/*!******************************************************!*\
  !*** ./src/main/resources/static/js/modules/tabs.js ***!
  \******************************************************/
/***/ ((module) => {

function tabs() {
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/main/resources/static/js/modules/timer.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/js/modules/timer.js ***!
  \*******************************************************/
/***/ ((module) => {

function timer() {
    const deadline = '2024-05-20';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************************!*\
  !*** ./src/main/resources/static/js/script.js ***!
  \************************************************/
window.addEventListener('DOMContentLoaded', function() {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/main/resources/static/js/modules/tabs.js"),
            modals = __webpack_require__(/*! ./modules/modals */ "./src/main/resources/static/js/modules/modals.js"),
            timer = __webpack_require__(/*! ./modules/timer */ "./src/main/resources/static/js/modules/timer.js"),
            sliders = __webpack_require__(/*! ./modules/sliders */ "./src/main/resources/static/js/modules/sliders.js"),
            calculator = __webpack_require__(/*! ./modules/calculator */ "./src/main/resources/static/js/modules/calculator.js"),
            forms = __webpack_require__(/*! ./modules/forms */ "./src/main/resources/static/js/modules/forms.js"),
            cards = __webpack_require__(/*! ./modules/cards */ "./src/main/resources/static/js/modules/cards.js");

    tabs();
    modals();
    timer();
    sliders();
    calculator();
    forms();
    cards();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map