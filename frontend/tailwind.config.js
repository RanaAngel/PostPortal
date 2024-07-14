/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-main-50": "#fbfbfb",
        gray: {
          "100": "#8e8d89",
          "200": "#2a2a2f",
          "300": "#1e1e22",
          "400": "rgba(255, 255, 255, 0.6)",
        },
        "black-main-background": "#16161a",
        black: "#000",
        whitesmoke: {
          "100": "#ededed",
          "200": "#eaeaea",
        },
        slateblue: "#6446c0",
        mediumslateblue: {
          "100": "#9973ff",
          "200": "#8a6be6",
          "300": "rgba(127, 90, 240, 0.8)",
        },
        "black-main-text": "#fffffe",
        palevioletred: "#ee79a3",
        button: "#7f5af0",
        white: "#fff",
        lightslategray: "rgba(148, 161, 178, 0.2)",
        gainsboro: "rgba(217, 217, 217, 0)",
      },
      spacing: {},
      fontFamily: {
        "body-body1-regular": "Inter",
      },
      borderRadius: {
        "7xl": "26px",
        "116xl-3": "135.3px",
        "16xl": "35px",
        "11xl": "30px",
        xl: "20px",
        mid: "17px",
        "8xs": "5px",
      },
    },
    fontSize: {
      lg: "18px",
      "11xl": "30px",
      "5xl": "24px",
      base: "16px",
      "41xl": "60px",
      "17xl": "36px",
      "29xl": "48px",
      xl: "20px",
      lgi: "19px",
      "45xl": "64px",
      "19xl": "38px",
      "32xl": "51px",
      "21xl": "40px",
      "13xl": "32px",
      inherit: "inherit",
    },
    screens: {
      mq1650: {
        raw: "screen and (max-width: 1650px)",
      },
      mq1500: {
        raw: "screen and (max-width: 1500px)",
      },
      mq1300: {
        raw: "screen and (max-width: 1300px)",
      },
      mq1225: {
        raw: "screen and (max-width: 1225px)",
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
