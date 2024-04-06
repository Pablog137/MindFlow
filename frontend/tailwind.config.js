const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans"],
            },
            gridTemplateColumns: {
                "1/5": "1fr 5fr",
            },
        },
    },
    plugins: [],
});
