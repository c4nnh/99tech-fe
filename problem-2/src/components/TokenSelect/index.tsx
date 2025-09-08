import React from "react";
import { Box, Typography, TextField, MenuItem, Avatar } from "@mui/material";
import type { TokenWithIcon } from "../../types";
import { tokenSelectStyles } from "./styles";

interface TokenSelectProps {
  label: string;
  value: string;
  tokens: TokenWithIcon[];
  amount: string | number;
  onTokenChange: (value: string) => void;
  onAmountChange?: (value: string) => void;
  disabled?: boolean;
  readOnlyAmount?: boolean;
  amountPlaceholder?: string;
  disabledTokens?: string[];
}

export function TokenSelect({
  label,
  value,
  tokens,
  amount,
  onTokenChange,
  onAmountChange,
  disabled = false,
  readOnlyAmount = false,
  amountPlaceholder = "0.00",
  disabledTokens = [],
}: TokenSelectProps) {
  function handleTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    onTokenChange(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    onAmountChange?.(event.target.value);
  }

  return (
    <Box sx={tokenSelectStyles.container}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box sx={tokenSelectStyles.inputContainer}>
        <TextField
          select
          fullWidth
          label="Select token"
          value={value}
          onChange={handleTokenChange}
          variant="outlined"
          disabled={disabled}
        >
          {tokens.map((token) => {
            const isDisabled = disabledTokens.includes(token.currency);
            return (
              <MenuItem
                key={token.currency}
                value={token.currency}
                disabled={isDisabled}
                sx={
                  isDisabled
                    ? tokenSelectStyles.disabledMenuItem
                    : tokenSelectStyles.menuItem
                }
              >
                <Box sx={tokenSelectStyles.tokenInfo}>
                  <Avatar src={token.icon} sx={tokenSelectStyles.tokenAvatar}>
                    {token.currency[0]}
                  </Avatar>
                  {token.currency} - {token.name}
                </Box>
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          fullWidth
          type="number"
          label="Amount"
          placeholder={amountPlaceholder}
          value={amount || ""}
          onChange={handleAmountChange}
          variant="outlined"
          disabled={disabled}
          InputProps={{
            readOnly: readOnlyAmount,
          }}
          inputProps={{
            step: "any",
            min: "0",
          }}
          sx={
            readOnlyAmount
              ? tokenSelectStyles.readOnlyAmountInput
              : tokenSelectStyles.amountInput
          }
        />
      </Box>
    </Box>
  );
}
