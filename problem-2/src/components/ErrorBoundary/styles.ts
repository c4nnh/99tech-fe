import type { SxProps, Theme } from "@mui/material";

export const errorBoundaryStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    padding: 4,
    textAlign: "center",
  },

  errorIcon: {
    fontSize: 64,
    color: "error.main",
    mb: 2,
  },

  title: {
    mb: 2,
    fontWeight: "bold",
  },

  message: {
    mb: 3,
    maxWidth: 600,
    color: "text.secondary",
  },

  buttonContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  details: {
    mt: 3,
    p: 2,
    backgroundColor: "grey.100",
    borderRadius: 1,
    maxWidth: 800,
    overflow: "auto",
  },

  detailsText: {
    fontFamily: "monospace",
    fontSize: "0.875rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};
