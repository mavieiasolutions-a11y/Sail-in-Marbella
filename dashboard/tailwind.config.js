/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                cream: '#F9F9F4',
                navy: '#1B263B',
                gold: '#C5A059',
                dark: '#0E1620',
                panel: '#141E2C',
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
