import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { SwapVert as SwapVertIcon } from "@mui/icons-material";
import moment from "moment";
import type { SwapTransaction } from "../types";
import { SwapHistory } from "./SwapHistory";
import { TokenSelect } from "./TokenSelect";
import { useSwapCurrency } from "../hooks/useSwapCurrency";
import { UI_CONFIG } from "../constants/config";

export function CurrencySwapForm() {
  const [swapping, setSwapping] = useState(false);
  const [swapHistory, setSwapHistory] = useState<SwapTransaction[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [swapAbortController, setSwapAbortController] =
    useState<AbortController | null>(null);

  const {
    tokens,
    loading,
    error,
    formData,
    exchangeRate,
    calculatedToAmount,
    validateForm,
    handleFromTokenChange,
    handleToTokenChange,
    handleFromAmountChange,
    handleSwapTokens,
    resetForm,
    setError,
  } = useSwapCurrency();

  function showSnackbar(message: string, severity: "success" | "error") {
    setSnackbar({ open: true, message, severity });
  }

  function handleCloseSnackbar() {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

  function handleCancelSwap() {
    if (swapAbortController) {
      swapAbortController.abort();
      setSwapAbortController(null);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setSwapping(true);
    setError("");

    // Create abort controller for cancellation
    const abortController = new AbortController();
    setSwapAbortController(abortController);

    try {
      // Simulate API call with loading delay and cancellation support
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(resolve, UI_CONFIG.SWAP_DELAY_MS);

        abortController.signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new Error("Swap cancelled"));
        });
      });

      // If we reach here, swap was successful
      const transaction: SwapTransaction = {
        id: `swap_${Date.now()}`,
        fromToken: formData.fromToken,
        toToken: formData.toToken,
        fromAmount: formData.fromAmount,
        toAmount: parseFloat(calculatedToAmount),
        exchangeRate,
        timestamp: moment().toISOString(),
        status: "completed",
      };

      setSwapHistory((prev) => [transaction, ...prev]);
      showSnackbar("Swap completed successfully!", "success");
      resetForm();
    } catch (error) {
      // Handle cancellation or other errors
      if (error instanceof Error && error.message === "Swap cancelled") {
        const cancelledTransaction: SwapTransaction = {
          id: `swap_${Date.now()}`,
          fromToken: formData.fromToken,
          toToken: formData.toToken,
          fromAmount: formData.fromAmount,
          toAmount: parseFloat(calculatedToAmount),
          exchangeRate,
          timestamp: moment().toISOString(),
          status: "cancelled",
        };

        setSwapHistory((prev) => [cancelledTransaction, ...prev]);
        showSnackbar("Swap was cancelled", "error");
      } else {
        showSnackbar("Swap failed. Please try again.", "error");
      }
    } finally {
      setSwapping(false);
      setSwapAbortController(null);
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading tokens...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        width: "100%",
        maxWidth: 1000,
        alignItems: "stretch",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Main Form */}
      <Box sx={{ flex: 1, minWidth: 400 }}>
        <Card
          elevation={3}
          sx={{
            height: "100%",
            maxHeight: 700,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h4" component="h1" align="center">
                Currency Swap
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="text.secondary" align="center">
                Swap your tokens instantly with real-time exchange rates
              </Typography>
            }
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* From Token Section */}
              <TokenSelect
                label="From"
                value={formData.fromToken}
                tokens={tokens}
                amount={formData.fromAmount}
                onTokenChange={handleFromTokenChange}
                onAmountChange={handleFromAmountChange}
                disabled={swapping}
              />

              {/* Swap Button */}
              <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
                <IconButton
                  onClick={handleSwapTokens}
                  disabled={
                    !formData.fromToken || !formData.toToken || swapping
                  }
                  size="large"
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <SwapVertIcon />
                </IconButton>
              </Box>

              {/* To Token Section */}
              <TokenSelect
                label="To"
                value={formData.toToken}
                tokens={tokens}
                amount={calculatedToAmount}
                onTokenChange={handleToTokenChange}
                disabled={swapping}
                readOnlyAmount={true}
              />

              {/* Exchange Rate Display */}
              {exchangeRate > 0 && formData.fromToken && formData.toToken && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  1 {formData.fromToken} = {exchangeRate.toFixed(6)}{" "}
                  {formData.toToken}
                </Alert>
              )}

              {/* Submit/Cancel Buttons */}
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                {swapping ? (
                  <>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled
                      startIcon={<CircularProgress size={20} />}
                    >
                      Swapping...
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      onClick={handleCancelSwap}
                      sx={{ minWidth: 120 }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={
                      !formData.fromToken ||
                      !formData.toToken ||
                      !formData.fromAmount
                    }
                  >
                    Swap Tokens
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Swap History Sidebar */}
      <SwapHistory swapHistory={swapHistory} />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
