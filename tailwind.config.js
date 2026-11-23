/** @type {import('tailwindcss').Config} */
// Tailwind CSS v4 natively configures the design system via @theme in app/globals.css.
// This configuration file exports an empty config object for CommonJS/tooling compatibility.
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
