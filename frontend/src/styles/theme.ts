import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#00BFFF",
    secondary: "#FAF0E6",
    background: "#f5f5f5",
    success: "#34C759",
    error: "#FF3B30",
    warning: "#FF9500",
    white: "#fff",
  },
  darkColors: {
    primary: "#00BFFF",
    secondary: "#FAF0E6",
    background: "#1a1a1a",
    success: "#34C759",
    error: "#FF3B30",
    warning: "#FF9500",
    white: "#fff",
  },
  // components: {
  //   Text: {
  //     h4Style: {
  //       fontSize: 14,
  //     },
  //   },
  // },
  mode: "light",
});
