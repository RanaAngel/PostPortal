// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         // Colors from both configs
//         white: "#fff",
//         gray: {
//           "100": "#282828",
//           "200": "#0b0b0b",
//           "300": "rgba(0, 0, 0, 0)",
//           "400": "rgba(255, 255, 255, 0.6)", // from second config
//         },
//         slategray: {
//           "100": "#5f6178",
//           "200": "#5a5b74",
//         },
//         button: "#7f5af0",
//         dimgray: {
//           "100": "#5e5e74",
//           "200": "#4e556d",
//           "300": "#4d536b",
//         },
//         darkslategray: "#2d405d",
//         gainsboro: {
//           "100": "#eae6e6",
//           "200": "#d9d9d9",
//         },
//         sandybrown: "#ee9b3a",

//         "neutral-main-50": "#fbfbfb",
//         "black-main-background": "#16161a",
//         black: "#000",
//         whitesmoke: {
//           "100": "#ededed",
//           "200": "#eaeaea",
//         },
//         slateblue: "#6446c0",
//         mediumslateblue: {
//           "100": "#9973ff",
//           "200": "#8a6be6",
//           "300": "rgba(127, 90, 240, 0.8)",
//         },
//         "black-main-text": "#fffffe",
//         palevioletred: "#ee79a3",
//         lightslategray: "rgba(148, 161, 178, 0.2)",
//       },
//       spacing: {},
//       fontFamily: {
//         // Font families from both configs
//         inter: "Inter",
//         poppins: "Poppins",
//         roboto: "Roboto",
//         "body-body1-regular": "Inter",
//       },
//       borderRadius: {
//         // Border radii from both configs
//         "9xs-8": "3.8px",
//         mid: "17px",
//         "7xl": "26px",
//         "116xl-3": "135.3px",
//         "16xl": "35px",
//         "11xl": "30px",
//         xl: "20px",
//         "8xs": "5px",
//       },
//       fontSize: {
//         // Font sizes from both configs
//         "2xs-5": "10.5px",
//         lg: "18px",
//         mid: "17px",
//         "6xl": "25px",
//         xl: "20px",
//         base: "16px",
//         "13xl": "32px",
//         "mini-5": "14.5px",
//         inherit: "inherit",

//         "11xl": "30px",
//         "5xl": "24px",
//         "41xl": "60px",
//         "17xl": "36px",
//         "29xl": "48px",
//         lgi: "19px",
//         "45xl": "64px",
//         "19xl": "38px",
//         "32xl": "51px",
//         "21xl": "40px",
//       },
//     },
//     screens: {
//       // Screens from both configs
//       mq1050: {
//         raw: "screen and (max-width: 1050px)",
//       },
//       mq1000: {
//         raw: "screen and (max-width: 1000px)",
//       },
//       mq725: {
//         raw: "screen and (max-width: 725px)",
//       },
//       mq450: {
//         raw: "screen and (max-width: 450px)",
//       },
//       mq1650: {
//         raw: "screen and (max-width: 1650px)",
//       },
//       mq1500: {
//         raw: "screen and (max-width: 1500px)",
//       },
//       mq1300: {
//         raw: "screen and (max-width: 1300px)",
//       },
//       mq1225: {
//         raw: "screen and (max-width: 1225px)",
//       },
//       mq900: {
//         raw: "screen and (max-width: 900px)",
//       },
//       mq850: {
//         raw: "screen and (max-width: 850px)",
//       },
//     },
//   },
//   corePlugins: {
//     preflight: false,
//   },
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-main-50": "#fbfbfb",
        white: "#fff",
        gray: {
          "100": "#282828",
          "200": "#2a2a2f",
          "300": "#1e1e22",
          "400": "rgba(255, 255, 255, 0.6)",
          "500": "#1f2937",
          "600": "#979296",
          "800": "rgba(142, 141, 137, 0.6)",
          "900": "rgba(22, 22, 26, 0.8)",
          "1000": "#282828",
          "1200": "#0b0b0b",
          "1300": "rgba(0, 0, 0, 0)",
        },
        "black-main-background": "#16161a",
        black: "#000",
        whitesmoke: {
          "100": "#ededed",
          "200": "#eaeaea",
          "300": "#efefef",
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
        color: "#fff",
        lightslategray: {
          "100": "#84909f",
          "200": "rgba(148, 161, 178, 0.2)",
        },
        gainsboro: {
          "100": "#eae6e6",
          "200": "#d9d9d9",
          "300": "#dbdbdb",
          "400": "#d9d9d9",
        },
        lightgray: {
          "100": "#d0d0d1",
          "200": "#cecfd5",
          "300": "#cdcbcf",
        },
        linen: "#eae8dc",
        brown: "rgba(193, 56, 72, 0)",
        indianred: "#e15c5c",
        "background-color": "#fafafa",
        slategray: {
          "100": "#6b7280",
          "200": "#5f6178",
          "300": "#5a5b74",
          "400": "#5b5976",
        },
        dimgray: {
          "100": "#4e556d",
          "200": "#4d536b",
          "300": "#716177",
          "400": "#5e5e74",
          "500": "#5b5d73",
          "600": "#5e5a6f",
          "700": "#585a72",
          "800": "#54586d",
          "900": "#50596c",
          "1000": "#4c586d",
          "1200": "#505269",
        },
        darkgray: {
          "100": "#b1b5b8",
          "200": "#9faab6",
          "300": "#9ba7b3",
          "400": "#aa9b9c",
        },
        sandybrown: "#ee9b3a",
        chocolate: "#bd6908",
        "low-opq-input": "rgba(142, 141, 137, 0.1)",
        "schemes-surface-container-high": "#ece6f0",
        "schemes-outline": "#79747e",
        "schemes-on-surface-variant": "#49454f",
        "schemes-tertiary-container": "#ffd8e4",
        "schemes-on-tertiary-container": "#31111d",
        "schemes-surface-container-highest": "#e6e0e9",
        "schemes-on-surface": "#1d1b20",
        "schemes-primary-container": "#eaddff",
        "low-opq-color": "rgba(127, 90, 240, 0.6)",
        darkslategray: {
          "100": "#2d405d",
          "400": "#444a65",
          "500": "#43496a",
        },
        cornflowerblue: "#6b8ef3",
        "neutrals-neutrals500": "#828f9b",
        outline: "#e0e0e0",
        "secondary-secondary300": "#ced7de",
        "text-colors": "#3b3b42",
        "base-base-white": "#fcfcfc",
        "neutrals-neutrals200": "#d2d6db",
        "base-base-black": "#090a0b",
        "neutrals-neutrals700": "#40474f",
        "primary-subtitle-color": "#686868",
        "secondary-title-color": "#303030",
        "secondary-secondary400": "#c2cdd6",
        "success-success200": "#15b097",
        "secondary-secondary900": "#4a5e6d",
        "secondary-secondary500": "#b6c3cd",
        mediumspringgreen: "#22c55e",
        dodgerblue: "#3b82f6",
      },
      spacing: {
        "spacing-s": "6px",
        "spacing-xs": "4px",
      },
      extend: {
        // Adding scrollbar hide utilities
        scrollbar: {
          hide: {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
          hideWebkit: {
            '::-webkit-scrollbar': {
              display: 'none', /* Safari and Chrome */
            },
          },
        },
      },
      fontFamily: {
        "body-body1-regular": "Roboto",
        "title-medium": "Poppins",
        "m3-label-large": "Roboto",
        "plus-jakarta-sans": "'Plus Jakarta Sans'",
      },
      borderRadius: {
        "7xl": "26px",
        "116xl-3": "135.3px",
        "16xl": "35px",
        "11xl": "30px",
        xl: "20px",
        mid: "17px",
        "8xs": "5px",
        "3xs": "10px",
        "10xs": "3px",
        "9xl": "28px",
        "81xl": "100px",
        "9980xl": "9999px",
        "9xs-8": "3.8px",
        "radius-m": "10px",
        "radius-s": "4px",
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
      mini: "15px",
      xs: "12px",
      sm: "14px",
      "3xs-5": "9.5px",
      "xs-5": "11.5px",
      "mini-5": "14.5px",
      "26xl": "45px",
      "8xl": "27px",
      "38xl": "57px",
      "15xl": "34px",
      "27xl": "46px",
      "smi-5": "12.5px",
      "sm-5": "13.5px",
      "sm-2": "13.2px",
      "mini-2": "14.2px",
      "3xs": "10px",
      "7xl": "26px",
      "3xl": "22px",
      "10xl": "29px",
      "2xs-5": "10.5px",
      mid: "17px",
      "6xl": "25px",
      inherit: "inherit",
    },
    animation: {
      border: 'background ease infinite',
    },
    keyframes: {
      background: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
    },
    screens: {
      mq1650: {
        raw: "screen and (max-width: 1650px)",
      },
      mq1500: {
        raw: "screen and (max-width: 1500px)",
      },
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1300: {
        raw: "screen and (max-width: 1300px)",
      },
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      lg: {
        max: "1200px",
      },
      mq1150: {
        raw: "screen and (max-width: 1150px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq1000: {
        raw: "screen and (max-width: 1000px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq850: {
        raw: "screen and (max-width: 850px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq725: {
        raw: "screen and (max-width: 725px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Safari and Chrome */
        },
      });
    },
  ],
};