import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import moment from "moment";
import type { SwapTransaction } from "../types";

interface SwapHistoryProps {
  swapHistory: SwapTransaction[];
}

export function SwapHistory({ swapHistory }: SwapHistoryProps) {
  function getStatusInfo(status: SwapTransaction["status"]) {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircleIcon,
          color: "success.main",
          text: "Completed",
        };
      case "cancelled":
        return { icon: CancelIcon, color: "warning.main", text: "Cancelled" };
      case "failed":
        return { icon: ErrorIcon, color: "error.main", text: "Failed" };
      case "pending":
        return { icon: CheckCircleIcon, color: "info.main", text: "Pending" };
      default:
        return {
          icon: CheckCircleIcon,
          color: "text.secondary",
          text: "Unknown",
        };
    }
  }
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 350,
        display: {
          xs: swapHistory.length > 0 ? "block" : "none",
          md: "block",
        },
      }}
    >
      <Card
        elevation={2}
        sx={{
          height: "100%",
          maxHeight: 700,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6">
              Swap History ({swapHistory.length})
            </Typography>
          }
        />
        <CardContent sx={{ flex: 1, overflowY: "auto" }}>
          {swapHistory.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {swapHistory.map((swap, index) => (
                <Box key={swap.id}>
                  {index > 0 && <Divider sx={{ mb: 2 }} />}

                  {/* Swap Header with Time and Status */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        color="primary"
                        fontWeight="bold"
                      >
                        Swap #{swapHistory.length - index}
                      </Typography>
                      {(() => {
                        const statusInfo = getStatusInfo(swap.status);
                        const StatusIcon = statusInfo.icon;
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <StatusIcon
                              sx={{ fontSize: 16, color: statusInfo.color }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: statusInfo.color,
                                fontWeight: "medium",
                              }}
                            >
                              {statusInfo.text}
                            </Typography>
                          </Box>
                        );
                      })()}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {moment(swap.timestamp).format("MMM DD, HH:mm:ss")}
                    </Typography>
                  </Box>

                  {/* Swap Details */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        From:
                      </Typography>
                      <Typography variant="body1">
                        {swap.fromAmount} {swap.fromToken}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        To:
                      </Typography>
                      <Typography variant="body1">
                        {swap.toAmount.toFixed(6)} {swap.toToken}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Exchange Rate */}
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Rate: 1 {swap.fromToken} = {swap.exchangeRate.toFixed(6)}{" "}
                      {swap.toToken}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
                color: "text.secondary",
              }}
            >
              <Typography variant="body2" align="center">
                Your completed swaps will appear here
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
