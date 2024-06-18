/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#16161a",
          "200": "rgba(5, 5, 5, 0.2)",
        },
        button: "#7f5af0",
        mediumslateblue: {
          "100": "#9973ff",
          "200": "rgba(127, 90, 240, 0)",
        },
        "black-main-text": "#fffffe",
        "black-sub-text": "#84909f",
        gainsboro: "rgba(217, 217, 217, 0)",
        color: "#fff",
        "black-dash-card": "rgba(42, 42, 47, 0.4)",
        // Additional colors from the existing config
        "black-main-background": "#16161a",
        lightslategray: "rgba(148, 161, 178, 0.2)",
        silver: "rgba(191, 191, 191, 0)",
        slategray: "#6b7885",
        white: "#fff",
        palevioletred: "#ee79a3",
        darkslategray: "#3d3d40",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "8xs": "5px",
        xl: "20px",
        "61xl": "80px",
        "11xl": "30px",
        xl: "20px",
        "31xl": "50px",
      },
      fontSize: {
        lg: "18px",
        base: "16px",
        inherit: "inherit",
        xl: "20px",
        "11xl": "30px",
        "5xl": "24px",
        lg: "18px",
        xs: "12px",
        "3xs": "10px",
        "21xl": "40px",
        "13xl": "32px",
        "41xl": "60px",
        "29xl": "48px",
        "17xl": "36px",
      },
    },
    screens: {
      mq725: {
        raw: "screen and (max-width: 725px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      mq1800: {
        raw: "screen and (max-width: 1800px)",
      },
      mq1650: {
        raw: "screen and (max-width: 1650px)",
      },
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1300: {
        raw: "screen and (max-width: 1300px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
