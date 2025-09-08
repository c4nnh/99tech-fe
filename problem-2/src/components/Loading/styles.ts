import type { SxProps, Theme } from "@mui/material";

export const loadingStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
    width: "100%",
    maxWidth: 1000,
  } as SxProps<Theme>,

  spinner: {
    color: "white",
  } as SxProps<Theme>,

  text: {
    ml: 2,
    color: "white",
  } as SxProps<Theme>,
};
