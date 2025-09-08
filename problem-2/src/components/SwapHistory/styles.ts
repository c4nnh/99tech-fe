import type { SxProps, Theme } from "@mui/material";

export const swapHistoryStyles: Record<string, SxProps<Theme>> = {
  container: {
    flex: 1,
    minWidth: 350,
    display: {
      xs: "block", // Always show on mobile when there's history
      md: "block",
    },
  },

  card: {
    height: "100%",
    maxHeight: 700,
    display: "flex",
    flexDirection: "column",
  },

  cardContent: {
    flex: 1,
    overflowY: "auto",
  },

  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  historyItem: {
    // Individual swap item container
  },

  swapHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  },

  swapHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  swapNumber: {
    color: "primary.main",
    fontWeight: "bold",
  },

  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },

  statusIcon: {
    fontSize: 16,
  },

  statusText: {
    fontWeight: "medium",
  },

  timestamp: {
    color: "text.secondary",
  },

  swapDetails: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },

  tokenInfo: {
    // Container for from/to token information
  },

  tokenLabel: {
    color: "text.secondary",
  },

  tokenAmount: {
    // Token amount display
  },

  exchangeRate: {
    color: "text.secondary",
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 4,
    color: "text.secondary",
  },

  divider: {
    mb: 2,
  },
};
