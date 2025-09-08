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
import type { SwapTransaction } from "../../types";
import { SwapHistory } from "../SwapHistory";
import { TokenSelect } from "../TokenSelect";
import { Loading } from "../Loading";
import { useSwapCurrency } from "../../hooks/useSwapCurrency";
import { UI_CONFIG, VALIDATION_CONFIG } from "../../constants/config";
import { currencySwapFormStyles } from "./styles";

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
        const timeoutId = setTimeout(() => {
          // Check if amount exceeds failure threshold
          if (formData.fromAmount > VALIDATION_CONFIG.FAILURE_THRESHOLD) {
            reject(new Error("API_FAILURE"));
          } else {
            resolve(undefined);
          }
        }, UI_CONFIG.SWAP_DELAY_MS);

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
      } else if (error instanceof Error && error.message === "API_FAILURE") {
        const failedTransaction: SwapTransaction = {
          id: `swap_${Date.now()}`,
          fromToken: formData.fromToken,
          toToken: formData.toToken,
          fromAmount: formData.fromAmount,
          toAmount: parseFloat(calculatedToAmount),
          exchangeRate,
          timestamp: moment().toISOString(),
          status: "failed",
        };

        setSwapHistory((prev) => [failedTransaction, ...prev]);
        showSnackbar(
          `Swap failed: Amount ${formData.fromAmount.toLocaleString()} exceeds maximum limit of ${VALIDATION_CONFIG.FAILURE_THRESHOLD.toLocaleString()}`,
          "error"
        );
      } else {
        showSnackbar("Swap failed. Please try again.", "error");
      }
    } finally {
      setSwapping(false);
      setSwapAbortController(null);
    }
  }

  if (loading) {
    return <Loading message="Loading tokens..." />;
  }

  return (
    <Box sx={currencySwapFormStyles.mainContainer}>
      {/* Main Form */}
      <Box sx={currencySwapFormStyles.formContainer}>
        <Card elevation={3} sx={currencySwapFormStyles.formCard}>
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
                disabledTokens={formData.toToken ? [formData.toToken] : []}
              />

              {/* Swap Button */}
              <Box sx={currencySwapFormStyles.swapButtonContainer}>
                <IconButton
                  onClick={handleSwapTokens}
                  disabled={
                    !formData.fromToken || !formData.toToken || swapping
                  }
                  size="large"
                  sx={currencySwapFormStyles.swapButton}
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
                disabledTokens={formData.fromToken ? [formData.fromToken] : []}
              />

              {/* Exchange Rate Display */}
              {exchangeRate > 0 && formData.fromToken && formData.toToken && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  1 {formData.fromToken} = {exchangeRate.toFixed(6)}{" "}
                  {formData.toToken}
                </Alert>
              )}

              {/* Submit/Cancel Buttons */}
              <Box sx={currencySwapFormStyles.submitButtonContainer}>
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
                      sx={currencySwapFormStyles.cancelButton}
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
          sx={currencySwapFormStyles.snackbarAlert}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
