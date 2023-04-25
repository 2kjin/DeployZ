import { createTheme } from "@mui/material";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#151649",
    secondary: "#fea51d",
    white: "#fff",
    container: "#f3f4f3",
    error: "#de4d4d",
    checkgreen: "#46a644",
    complete: "#e7faf1",
    pending: "#d8effd",
    darkgray: "#a5a5a5",
    lightgray: "#ebebeb",
    textbg: "#F0E4D1",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    extraBold: 800,
  },
};

export const mtheme = createTheme({
  palette: {
    primary: {
      main: "#151649",
    },
    secondary: {
      main: "#fea51d",
    },
    warning: {
      main: "#fff",
    },
    info: {
      main: "#FF5B79",
    },
    error: {
      main: "#de4d4d",
    },
  },
});
