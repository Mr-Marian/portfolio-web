const header = document.getElementById('main-header');
const logo = document.getElementById('logo-img');
const menu = document.getElementById('main-menu');
const menuUl = document.getElementById('main-menu-ul');
const topbar = document.getElementById('topbar-container'); 
const main = document.querySelector('main');
const scrollThreshold = 25;

// XL a 2XL nastavenia (pôvodné)
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

// Nové nastavenia pre mobile/tablet
let originalLogoHeight = null;
let scrolledLogoHeight = null;

function getLogoHeights() {
    const currentHeight = logo.offsetHeight;
    
    if (window.innerWidth < 768) {
        // xs a sm: zmenšiť o 60%
        originalLogoHeight = currentHeight;
        scrolledLogoHeight = currentHeight * 0.4; // 60% menšie = 40% z pôvodnej
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        // md a lg: zmenšiť o 50%
        originalLogoHeight = currentHeight;
        scrolledLogoHeight = currentHeight * 0.5; // 50% menšie = 50% z pôvodnej
    }
}

function adjustMainPadding() {
    // Pre XL a 2XL nech zostane pôvodné xl:pt-[22rem]
    if (window.innerWidth >= 1280) {
        main.style.paddingTop = '';
        return;
    }
    
    // Pre xs až lg nastav padding podľa výšky headeru
    // Použijeme setTimeout aby sme dostali finálnu výšku po všetkých zmenách
    setTimeout(() => {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }, 50);
}

function handleScrollMobilTablet() {
    if (window.scrollY > scrollThreshold) {
        // Pre XS: odstráň všetky paddingy
        if (window.innerWidth < 640) {
            header.classList.remove(originalHeaderPaddingClass, scrolledHeaderPaddingClass);
            // py-2 = padding 8px zhora aj zdola
            header.style.paddingTop = '8px';
            header.style.paddingBottom = '8px';
            
            // Úplne odstráň padding z topbaru
            topbar.classList.remove('py-4');
            topbar.style.paddingTop = '0';
            topbar.style.paddingBottom = '0';
            
            // Oprav logo odsadenie
            logo.style.display = 'block';
            logo.style.margin = '0';
            logo.style.verticalAlign = 'top';
            
            // Pre XS obrazovky: zmeniť layout na jeden riadok
            topbar.classList.remove('flex-col');
            topbar.classList.add('flex-row', 'justify-between');
            
            // Nastav výšku headeru podľa obsahu
            setTimeout(() => {
                const topbarHeight = topbar.offsetHeight;
                header.style.height = `${topbarHeight + 16}px`; // +16px (8px top + 8px bottom)
                
                // Aktualizuj padding pre main
                adjustMainPadding();
            }, 0);
        } else {
            // Pre SM, MD, LG
            header.classList.add(scrolledHeaderPaddingClass);
            header.classList.remove(originalHeaderPaddingClass);
            
            // Oprav logo odsadenie aj pre SM, MD, LG
            logo.style.display = 'block';
            logo.style.margin = '0';
            logo.style.verticalAlign = 'top';
            
            // Aktualizuj padding pre main
            adjustMainPadding();
        }
        
        // Nastav zmenšenú výšku loga
        if (scrolledLogoHeight) {
            logo.style.height = `${scrolledLogoHeight}px`;
        }
    } else {
        header.classList.add(originalHeaderPaddingClass);
        header.classList.remove(scrolledHeaderPaddingClass);
        // Vráť pôvodné inline štýly
        header.style.paddingTop = '';
        header.style.paddingBottom = '';
        
        // Vráť pôvodné štýly loga pre všetky veľkosti
        logo.style.display = '';
        logo.style.margin = '';
        logo.style.verticalAlign = '';
        
        // Vráť pôvodný padding na topbare
        if (window.innerWidth < 640) {
            topbar.classList.add('py-4');
            topbar.style.paddingTop = '';
            topbar.style.paddingBottom = '';
            
            // Pre XS obrazovky: vrátiť pôvodný layout
            topbar.classList.remove('flex-row', 'justify-between');
            topbar.classList.add('flex-col');
            
            // Vráť automatickú výšku headeru
            header.style.height = '';
        }
        
        // Vráť pôvodnú výšku loga
        logo.style.height = '';
        
        // Aktualizuj padding pre main
        adjustMainPadding();
    }
}

function handleScrollDesktop() {
    if (window.scrollY > scrollThreshold) {        
        header.classList.add(scrolledHeaderPaddingClass);
        header.classList.remove(originalHeaderPaddingClass);
        logo.classList.add(scrolledLogoHeightClass);
        logo.classList.remove(originalLogoHeightClass);
        
        // Oprav logo odsadenie aj pre XL a 2XL
        logo.style.display = 'block';
        logo.style.margin = '0';
        logo.style.verticalAlign = 'top';
        
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
        logo.classList.remove(scrolledLogoHeightClass); // OPRAVA: bolo originalLogoHeightClass
        
        // Vráť pôvodné štýly loga
        logo.style.display = '';
        logo.style.margin = '';
        logo.style.verticalAlign = '';
        
        if (menu) {
            menu.classList.add(originalMenuMarginClass); 
            menu.classList.remove(...scrolledMenuClasses);
        }
        
        if (menuUl) {
            menuUl.style.setProperty('--menu-font-size', originalFontSize);
        }
    }
}

function applyScrollLogic() {
    // Odstráň predchádzajúce listenery
    window.removeEventListener('scroll', handleScrollMobilTablet);
    window.removeEventListener('scroll', handleScrollDesktop);
    
    if (window.innerWidth >= 1280) {
        // XL a 2XL - pôvodná logika
        window.addEventListener('scroll', handleScrollDesktop);
        handleScrollDesktop();
    } else {
        // Mobile a tablet - nová logika
        getLogoHeights();
        window.addEventListener('scroll', handleScrollMobilTablet);
        handleScrollMobilTablet();
    }
    
    // Nastav padding pre main pri načítaní
    adjustMainPadding();
}

// Inicializácia
applyScrollLogic();

// Pri zmene veľkosti okna
window.addEventListener('resize', () => {
    applyScrollLogic();
});
