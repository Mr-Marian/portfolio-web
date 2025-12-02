document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');

    burgerBtn.addEventListener('click', () => {
        
        mainMenu.classList.toggle('hidden');
        
        if (!mainMenu.classList.contains('hidden')) {
             mainMenu.classList.add('block');
        } else {
             mainMenu.classList.remove('block');
        }
        burgerBtn.classList.toggle('open');
    });
});