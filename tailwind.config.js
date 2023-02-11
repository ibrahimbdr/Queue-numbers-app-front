/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        typeWriter: 'typing 2s steps(30, end), blink .5s step-end infinite, alternate',
        typeWriterPlus: 'typing2 2s steps(30, end), blink .5s step-end infinite, alternate',
        typeWriterPlusPlus: 'typing3 3s steps(30, end), blink .5s step-end infinite, alternate',
        typeWriterPlusPlusPlus: 'typing4 3.5s steps(30, end), blink .5s step-end infinite, alternate',
        typeWriterPlusPlusPlusPlus: 'typing5 3.5s steps(50, end), blink .5s step-end infinite, alternate'
      },
      keyframes: {
        typing: {
          'from': { width: 0 },
          'to': { width: "100%" }
          
        },
        typing2: {
          'from': { width: 0 },
          'to': { width: "450px" }
          
        },
        typing3: {
          'from': { width: 0 },
          'to': { width: "700px" }
          
        },
        typing4: {
          'from': { width: 0 },
          'to': { width: "1020px" }
          
        },
        typing5: {
          'from': { width: 0 },
          'to': { width: "100%" }
          
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        }
      },
    },
  },
  plugins: [],
}