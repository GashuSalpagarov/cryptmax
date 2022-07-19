const btnMenu = document.querySelector('.btn-menu');
const headerDropdown = document.querySelector('.header-dropdown');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle("active");
    headerDropdown.classList.toggle("active");
});


const copyLinkBtn = document.querySelector('.section-author__link-btn');

copyLinkBtn.addEventListener('click', () => {
    const link = copyLinkBtn.dataset.link;
    navigator.clipboard.writeText(link);
});