document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');
    const menuLinks = mainMenu.querySelectorAll('a');

    burgerBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('mobile-open');
        burgerBtn.classList.toggle('open');
    });

    // Zatvorte menu po kliknutí na odkaz (iba na mobiloch)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1280) {
                mainMenu.classList.remove('mobile-open');
                burgerBtn.classList.remove('open');
            }
        });
    });

    // Pri zmene veľkosti okna na desktop, zatvorte mobilné menu
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280) {
            mainMenu.classList.remove('mobile-open');
            burgerBtn.classList.remove('open');
        }
    });
});