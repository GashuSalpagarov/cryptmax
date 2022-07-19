const btnMenu = document.querySelector('.btn-menu');
const headerDropdown = document.querySelector('.header-dropdown');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle("active");
    headerDropdown.classList.toggle("active");
});

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

// Popular search filter
const popularSearchInput = document.querySelector('.input--popular-search');
const popularSearchBtn = document.querySelector('.input--popular-search + .input-btn');

const searchPopularItems = () => {
    const searchValue = popularSearchInput.value.trim().toLocaleLowerCase();
    const nftCards = document.querySelectorAll('.section-popular__item');
    const notFoundTitle = document.querySelector('.section-popular__not-found');
    const sectionPopularTop = document.querySelector('.section-popular__top');
    let itemsNotFound = true;

    nftCards.forEach((card) => {
        const cardTitle = card.querySelector('.nft-card__title').innerText.trim().toLocaleLowerCase();

        if (!searchValue || cardTitle.includes(searchValue)) {
            itemsNotFound = false;
            card.style.display = '';
            return;
        }

        card.style.display = 'none';
    });

    if(itemsNotFound) {
        sectionPopularTop.style.display = 'none';
        loadMoreBtn.style.display = 'none';
        notFoundTitle.style.display = '';
    } else {
        sectionPopularTop.style.display = '';
        loadMoreBtn.style.display = '';
        notFoundTitle.style.display = 'none';
    }

};

popularSearchInput.addEventListener("keyup", (event) => {
    event.preventDefault();

    if (event.keyCode === 13) searchPopularItems();
});

popularSearchBtn.addEventListener('click', searchPopularItems);