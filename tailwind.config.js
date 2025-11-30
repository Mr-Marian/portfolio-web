/** @type {import('tailwindcss').Config} */
module.exports = {
  // VEĽMI DÔLEŽITÉ: Uveďte všetky cesty k súborom, ktoré používajú Tailwind triedy.
  content: [
    "./*.html",             // Ak sú vaše HTML súbory v koreni projektu
    "./index.html",
    "./dist/**/*.html",
    "./js/**/*.{html,js}",
    "./dist/js/**/*.js"
    // Pridajte sem akékoľvek iné typy súborov (napr. .vue, .jsx, .php)
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-nebula': 'linear-gradient(to right, #000000 0%, #000000 10%, #1B2150 30%, #1B2150 70%, #000000 90%, #000000 100%)',
      },
      fontFamily: {
        'anton' : ['Anton', 'sans-serif'],
        'courier': ['Courier New', 'Courier', 'monospace'],
        'lora': ['Lora', 'serif']
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }
    },
    container: {
      center: true, // automaticky pridá mx-auto
      padding: {
        DEFAULT: '0.75rem', // 12px - mobile
        sm: '1rem',         // 16px
        md: '1.5rem',       // 24px
        lg: '2rem',         // 32px
        xl: '2.5rem',       // 40px
        '2xl': '3rem',      // 48px
      },      
    },
  },
  plugins: [],
}