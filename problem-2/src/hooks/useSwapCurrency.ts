import { useState, useEffect, useMemo } from "react";
import { getTokensWithIcons } from "../services/api";
import type { TokenWithIcon, SwapFormData } from "../types";
import { VALIDATION_CONFIG } from "../constants/config";

export function useSwapCurrency() {
  const [tokens, setTokens] = useState<TokenWithIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: "",
    toToken: "",
    fromAmount: 0,
  });

  // Calculate exchange rate
  const exchangeRate = useMemo(() => {
    if (!formData.fromToken || !formData.toToken || !tokens.length) return 0;

    const fromTokenData = tokens.find(
      (token) => token.currency === formData.fromToken
    );
    const toTokenData = tokens.find(
      (token) => token.currency === formData.toToken
    );

    if (!fromTokenData || !toTokenData) return 0;

    return fromTokenData.price / toTokenData.price;
  }, [formData.fromToken, formData.toToken, tokens]);

  // Calculate to amount
  const calculatedToAmount = useMemo(() => {
    if (!formData.fromAmount || !exchangeRate) return "";

    return (formData.fromAmount * exchangeRate).toFixed(6);
  }, [formData.fromAmount, exchangeRate]);

  // Fetch tokens on mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        setError("");
        const tokensData = await getTokensWithIcons();
        setTokens(tokensData);
      } catch (err) {
        console.error("Failed to fetch tokens:", err);
        setError("Failed to load tokens. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Validation function
  function validateForm(): { isValid: boolean; error: string } {
    if (!formData.fromToken) {
      return { isValid: false, error: "Please select a token to swap from" };
    }
    if (!formData.toToken) {
      return { isValid: false, error: "Please select a token to swap to" };
    }
    if (formData.fromToken === formData.toToken) {
      return { isValid: false, error: "Cannot swap the same token" };
    }
    if (formData.fromAmount <= VALIDATION_CONFIG.MIN_AMOUNT) {
      return { isValid: false, error: "Amount must be a positive number" };
    }
    if (formData.fromAmount > VALIDATION_CONFIG.MAX_AMOUNT) {
      return {
        isValid: false,
        error: `Amount cannot exceed ${VALIDATION_CONFIG.MAX_AMOUNT.toLocaleString()}`,
      };
    }
    return { isValid: true, error: "" };
  }

  // Handler functions
  function handleFromTokenChange(value: string) {
    setFormData((prev) => ({ ...prev, fromToken: value }));
    setError("");
  }

  function handleToTokenChange(value: string) {
    setFormData((prev) => ({ ...prev, toToken: value }));
    setError("");
  }

  function handleFromAmountChange(value: string) {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({ ...prev, fromAmount: numValue }));
    setError("");
  }

  function handleSwapTokens() {
    setFormData((prev) => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
    }));
  }

  function resetForm() {
    setFormData({
      fromToken: "",
      toToken: "",
      fromAmount: 0,
    });
  }

  return {
    // State
    tokens,
    loading,
    error,
    formData,
    exchangeRate,
    calculatedToAmount,

    // Functions
    validateForm,
    handleFromTokenChange,
    handleToTokenChange,
    handleFromAmountChange,
    handleSwapTokens,
    resetForm,
    setError,
  };
}
