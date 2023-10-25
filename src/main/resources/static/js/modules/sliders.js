function sliders({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        widthInPixels = parseFloat(width);

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

export default sliders;