import type { SxProps, Theme } from "@mui/material";

export const tokenSelectStyles: Record<string, SxProps<Theme>> = {
  container: {
    mb: 2,
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  tokenDropdown: {
    // Token select dropdown styles
  },

  menuItem: {
    // Individual menu item styles
  },

  disabledMenuItem: {
    opacity: 0.5,
  },

  tokenInfo: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  tokenAvatar: {
    width: 24,
    height: 24,
  },

  amountInput: {
    // Amount input field styles
  },

  readOnlyAmountInput: {
    "& .MuiInputBase-input": {
      backgroundColor: "action.hover",
    },
  },
};
