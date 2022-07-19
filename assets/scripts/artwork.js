const btnMenu = document.querySelector('.btn-menu');
const headerDropdown = document.querySelector('.header-dropdown');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle("active");
    headerDropdown.classList.toggle("active");
})