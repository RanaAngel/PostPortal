/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          "black-main-background": "#16161a",
          "black-card": "#2a2a2f",
          gray: "#2a2a2f",
          "black-sub-text": "#84909f",
          "black-main-text": "#fffffe",
          button: "#7f5af0",
          lightslategray: {
            "100": "#84909f",
            "200": "rgba(148, 161, 178, 0.2)",
          },
          gainsboro: "rgba(217, 217, 217, 0)",
          silver: "rgba(191, 191, 191, 0)",
        slategray: "#6b7885",
          mediumslateblue: "#9973ff",
        },
        spacing: {},
        fontFamily: {
          inter: "Inter",
        },
        borderRadius: {
          xl: "20px",
          "8xs": "5px",
          "11xl": "30px",
        },
      },
      fontSize: {
        base: "16px",
        xl: "20px",
        inherit: "inherit",
      },
      screens: {
        mq1525: {
          raw: "screen and (max-width: 1525px)",
        },
        mq1225: {
          raw: "screen and (max-width: 1225px)",
        },
        mq1725: {
          raw: "screen and (max-width: 1725px)",
        },
        mq1325: {
          raw: "screen and (max-width: 1325px)",
        },
        mq900: {
          raw: "screen and (max-width: 900px)",
        },
        mq850: {
          raw: "screen and (max-width: 850px)",
        },
        mq450: {
          raw: "screen and (max-width: 450px)",
        },
      },
    },
    corePlugins: {
      preflight: false,
    },
  };

 