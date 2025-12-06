document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');
    const menuLinks = mainMenu.querySelectorAll('a');

    burgerBtn.addEventListener('click', () => {
        // Použite mobile-open triedu namiesto prepínania hidden
        mainMenu.classList.toggle('mobile-open');
        burgerBtn.classList.toggle('open');
        
        // Pridajte animáciu pre hladší prechod
        if (mainMenu.classList.contains('mobile-open')) {
            mainMenu.classList.add('animate-fadeIn');
        }
    });

    // Zatvorte menu po kliknutí na odkaz
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1280) {
                mainMenu.classList.remove('mobile-open');
                burgerBtn.classList.remove('open');
            }
        });
    });

    // Odstráňte mobile-open pri zväčšení okna
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280) {
            mainMenu.classList.remove('mobile-open');
            burgerBtn.classList.remove('open');
        }
    });
});