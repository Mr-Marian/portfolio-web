const header = document.getElementById('main-header');
const logo = document.getElementById('logo-img');
const menu = document.getElementById('main-menu');
const menuUl = document.getElementById('main-menu-ul');
const topbar = document.getElementById('topbar-container'); 
const scrollThreshold = 25;

const originalLogoHeightClass = 'sm:h-[176px]';
const scrolledLogoHeightClass = 'sm:h-[88px]';
const originalHeaderPaddingClass = 'py-4';
const scrolledHeaderPaddingClass = 'py-2'; 

const originalMenuMarginClass = 'my-10'; 

const scrolledMenuClasses = [
    'absolute', 
    'top-[70px]',    
    'w-3/5',    
    'xl:right-1/4'
];

const originalFontSize = '2vw';
const scrolledFontSize = '1.5vw'; 

function handleScroll() {
    // Kontrola, či sme na desktop verzii (xl a väčšie)
    const isDesktop = window.innerWidth >= 1280;
    
    if (window.scrollY > scrollThreshold) {        
        header.classList.add(scrolledHeaderPaddingClass);
        header.classList.remove(originalHeaderPaddingClass);
        logo.classList.add(scrolledLogoHeightClass);
        logo.classList.remove(originalLogoHeightClass);
        
        // Aplikujte scroll efekty iba na desktop
        if (menu && isDesktop) {            
            menu.classList.remove(originalMenuMarginClass);             
            menu.classList.add(...scrolledMenuClasses);
        }
        
        if (menuUl && isDesktop) {
            menuUl.style.setProperty('--menu-font-size', scrolledFontSize);
        }
        
    } else {
        header.classList.add(originalHeaderPaddingClass);
        header.classList.remove(scrolledHeaderPaddingClass);
        logo.classList.add(originalLogoHeightClass);
        logo.classList.remove(scrolledLogoHeightClass);
        
        // Obnovte pôvodné štýly iba na desktop
        if (menu && isDesktop) {
            menu.classList.add(originalMenuMarginClass); 
            menu.classList.remove(...scrolledMenuClasses);
        }
        
        if (menuUl && isDesktop) {
            menuUl.style.setProperty('--menu-font-size', originalFontSize);
        }
    }
}

// Funkcia na správne nastavenie menu pri zmene veľkosti okna
function handleResize() {
    const isDesktop = window.innerWidth >= 1280;
    
    if (isDesktop) {
        // Na desktop verziách odstráňte hidden
        menu.classList.remove('hidden');
        menu.classList.add('block');
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    } else {
        // Na mobilných zariadeniach pridajte hidden
        menu.classList.add('hidden');
        menu.classList.remove('block');
        // Odstráňte scroll efekty
        menu.classList.remove(...scrolledMenuClasses);
        menu.classList.add(originalMenuMarginClass);
        window.removeEventListener('scroll', handleScroll);
    }
}

// Spustite pri načítaní stránky
window.addEventListener('load', handleResize);

// Spustite pri zmene veľkosti okna
window.addEventListener('resize', handleResize);

// Inicializácia
handleResize();