import React from "react";
import { Box, Typography, TextField, MenuItem, Avatar } from "@mui/material";
import type { TokenWithIcon } from "../types";

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
}: TokenSelectProps) {
  function handleTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    onTokenChange(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    onAmountChange?.(event.target.value);
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          select
          fullWidth
          label="Select token"
          value={value}
          onChange={handleTokenChange}
          variant="outlined"
          disabled={disabled}
        >
          {tokens.map((token) => (
            <MenuItem key={token.currency} value={token.currency}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={token.icon} sx={{ width: 24, height: 24 }}>
                  {token.currency[0]}
                </Avatar>
                {token.currency} - {token.name}
              </Box>
            </MenuItem>
          ))}
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
              ? {
                  "& .MuiInputBase-input": {
                    backgroundColor: "action.hover",
                  },
                }
              : undefined
          }
        />
      </Box>
    </Box>
  );
}
