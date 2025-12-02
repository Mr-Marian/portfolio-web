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

window.addEventListener('scroll', handleScroll);
handleScroll(); 

const xlMediaQuery = window.matchMedia('(min-width: 1280px)');

function applyScrollLogic(mediaQuery) {
    if (mediaQuery.matches) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    } else {
        window.removeEventListener('scroll', handleScroll);
    }
}

applyScrollLogic(xlMediaQuery);
xlMediaQuery.addEventListener('change', applyScrollLogic);