const btnMenu = document.querySelector('.btn-menu');
const headerDropdown = document.querySelector('.header-dropdown');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle("active");
    headerDropdown.classList.toggle("active");
})

// const btnList = document.querySelectorAll('.nft-card__button');

// for (let index = 0; index < btnList.length; index++) {
//     const btn = btnList[index];
//     const nftCard = btn.closest('.nft-card');
//     const title = nftCard.querySelector('.nft-card__title').innerText;

//     btn.addEventListener('click', function () {
//         console.log(title);
//     })
// }

// section guide
const guideBtns = document.querySelectorAll('.section-guide__slider-button');
const guideItems = document.querySelectorAll('.section-guide__slider-item');

guideBtns.forEach((btn, index) => btn.addEventListener('click', () => {
    const currentItem = guideItems[index];
    const currentBtn = guideBtns[index];

    guideBtns.forEach((btn) => btn.classList.remove('active'));
    guideItems.forEach((item) => item.classList.remove('active'));

    currentItem.classList.add('active');
    currentBtn.classList.add('active');
}));



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

initSlider('.custom-slider-1'); // init section charts slider
initSlider('.custom-slider-2'); // init section explore slider



// Popular Artwork items loading
const loadMoreBtn = document.querySelector('.section-popular__list-button');
const addArtworks = () => {
    const artworksList = document.querySelector('.section-popular__list');
    const artworksNodeList = document.querySelectorAll('.section-popular__item');
    const artworksArray = Array.from(artworksNodeList).slice(0, 8);

    artworksArray.forEach((item) => {
        const newItem = item.cloneNode(true);
        artworksList.appendChild(newItem);
    });
};

loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.classList.add('loading');

    setTimeout(() => {
        loadMoreBtn.classList.remove('loading');
        addArtworks();
    }, 3000);
});

// Popular Artwork filter
let popularFilter = [];
const popularFilterButtons = document.querySelectorAll('.section-popular__category-item');

const managePopularFilter = (filterTag) => {
    if (filterTag === 'all item') {
        popularFilter = [];
        return;
    }

    if (!popularFilter.includes(filterTag)) {
        popularFilter.push(filterTag)
        return;
    }

    const index = popularFilter.indexOf(filterTag);
    popularFilter.splice(index, 1);
};

const managePopularFilterButtons = () => {
    popularFilterButtons.forEach((btn) => {
        const btnFilter = btn.innerText.trim().toLocaleLowerCase();

        if (popularFilter.length === 0 && btnFilter === 'all item' || popularFilter.includes(btnFilter)) {
            btn.classList.remove('button--outline');
            return;
        }

        btn.classList.add('button--outline');
    });
};

const managePopularFilterCards = () => {
    const nftCards = document.querySelectorAll('.section-popular__item');
    nftCards.forEach((card) => {
        const cardTag = card.querySelector('.nft-card__tag').innerText.trim().toLocaleLowerCase();

        if (popularFilter.length === 0 || popularFilter.includes(cardTag)) {
            card.style.display = '';
            return;
        }

        card.style.display = 'none';
    });
};

popularFilterButtons.forEach((btn) => btn.addEventListener('click', () => {
    const filterTag = btn.innerText.trim().toLocaleLowerCase();

    managePopularFilter(filterTag);
    managePopularFilterButtons();
    managePopularFilterCards();
}));