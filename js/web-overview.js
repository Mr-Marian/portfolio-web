// Zoznam vašich webových stránok
const websites = [
    {
        title: "Marián Kapitán",
        url: "https://marian-kapitan.netlify.app"
    },
    {
        title: "OpenLab MK",
        url: "https://openlab-mk.netlify.app"
    },
    {
        title: "Work in Slovakia",
        url: "https://workinslovakia.eu"
    }
];

// Screenshot API konfigurácia
const SCREENSHOT_API = {
    // ApiFlash - demo verzia (má limity)
    apiflash: (url) => `https://api.apiflash.com/v1/urltoimage?access_key=demo&url=${encodeURIComponent(url)}&width=1200&height=675&fresh=true&response_type=image`,
    
    // Screenshot Machine - vyžaduje registráciu
    // screenshotmachine: (url) => `https://api.screenshotmachine.com?key=YOUR_API_KEY&url=${encodeURIComponent(url)}&dimension=1200x675`,
    
    // Screeenly - bezplatná alternatíva
    screeenly: (url) => `https://screeenly.com/api/v1/fullsize?key=free&url=${encodeURIComponent(url)}&width=1200&height=675`
};

// Funkcia na získanie screenshot URL (vyberte si API)
function getScreenshotUrl(url) {
    return SCREENSHOT_API.apiflash(url);
}

// Funkcia na vytvorenie náhľadu stránky
function createPreview(container, website) {
    // Pridať loading indikátor
    container.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    // Vytvorenie obrázka
    const img = document.createElement('img');
    img.src = getScreenshotUrl(website.url);
    img.alt = `${website.title} náhľad`;
    img.className = 'portfolio-preview-img w-full h-full object-cover';
    img.loading = 'lazy';
    
    // Po načítaní obrázka
    img.onload = () => {
        container.innerHTML = '';
        container.appendChild(img);
        
        // Pridať overlay s informáciami
        const overlay = document.createElement('div');
        overlay.className = 'portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-300';
        overlay.innerHTML = `
            <h3 class="portfolio-title text-white text-xl font-bold mb-2">${website.title}</h3>
            <p class="portfolio-url text-gray-200 text-sm mb-3">${website.url.replace(/^https?:\/\//, '')}</p>
            <button class="portfolio-visit-btn bg-white text-gray-900 px-4 py-2 rounded text-sm font-semibold inline-flex items-center gap-2 w-fit hover:bg-gray-100 transition">
                Navštíviť stránku
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
            </button>
        `;
        
        container.appendChild(overlay);
    };
    
    // Ak sa obrázok nenačíta
    img.onerror = () => {
        container.innerHTML = `
            <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-gray-100">
                <svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-lg font-bold text-gray-700 mb-1">${website.title}</h3>
                <p class="text-sm text-gray-500 mb-4">${website.url.replace(/^https?:\/\//, '')}</p>
                <button class="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition">
                    Navštíviť stránku →
                </button>
            </div>
        `;
    };
    
    // Event listener pre kliknutie
    container.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(website.url, '_blank', 'noopener,noreferrer');
    });
}

// Inicializácia portfolia
function initPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio_item');
    
    if (portfolioItems.length !== websites.length) {
        console.warn(`Počet .portfolio_item (${portfolioItems.length}) sa nezhoduje s počtom webových stránok (${websites.length})`);
    }
    
    // Vytvorenie náhľadov pre každú položku
    portfolioItems.forEach((item, index) => {
        if (websites[index]) {
            createPreview(item, websites[index]);
        }
    });
}

// Spustenie po načítaní DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}