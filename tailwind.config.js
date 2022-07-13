/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                modalHoverIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 100 },
                },
                modalHoverOut: {
                    '0%': { opacity: 100 },
                    '100%': { opacity: 0 },
                },
            },
            animation: {
                modalHoverIn: 'modalHoverIn 300ms ease-out',
                modalHoverOut: 'modalHoverOut 300ms ease-out',
            },
        },
    },
    plugins: [],
};
