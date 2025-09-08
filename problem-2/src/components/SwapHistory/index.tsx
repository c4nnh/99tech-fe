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
import type { SwapTransaction } from "../../types";
import { swapHistoryStyles } from "./styles";

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
    <Box sx={swapHistoryStyles.container}>
      <Card elevation={2} sx={swapHistoryStyles.card}>
        <CardHeader
          title={
            <Typography variant="h6">
              Swap History ({swapHistory.length})
            </Typography>
          }
        />
        <CardContent sx={swapHistoryStyles.cardContent}>
          {swapHistory.length > 0 ? (
            <Box sx={swapHistoryStyles.historyList}>
              {swapHistory.map((swap, index) => (
                <Box key={swap.id}>
                  {index > 0 && <Divider sx={swapHistoryStyles.divider} />}

                  {/* Swap Header with Time and Status */}
                  <Box sx={swapHistoryStyles.swapHeader}>
                    <Box sx={swapHistoryStyles.swapHeaderLeft}>
                      <Typography
                        variant="body2"
                        sx={swapHistoryStyles.swapNumber}
                      >
                        Swap #{swapHistory.length - index}
                      </Typography>
                      {(() => {
                        const statusInfo = getStatusInfo(swap.status);
                        const StatusIcon = statusInfo.icon;
                        return (
                          <Box sx={swapHistoryStyles.statusContainer}>
                            <StatusIcon
                              sx={{
                                ...swapHistoryStyles.statusIcon,
                                color: statusInfo.color,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                ...swapHistoryStyles.statusText,
                                color: statusInfo.color,
                              }}
                            >
                              {statusInfo.text}
                            </Typography>
                          </Box>
                        );
                      })()}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={swapHistoryStyles.timestamp}
                    >
                      {moment(swap.timestamp).format("MMM DD, HH:mm:ss")}
                    </Typography>
                  </Box>

                  {/* Swap Details */}
                  <Box sx={swapHistoryStyles.swapDetails}>
                    <Box sx={swapHistoryStyles.tokenInfo}>
                      <Typography
                        variant="body2"
                        sx={swapHistoryStyles.tokenLabel}
                      >
                        From:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={swapHistoryStyles.tokenAmount}
                      >
                        {swap.fromAmount} {swap.fromToken}
                      </Typography>
                    </Box>
                    <Box sx={swapHistoryStyles.tokenInfo}>
                      <Typography
                        variant="body2"
                        sx={swapHistoryStyles.tokenLabel}
                      >
                        To:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={swapHistoryStyles.tokenAmount}
                      >
                        {swap.toAmount.toFixed(6)} {swap.toToken}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Exchange Rate */}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={swapHistoryStyles.exchangeRate}
                    >
                      Rate: 1 {swap.fromToken} = {swap.exchangeRate.toFixed(6)}{" "}
                      {swap.toToken}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={swapHistoryStyles.emptyState}>
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
