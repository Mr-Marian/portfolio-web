const header = document.getElementById('main-header');
const logo = document.getElementById('logo-img');
const menu = document.getElementById('main-menu');
const menuUl = document.getElementById('main-menu-ul');
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

function isDesktop() {
    return window.innerWidth >= 1280;
}

function handleScroll() {
    // Aplikujte scroll efekty IBA na desktop
    if (!isDesktop()) return;
    
    if (window.scrollY > scrollThreshold) {        
        header.classList.add(scrolledHeaderPaddingClass);
        header.classList.remove(originalHeaderPaddingClass);
        logo.classList.add(scrolledLogoHeightClass);
        logo.classList.remove(originalLogoHeightClass);
        
        if (menu) {            
            menu.classList.remove(originalMenuMarginClass);             
            menu.classList.add(...scrolledMenuClasses);
        }
        
        if (menuUl) {
            menuUl.style.setProperty('--menu-font-size', scrolledFontSize);
        }
        
    } else {
        header.classList.add(originalHeaderPaddingClass);
        header.classList.remove(scrolledHeaderPaddingClass);
        logo.classList.add(originalLogoHeightClass);
        logo.classList.remove(scrolledLogoHeightClass);
        
        if (menu) {
            menu.classList.add(originalMenuMarginClass); 
            menu.classList.remove(...scrolledMenuClasses);
        }
        
        if (menuUl) {
            menuUl.style.setProperty('--menu-font-size', originalFontSize);
        }
    }
}

// IBA na desktop pridajte scroll listener
function initScrollBehavior() {
    if (isDesktop()) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    } else {
        window.removeEventListener('scroll', handleScroll);
    }
}

// Spustite pri načítaní a pri zmene veľkosti okna
window.addEventListener('load', initScrollBehavior);
window.addEventListener('resize', initScrollBehavior);

initScrollBehavior();