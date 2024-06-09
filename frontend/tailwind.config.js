module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#16161a",
          "200": "rgba(5, 5, 5, 0.2)",
        },
        "black-main-background": "#16161a",
        "black-main-text": "#fffffe",
        lightslategray: "rgba(148, 161, 178, 0.2)",
        button: "#7f5af0",
        mediumslateblue: "#9973ff",
        gainsboro: "rgba(217, 217, 217, 0)",
        "black-sub-text": "#84909f",
        silver: "rgba(191, 191, 191, 0)",
        slategray: "#6b7885",
        "black-main-background": "#16161a",
        "black-sub-text": "#84909f",
        "black-main-text": "#fffffe",
        white: "#fff",
        button: "#7f5af0",
        palevioletred: "#ee79a3",
        gainsboro: "rgba(217, 217, 217, 0.2)",
        darkslategray: "#3d3d40",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "11xl": "30px",
        xl: "20px",
        "31xl": "50px",
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
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
      inherit: "inherit",
    },
    screens: {
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
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
