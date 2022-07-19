const btnMenu = document.querySelector('.btn-menu');
const headerDropdown = document.querySelector('.header-dropdown');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle("active");
    headerDropdown.classList.toggle("active");
})

// slider
function initSlider(sliderSelector) {
    const customSlider = document.querySelector(sliderSelector);
    const customSliderSlideList = customSlider.querySelector('.custom-slider__slide-list');
    const customSliderBtnLeft = customSlider.querySelector('.custom-slider__btn-left');
    const customSliderBtnRight = customSlider.querySelector('.custom-slider__btn-right');
    const customSliderScrollSize = customSliderSlideList.clientWidth;
    const customSliderScrollMaxSize = customSliderSlideList.scrollWidth - customSliderScrollSize + 15;
    let sliderInProgress = false;

    const scrollLeftSlideList = (value) => {
        if (sliderInProgress) return;
        const style = window.getComputedStyle(customSliderSlideList);
        const matrix = new DOMMatrixReadOnly(style.transform)
        const translateX = matrix.m41;

        if (value < 0 && translateX === 0) return;
        if (value > 0 && translateX === -customSliderScrollMaxSize) return;

        customSliderSlideList.style.transform = `translateX(${translateX - value}px)`;

        sliderInProgress = true;
        setTimeout(() => sliderInProgress = false, 500);
    };

    customSliderBtnLeft.addEventListener('click', () => scrollLeftSlideList(-customSliderScrollSize));
    customSliderBtnRight.addEventListener('click', () => scrollLeftSlideList(customSliderScrollSize));
}

initSlider('.custom-slider-2'); // init section explore slider


// section question accordions
const accordions = document.querySelectorAll('.section-questions__accordion');
accordions.forEach((accordion) => {
    const accordionTop = accordion.querySelector('.section-questions__accordion__top');

    accordionTop.addEventListener('click', () => {
        accordion.classList.toggle('active');
    });
});

// section question tabs
const tabs = document.querySelectorAll('.section-questions__tab-item');
const tabsContent = document.querySelectorAll('.section-questions__tab-content-item');

tabs.forEach((tab, index) => tab.addEventListener('click', () => {
    tabs.forEach((tab) => tab.classList.remove('active'));
    tabsContent.forEach((content) => content.classList.remove('active'));

    tabs[index].classList.add('active');
    tabsContent[index].classList.add('active');
}));