/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '15px',
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1440px',
                '2xl': '1720px',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        fontFamily: {
            primary: 'var(--font-jetbrains-mono)',
        },
        extend: {
            colors: {
                primary: '#1c1c22',
                accent: {
                    DEFAULT: '#E57373',
                    hover: '#FF8A80',
                },
            },
            // Sticky header: above page content, below dialogs, the mobile menu and tooltips (z-50)
            zIndex: {
                header: '40',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
