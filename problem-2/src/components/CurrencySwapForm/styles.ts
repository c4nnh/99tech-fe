import type { SxProps, Theme } from "@mui/material";

export const currencySwapFormStyles: Record<string, SxProps<Theme>> = {
  mainContainer: {
    display: "flex",
    gap: 4,
    width: "100%",
    maxWidth: 1000,
    alignItems: "stretch",
    flexDirection: { xs: "column", md: "row" },
  },

  formContainer: {
    flex: 1,
    minWidth: 400,
  },

  formCard: {
    height: "100%",
    maxHeight: 700,
    display: "flex",
    flexDirection: "column",
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },

  loadingText: {
    ml: 2,
  },

  title: {
    color: "white",
    mb: 2,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    maxWidth: "600px",
    mx: "auto",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },

  swapButtonContainer: {
    display: "flex",
    justifyContent: "center",
    my: 2,
  },

  swapButton: {
    border: 1,
    borderColor: "divider",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },

  submitButtonContainer: {
    mt: 2,
    display: "flex",
    gap: 2,
  },

  cancelButton: {
    minWidth: 120,
  },

  snackbarAlert: {
    width: "100%",
  },
};
