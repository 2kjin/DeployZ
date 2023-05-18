import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      white: string;
      container: string;
      error: string;
      checkgreen: string;
      complete: string;
      pending: string;
      darkgray: string;
      lightgray: string;
      textbg: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      extraBold: number;
    };
  }
}
