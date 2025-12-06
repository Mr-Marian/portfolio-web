document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');
    const mainMenuUl = document.getElementById('main-menu-ul');

    burgerBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('hidden');
        
        if (!mainMenu.classList.contains('hidden')) {
            mainMenu.classList.add('block');
            // Pre md a lg
            if (window.innerWidth >= 768 && window.innerWidth < 1280) {
                mainMenuUl.classList.add('items-end', 'mr-[25px]');
                // Pridaj text-center a width každému li elementu
                const menuItems = mainMenuUl.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.classList.add('text-center', 'w-48');
                });
            }
        } else {
            mainMenu.classList.remove('block');
            mainMenuUl.classList.remove('items-end', 'mr-[25px]');
            const menuItems = mainMenuUl.querySelectorAll('li');
            menuItems.forEach(item => {
                item.classList.remove('text-center', 'w-48');
            });
        }
        burgerBtn.classList.toggle('open');
    });

    // Kontrola pri resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280 || mainMenu.classList.contains('hidden')) {
            mainMenuUl.classList.remove('items-end', 'mr-[50px]');
            const menuItems = mainMenuUl.querySelectorAll('li');
            menuItems.forEach(item => {
                item.classList.remove('text-center', 'w-48');
            });
        }
    });
});