import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        // d0d1d5
        primary: {
          100: "#ffffff",
          200: "#a1a4ab",
          300: "#3d3762",
          400: "#847cb5",
          500: "#282441",
          600: "#141221",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        yellowAccent : {
            100: "#fff5d8",
            200: "#ffecb0",
            300: "#ffe289",
            400: "#ffd961",
            500: "#ffcf3a",
            600: "#cca62e",
            700: "#997c23",
            800: "#665317",
            900: "#33290c"
        },
        tealAccent: {
          100: "#d4f1f5",
          200: "#a9e2eb",
          300: "#7dd4e1",
          400: "#52c5d7",
          500: "#27b7cd",
          600: "#1f92a4",
          700: "#176e7b",
          800: "#104952",
          900: "#082529"
        },
        indigoAccent: {
          100: "#e0deed",
          200: "#c1bdda",
          300: "#a39dc8",
          400: "#847cb5",
          500: "#655ba3",
          600: "#514982",
          700: "#3d3762",
          800: "#282441",
          900: "#141221"
        },
        pinkAccent: {
          100: "#f6d7e8",
          200: "#edafd1",
          300: "#e588ba",
          400: "#dc60a3",
          500: "#d3388c",
          600: "#a92d70",
          700: "#7f2254",
          800: "#541638",
          900: "#2a0b1c"
        },
        lightGreenAccent: {
          100: "#ebf5d3",
          200: "#d7eaa6",
          300: "#c4e07a",
          400: "#b0d54d",
          500: "#9ccb21",
          600: "#7da21a",
          700: "#5e7a14",
          800: "#3e510d",
          900: "#1f2907"
      },
        greenBlueAccent: {
          100: "#cceae7",
          200: "#99d5cf",
          300: "#66c0b7",
          400: "#33ab9f",
          500: "#009687",
          600: "#00786c",
          700: "#005a51",
          800: "#003c36",
          900: "#001e1b"
        },
        darkGreenAccent: {
          100: "#e0ead0",
          200: "#c2d5a2",
          300: "#a3c073",
          400: "#85ab45",
          500: "#669616",
          600: "#527812",
          700: "#3d5a0d",
          800: "#293c09",
          900: "#141e04"
        },
        mix : {
          100: "#669616",
          200: "#009687",
          300: "#9ccb21",
          400: "#d3388c",
          500: "#655ba3",
          600: "#27b7cd",
          700: "#ffcf3a",
        }
      }
    : {
        grey: {
          100: "#141414",
          200: "#858585",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#fff5d8",
          400: "#f2f0f0", // manually changed
          500: "#fcfcfc",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#868dfb",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        yellowAccent : {
            100: "#fff5d8",
            200: "#ffecb0",
            300: "#ffe289",
            400: "#cca62e",
            500: "#ffcf3a",
            600: "#cca62e",
            700: "#997c23",
            800: "#665317",
            900: "#33290c"
        },
        tealAccent: {
          100: "#d4f1f5",
          200: "#a9e2eb",
          300: "#7dd4e1",
          400: "#52c5d7",
          500: "#27b7cd",
          600: "#1f92a4",
          700: "#176e7b",
          800: "#104952",
          900: "#082529"
        },
        indigoAccent: {
          100: "#e0deed",
          200: "#c1bdda",
          300: "#a39dc8",
          400: "#847cb5",
          500: "#655ba3",
          600: "#514982",
          700: "#3d3762",
          800: "#282441",
          900: "#141221"
        },
        pinkAccent: {
          100: "#f6d7e8",
          200: "#edafd1",
          300: "#e588ba",
          400: "#dc60a3",
          500: "#d3388c",
          600: "#a92d70",
          700: "#7f2254",
          800: "#541638",
          900: "#2a0b1c"
        },
        lightGreenAccent: {
          100: "#ebf5d3",
          200: "#d7eaa6",
          300: "#c4e07a",
          400: "#b0d54d",
          500: "#9ccb21",
          600: "#7da21a",
          700: "#5e7a14",
          800: "#3e510d",
          900: "#1f2907"
      },
        greenBlueAccent: {
          100: "#cceae7",
          200: "#99d5cf",
          300: "#66c0b7",
          400: "#33ab9f",
          500: "#009687",
          600: "#00786c",
          700: "#005a51",
          800: "#003c36",
          900: "#001e1b"
        },
        darkGreenAccent: {
          100: "#e0ead0",
          200: "#c2d5a2",
          300: "#a3c073",
          400: "#85ab45",
          500: "#669616",
          600: "#527812",
          700: "#3d5a0d",
          800: "#293c09",
          900: "#141e04"
        },
        mix : {
          100: "#669616",
          200: "#009687",
          300: "#9ccb21",
          400: "#d3388c",
          500: "#27b7cd",
          600: "#ffcf3a",
        }
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.indigoAccent[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
