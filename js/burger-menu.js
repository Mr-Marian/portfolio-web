document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainMenu = document.getElementById('main-menu');
    const mainMenuUl = document.getElementById('main-menu-ul');
    const menuItems = mainMenuUl.querySelectorAll('a');
    const body = document.body;
    const header = document.getElementById('main-header');

    // Funkcia na otvorenie/zatvorenie menu po kliknutí na burger tlačidlo
    function toggleMenu() {
        mainMenu.classList.toggle('hidden');
        
        if (!mainMenu.classList.contains('hidden')) {
            mainMenu.classList.add('block');
            
            // Pre XS a SM pridaj pozadie dark-nebula a full width
            if (window.innerWidth < 768) {
                mainMenu.classList.add('bg-dark-nebula', 'fixed', 'left-0', 'right-0', 'z-40');
                
                // Nastav top pozíciu podľa výšky headeru
                const headerHeight = header.offsetHeight;
                mainMenu.style.top = `${headerHeight}px`;
                
                // Zabráň scrollovaniu body
                body.style.overflow = 'hidden';
            }
            
            // Odstráň margin pre burger menu
            mainMenu.classList.remove('my-10');
            
            // Pridaj padding-bottom
            mainMenu.classList.add('pb-2');
            
            // Pre md a lg pridaj items-end a text-center
            if (window.innerWidth >= 768 && window.innerWidth < 1280) {
                // Tieto triedy sa aplikujú len pri otvorení a sú odstránené pri zatvorení (v closeMenu)
                mainMenuUl.classList.add('items-end', 'mr-[25px]');
                const menuListItems = mainMenuUl.querySelectorAll('li');
                menuListItems.forEach(item => {
                    item.classList.add('text-center', 'w-48');
                });
            }
        } else {
            // Logika pre zatvorenie menu (zopakovanie closeMenu, aby sa zachovala konzistencia)
            mainMenu.classList.remove('block');
            
            // Odstráň pozadie a fixed positioning
            if (window.innerWidth < 768) {
                mainMenu.classList.remove('bg-dark-nebula', 'fixed', 'left-0', 'right-0', 'z-40');
                mainMenu.style.top = '';
                body.style.overflow = ''; // Povolí scrollovanie body
            }
            
            // Vráť margin a odstráň padding
            mainMenu.classList.add('my-10');
            mainMenu.classList.remove('pb-2');
            
            mainMenuUl.classList.remove('items-end', 'mr-[25px]');
            const menuListItems = mainMenuUl.querySelectorAll('li');
            menuListItems.forEach(item => {
                item.classList.remove('text-center', 'w-48');
            });
        }
        burgerBtn.classList.toggle('open');
    }

    // Funkcia na zatvorenie menu (používa sa pri kliknutí na položku menu)
    function closeMenu() {
        if (mainMenu.classList.contains('hidden')) {
            return; // Ak je už skryté, nič nerob
        }
        
        mainMenu.classList.add('hidden');
        mainMenu.classList.remove('block', 'pb-2');
        
        // Odstráň pozadie a fixed positioning (pre mobilné zobrazenia < 768px)
        if (window.innerWidth < 768) {
            mainMenu.classList.remove('bg-dark-nebula', 'fixed', 'left-0', 'right-0', 'z-40');
            mainMenu.style.top = '';
            body.style.overflow = ''; // ✨ KRITICKÁ ÚPRAVA: Povolí scrollovanie body po zatvorení menu
        }
        
        mainMenu.classList.add('my-10');
        
        // Odstráň triedy aplikované pre MD/LG otvorený stav
        mainMenuUl.classList.remove('items-end', 'mr-[25px]');
        const menuListItems = mainMenuUl.querySelectorAll('li');
        menuListItems.forEach(item => {
            item.classList.remove('text-center', 'w-48');
        });
        
        burgerBtn.classList.remove('open');
    }

    // 🍔 Listener pre burger tlačidlo (otvorenie/zatvorenie)
    burgerBtn.addEventListener('click', toggleMenu);

    // 🔗 Listener pre položky menu (zatvorenie po kliknutí)
    menuItems.forEach(item => {
        // Po kliknutí na odkaz menu (a presmerovaní na sekciu), zavolaj funkciu closeMenu
        item.addEventListener('click', closeMenu);
    });

    // 📐 Úprava pri zmene veľkosti okna
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280) {
            // Pre desktop (> XL) sa menu skrýva, a má sa vrátiť do pôvodného stavu
            mainMenu.classList.remove('hidden', 'block', 'pb-2');
            mainMenu.classList.add('xl:block', 'my-10'); // Zabezpečíme zobrazenie
            
            // Odstránenie mobilných tried
            mainMenu.classList.remove('bg-dark-nebula', 'fixed', 'left-0', 'right-0', 'z-40');
            mainMenu.style.top = '';
            body.style.overflow = ''; 

            mainMenuUl.classList.remove('items-end', 'mr-[25px]');
            const menuListItems = mainMenuUl.querySelectorAll('li');
            menuListItems.forEach(item => {
                item.classList.remove('text-center', 'w-48');
            });
             burgerBtn.classList.remove('open');
        } else if (mainMenu.classList.contains('block') && window.innerWidth >= 768) {
             // Pre tablety s otvoreným menu, povoliť scrollovanie
             body.style.overflow = ''; 
             mainMenu.classList.remove('bg-dark-nebula', 'fixed', 'left-0', 'right-0', 'z-40');
             mainMenu.style.top = '';
        }
    });
});