document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');
    const menuLinks = mainMenu.querySelectorAll('a');

    burgerBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('hidden');
        burgerBtn.classList.toggle('open');
        
        // Pridajte animáciu pre hladší prechod
        if (!mainMenu.classList.contains('hidden')) {
            mainMenu.classList.add('animate-fadeIn');
        }
    });

    // Zatvorte menu po kliknutí na odkaz
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1280) {
                mainMenu.classList.add('hidden');
                burgerBtn.classList.remove('open');
            }
        });
    });
});